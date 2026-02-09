import { expect, test } from "./fixtures/auth";
import { loginViaApi } from "./helpers/api";

const HAS_CREDENTIALS =
  !!process.env.TEST_USER_EMAIL && !!process.env.TEST_USER_PASSWORD;

test.describe("Organizations", () => {
  test.skip(
    () => !HAS_CREDENTIALS,
    "TEST_USER_EMAIL and TEST_USER_PASSWORD env vars required",
  );

  test("should display organizations page after login", async ({
    authenticatedPage: page,
  }) => {
    await page.goto("/organizations");

    await expect(page.getByText("Organizations")).toBeVisible();
    await expect(
      page.getByText("Select an organization to manage projects."),
    ).toBeVisible();
  });

  test("should display organization cards or empty state", async ({
    authenticatedPage: page,
  }) => {
    await page.goto("/organizations");

    // Wait for loading to finish
    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    // Either shows organization cards or empty state
    const hasOrgs = await page
      .getByText("members")
      .first()
      .isVisible()
      .catch(() => false);
    if (hasOrgs) {
      await expect(page.locator("[class*='grid']").first()).toBeVisible();
    } else {
      await expect(page.getByText("No organizations yet")).toBeVisible();
    }
  });

  test("should navigate to projects page when clicking an organization", async ({
    authenticatedPage: page,
  }) => {
    await page.goto("/organizations");

    // Wait for loading to finish
    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    const orgCard = page.locator("[class*='cursor-pointer']").first();
    const hasOrgs = await orgCard.isVisible().catch(() => false);

    if (hasOrgs) {
      await orgCard.click();
      await expect(page).toHaveURL(/\/organizations\/.*\/projects/);
    }
  });
});
