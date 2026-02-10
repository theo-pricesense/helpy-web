import { expect, test } from "@playwright/test";

const TEST_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD;

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("should display login form", async ({ page }) => {
    await expect(page.getByText("Welcome back")).toBeVisible();
    await expect(page.getByLabel("이메일")).toBeVisible();
    await expect(page.getByLabel("비밀번호")).toBeVisible();
    await expect(page.getByRole("button", { name: "로그인" })).toBeVisible();
  });

  test("should show validation errors for empty form", async ({ page }) => {
    await page.getByRole("button", { name: "로그인" }).click();

    await expect(
      page.getByText("올바른 이메일 주소를 입력해주세요."),
    ).toBeVisible();
    await expect(page.getByText("비밀번호를 입력해주세요.")).toBeVisible();
  });

  test("should show validation error for invalid email", async ({ page }) => {
    await page.getByLabel("이메일").fill("not-an-email");
    await page.getByLabel("비밀번호").fill("somepassword");
    await page.getByRole("button", { name: "로그인" }).click();

    await expect(
      page.getByText("올바른 이메일 주소를 입력해주세요."),
    ).toBeVisible();
  });

  test("should submit login form with valid credentials", async ({ page }) => {
    test.skip(
      !TEST_EMAIL || !TEST_PASSWORD,
      "TEST_USER_EMAIL and TEST_USER_PASSWORD env vars required",
    );

    await page.getByLabel("이메일").fill(TEST_EMAIL!);
    await page.getByLabel("비밀번호").fill(TEST_PASSWORD!);
    await page.getByRole("button", { name: "로그인" }).click();

    await expect(page).toHaveURL("/workspaces", { timeout: 10000 });
  });

  test("should have a link to signup page", async ({ page }) => {
    await page.getByRole("link", { name: "회원가입" }).click();
    await expect(page).toHaveURL("/signup");
  });
});

test.describe("Signup", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signup");
  });

  test("should display signup form with step 1", async ({ page }) => {
    await expect(page.getByText("Create account")).toBeVisible();
    await expect(page.getByLabel("이메일")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "인증 코드 발송" }),
    ).toBeVisible();
  });

  test("should show validation error for empty email", async ({ page }) => {
    await page.getByRole("button", { name: "인증 코드 발송" }).click();

    await expect(
      page.getByText("올바른 이메일 주소를 입력해주세요."),
    ).toBeVisible();
  });

  test("should have a link to login page", async ({ page }) => {
    await page.getByRole("link", { name: "로그인" }).click();
    await expect(page).toHaveURL("/login");
  });
});
