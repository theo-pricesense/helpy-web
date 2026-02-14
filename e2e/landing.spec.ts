import { expect, test } from "@playwright/test";

test.describe("Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load and display the hero section", async ({ page }) => {
    // Navbar is visible
    await expect(page.locator("header")).toBeVisible();

    // Hero headline is displayed
    await expect(page.getByText("CS팀 없어도")).toBeVisible();
    await expect(page.getByText("괜찮아요")).toBeVisible();
  });

  test("should have working navigation links", async ({ page }) => {
    const nav = page.getByRole("navigation");

    // Check navigation links exist
    await expect(
      nav.getByRole("link", { name: /pricing|요금/i }),
    ).toBeVisible();
  });

  test("should navigate to login page", async ({ page }) => {
    await page
      .getByRole("navigation")
      .getByRole("link", { name: /log.?in|로그인/i })
      .click();
    await expect(page).toHaveURL("/login");
  });

  test("should navigate to signup page", async ({ page }) => {
    await page
      .getByRole("navigation")
      .getByRole("link", { name: /get.?started|시작/i })
      .click();
    await expect(page).toHaveURL("/signup");
  });

  test("should display all landing page sections", async ({ page }) => {
    // Badge in hero
    await expect(page.getByText("AI-powered CS")).toBeVisible();

    // CTA button
    await expect(
      page.getByRole("link", { name: /무료로 시작/i }).first(),
    ).toBeVisible();

    // Subheadline
    await expect(page.getByText(/AI가 24시간/i)).toBeVisible();
  });
});
