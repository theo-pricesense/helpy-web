import { test as base, type Page } from "@playwright/test";
import { loginViaApi } from "../helpers/api";

type AuthFixtures = {
  authenticatedPage: Page;
};

/**
 * Extends Playwright's base test with an `authenticatedPage` fixture.
 * Logs in via the API and injects auth state into localStorage,
 * so tests skip the login UI flow for faster execution.
 */
export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page, request }, use) => {
    const loginData = await loginViaApi(request);

    // Inject Zustand auth store into localStorage before navigating
    await page.addInitScript((data) => {
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
    }, loginData);

    await use(page);
  },
});

export { expect } from "@playwright/test";
