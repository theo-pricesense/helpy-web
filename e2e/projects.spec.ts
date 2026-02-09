import { expect, test } from "./fixtures/auth";
import { getOrganizations, loginViaApi } from "./helpers/api";

const HAS_CREDENTIALS =
  !!process.env.TEST_USER_EMAIL && !!process.env.TEST_USER_PASSWORD;

test.describe("Projects", () => {
  test.skip(
    () => !HAS_CREDENTIALS,
    "TEST_USER_EMAIL and TEST_USER_PASSWORD env vars required",
  );

  let orgId: string;

  test.beforeAll(async ({ request }) => {
    const loginData = await loginViaApi(request);
    const orgs = await getOrganizations(request, loginData.accessToken);
    if (orgs.length > 0) {
      orgId = orgs[0].id;
    }
  });

  test("should display projects page", async ({ authenticatedPage: page }) => {
    test.skip(!orgId, "No organizations available for testing");

    await page.goto(`/organizations/${orgId}/projects`);

    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    await expect(
      page.getByText("Manage your AI customer service projects."),
    ).toBeVisible();
  });

  test("should display New Project button", async ({
    authenticatedPage: page,
  }) => {
    test.skip(!orgId, "No organizations available for testing");

    await page.goto(`/organizations/${orgId}/projects`);

    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    await expect(
      page.getByRole("button", { name: "New Project" }),
    ).toBeVisible();
  });

  test("should open create project dialog", async ({
    authenticatedPage: page,
  }) => {
    test.skip(!orgId, "No organizations available for testing");

    await page.goto(`/organizations/${orgId}/projects`);

    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    await page.getByRole("button", { name: "New Project" }).click();

    await expect(page.getByText("Create New Project")).toBeVisible();
    await expect(page.getByLabel("Project Name")).toBeVisible();
    await expect(page.getByRole("button", { name: "Create" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
  });

  test("should show validation error for empty project name", async ({
    authenticatedPage: page,
  }) => {
    test.skip(!orgId, "No organizations available for testing");

    await page.goto(`/organizations/${orgId}/projects`);

    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    await page.getByRole("button", { name: "New Project" }).click();
    await page.getByRole("button", { name: "Create" }).click();

    await expect(page.getByText("Project name is required")).toBeVisible();
  });

  test("should close dialog on Cancel", async ({ authenticatedPage: page }) => {
    test.skip(!orgId, "No organizations available for testing");

    await page.goto(`/organizations/${orgId}/projects`);

    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    await page.getByRole("button", { name: "New Project" }).click();
    await expect(page.getByText("Create New Project")).toBeVisible();

    await page.getByRole("button", { name: "Cancel" }).click();
    await expect(page.getByText("Create New Project")).toBeHidden();
  });
});
