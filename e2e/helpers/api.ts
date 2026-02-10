import type { APIRequestContext } from "@playwright/test";

const API_BASE_URL = process.env.API_URL ?? "http://localhost:4000";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface Organization {
  id: string;
  name: string;
  createdAt: string;
  memberCount?: number;
}

interface Workspace {
  id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
}

export async function loginViaApi(
  request: APIRequestContext,
  email?: string,
  password?: string,
): Promise<LoginResponse> {
  const response = await request.post(`${API_BASE_URL}/auth/login`, {
    data: {
      email: email ?? process.env.TEST_USER_EMAIL ?? "test@example.com",
      password: password ?? process.env.TEST_USER_PASSWORD ?? "password123",
    },
  });

  if (!response.ok()) {
    throw new Error(`Login failed: ${response.status()}`);
  }

  return response.json();
}

export async function getOrganizations(
  request: APIRequestContext,
  accessToken: string,
): Promise<Organization[]> {
  const response = await request.get(`${API_BASE_URL}/organizations/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok()) {
    throw new Error(`Failed to get organizations: ${response.status()}`);
  }

  return response.json();
}

export async function getWorkspaces(
  request: APIRequestContext,
  accessToken: string,
  organizationId: string,
): Promise<Workspace[]> {
  const response = await request.get(`${API_BASE_URL}/workspaces`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Organization-Id": organizationId,
    },
  });

  if (!response.ok()) {
    throw new Error(`Failed to get workspaces: ${response.status()}`);
  }

  return response.json();
}
