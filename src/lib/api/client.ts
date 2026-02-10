import { useAuthStore } from "@/stores/auth-store";
import {
  getCurrentOrgId,
  useOrganizationStore,
} from "@/stores/organization-store";
import { ApiClient } from "./generated";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const { refreshToken, setTokens, logout } = useAuthStore.getState();

  if (!refreshToken) {
    logout();
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return null;
    }

    const data = await response.json();
    setTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
  } catch {
    logout();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }
}

async function getValidAccessToken(): Promise<string | null> {
  const { accessToken } = useAuthStore.getState();

  if (!accessToken) {
    return null;
  }

  // Check if token is expired (decode JWT and check exp)
  try {
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    const expiresAt = payload.exp * 1000;
    const now = Date.now();

    // If token expires in less than 1 minute, refresh it proactively
    if (expiresAt - now < 60 * 1000) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken().finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });
      }
      return refreshPromise;
    }
  } catch {
    // If token parsing fails, try to use it anyway
  }

  return accessToken;
}

export const apiClient = new ApiClient({
  BASE: API_BASE_URL,
  WITH_CREDENTIALS: true,
  CREDENTIALS: "include",
  TOKEN: async () => {
    const token = await getValidAccessToken();
    return token ?? "";
  },
  HEADERS: async () => {
    const orgId = getCurrentOrgId();
    const headers: Record<string, string> = {};
    if (orgId) {
      headers["X-Organization-Id"] = orgId;
    }
    return headers;
  },
});

// Handle 403 organization error - refresh org and retry
async function handleOrganizationError<T>(
  request: () => Promise<T>,
): Promise<T> {
  try {
    // Fetch organizations and set the first one
    const response = await fetch(`${API_BASE_URL}/organizations/me`, {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
      },
    });

    if (response.ok) {
      const orgs = await response.json();
      if (orgs.length > 0) {
        useOrganizationStore.getState().setCurrentOrgId(orgs[0].id);
        // Retry the original request
        return await request();
      }
    }
  } catch {
    // If refresh fails, throw original error
  }
  throw new Error("No valid organization found");
}

// Export a function to handle 401/403 errors and retry
export async function withTokenRefresh<T>(
  request: () => Promise<T>,
): Promise<T> {
  try {
    return await request();
  } catch (error: unknown) {
    if (error && typeof error === "object" && "status" in error) {
      // Check if it's a 401 error
      if (error.status === 401) {
        // Try to refresh the token
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = refreshAccessToken().finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
        }

        const newToken = await refreshPromise;
        if (newToken) {
          // Retry the original request
          return await request();
        }
      }

      // Check if it's a 403 error (organization issue)
      if (error.status === 403) {
        return await handleOrganizationError(request);
      }
    }
    throw error;
  }
}
