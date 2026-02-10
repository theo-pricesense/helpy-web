import { test as base, type Page } from "@playwright/test";
import { getOrganizations, loginViaApi } from "../helpers/api";

type AuthFixtures = {
  authenticatedPage: Page;
};

/**
 * Playwright 기본 test를 확장하여 `authenticatedPage` fixture를 제공합니다.
 * API를 통해 로그인하고 auth/organization 상태를 localStorage에 주입하여
 * 로그인 UI를 거치지 않고 빠르게 테스트를 실행합니다.
 */
export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page, request }, use) => {
    const loginData = await loginViaApi(request);

    // 조직 목록을 가져와서 첫 번째 조직을 기본값으로 설정
    let orgId: string | null = null;
    try {
      const orgs = await getOrganizations(request, loginData.accessToken);
      if (orgs.length > 0) {
        orgId = orgs[0].id;
      }
    } catch {
      // 조직 조회 실패 시 무시
    }

    // Zustand auth store와 organization store를 localStorage에 주입
    await page.addInitScript(
      (data) => {
        const authState = {
          state: {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            user: data.user,
            isAuthenticated: true,
          },
          version: 0,
        };
        localStorage.setItem("auth-storage", JSON.stringify(authState));

        if (data.orgId) {
          const orgState = {
            state: { currentOrgId: data.orgId },
            version: 0,
          };
          localStorage.setItem(
            "organization-storage",
            JSON.stringify(orgState),
          );
        }
      },
      { ...loginData, orgId },
    );

    await use(page);
  },
});

export { expect } from "@playwright/test";
