import { expect, test } from "@playwright/test";

test.describe("Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load and display the hero section", async ({ page }) => {
    // Navbar is visible
    await expect(page.locator("header")).toBeVisible();

    // Hero headline is displayed
    await expect(page.getByText("고객 서비스의 미래,")).toBeVisible();
    await expect(page.getByText("AI가 함께합니다")).toBeVisible();
  });

  test("should have working navigation links", async ({ page }) => {
    const nav = page.getByRole("navigation");

    await expect(nav.getByRole("link", { name: "Features" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Solutions" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Pricing" })).toBeVisible();
  });

  test("should navigate to login page", async ({ page }) => {
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Log in" })
      .click();
    await expect(page).toHaveURL("/login");
    await expect(page.getByText("Welcome back")).toBeVisible();
  });

  test("should navigate to signup page", async ({ page }) => {
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Get Started" })
      .click();
    await expect(page).toHaveURL("/signup");
    await expect(page.getByText("Create account")).toBeVisible();
  });

  test("should display all landing page sections", async ({ page }) => {
    // Features section
    await expect(page.locator("#features")).toBeAttached();

    // Badge in hero
    await expect(page.getByText("AI-powered Customer Service")).toBeVisible();

    // CTA section
    await expect(
      page.getByRole("link", { name: "무료로 시작하기" }).first(),
    ).toBeVisible();
  });
});
