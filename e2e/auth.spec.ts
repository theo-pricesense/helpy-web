import { expect, test } from "@playwright/test";

const TEST_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_PASSWORD = process.env.TEST_USER_PASSWORD;

test.describe("로그인", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("로그인 폼이 표시되어야 한다", async ({ page }) => {
    await expect(page.getByText("Welcome back")).toBeVisible();
    await expect(page.getByLabel("이메일")).toBeVisible();
    await expect(page.getByLabel("비밀번호")).toBeVisible();
    await expect(page.getByRole("button", { name: "로그인" })).toBeVisible();
  });

  test("빈 폼 제출 시 유효성 검사 오류가 표시되어야 한다", async ({ page }) => {
    await page.getByRole("button", { name: "로그인" }).click();

    await expect(
      page.getByText("올바른 이메일 주소를 입력해주세요."),
    ).toBeVisible();
    await expect(page.getByText("비밀번호를 입력해주세요.")).toBeVisible();
  });

  test("잘못된 이메일 형식 입력 시 유효성 검사 오류가 표시되어야 한다", async ({
    page,
  }) => {
    await page.getByLabel("이메일").fill("not-an-email");
    await page.getByLabel("비밀번호").fill("somepassword");
    await page.getByRole("button", { name: "로그인" }).click();

    await expect(
      page.getByText("올바른 이메일 주소를 입력해주세요."),
    ).toBeVisible();
  });

  test("올바른 자격 증명으로 로그인하면 워크스페이스 페이지로 이동해야 한다", async ({
    page,
  }) => {
    test.skip(
      !TEST_EMAIL || !TEST_PASSWORD,
      "TEST_USER_EMAIL and TEST_USER_PASSWORD env vars required",
    );

    await page.getByLabel("이메일").fill(TEST_EMAIL!);
    await page.getByLabel("비밀번호").fill(TEST_PASSWORD!);
    await page.getByRole("button", { name: "로그인" }).click();

    await expect(page).toHaveURL("/workspaces", { timeout: 10000 });
  });

  test("회원가입 페이지로 이동하는 링크가 있어야 한다", async ({ page }) => {
    await page.getByRole("link", { name: "회원가입" }).click();
    await expect(page).toHaveURL("/signup");
  });
});

test.describe("회원가입", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signup");
  });

  test("회원가입 폼 1단계가 표시되어야 한다", async ({ page }) => {
    await expect(page.getByText("Create account")).toBeVisible();
    await expect(page.getByLabel("이메일")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "인증 코드 발송" }),
    ).toBeVisible();
  });

  test("빈 이메일로 제출 시 유효성 검사 오류가 표시되어야 한다", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "인증 코드 발송" }).click();

    await expect(
      page.getByText("올바른 이메일 주소를 입력해주세요."),
    ).toBeVisible();
  });

  test("로그인 페이지로 이동하는 링크가 있어야 한다", async ({ page }) => {
    await page.getByRole("link", { name: "로그인" }).click();
    await expect(page).toHaveURL("/login");
  });
});
