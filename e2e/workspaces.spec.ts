import { expect, test } from "./fixtures/auth";

const HAS_CREDENTIALS =
  !!process.env.TEST_USER_EMAIL && !!process.env.TEST_USER_PASSWORD;

test.describe("워크스페이스", () => {
  test.skip(
    () => !HAS_CREDENTIALS,
    "TEST_USER_EMAIL and TEST_USER_PASSWORD env vars required",
  );

  test("워크스페이스 페이지가 표시되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    await page.goto("/workspaces");

    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    await expect(
      page.getByRole("heading", { name: "워크스페이스" }),
    ).toBeVisible();
    await expect(
      page.getByText("AI 고객 서비스 워크스페이스를 관리하세요."),
    ).toBeVisible();
  });

  test("새 워크스페이스 버튼이 표시되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    await page.goto("/workspaces");

    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    await expect(
      page.getByRole("button", { name: "새 워크스페이스" }),
    ).toBeVisible();
  });

  test("워크스페이스 생성 다이얼로그가 열려야 한다", async ({
    authenticatedPage: page,
  }) => {
    await page.goto("/workspaces");

    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    await page.getByRole("button", { name: "새 워크스페이스" }).click();

    await expect(page.getByText("워크스페이스 생성")).toBeVisible();
    await expect(page.getByLabel("워크스페이스 이름")).toBeVisible();
    await expect(page.getByRole("button", { name: "생성" })).toBeVisible();
    await expect(page.getByRole("button", { name: "취소" })).toBeVisible();
  });

  test("워크스페이스 이름이 비어있으면 유효성 검증 에러가 표시되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    await page.goto("/workspaces");

    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    await page.getByRole("button", { name: "새 워크스페이스" }).click();
    await page.getByRole("button", { name: "생성" }).click();

    await expect(
      page.getByText("워크스페이스 이름을 입력해주세요."),
    ).toBeVisible();
  });

  test("취소 버튼으로 다이얼로그가 닫혀야 한다", async ({
    authenticatedPage: page,
  }) => {
    await page.goto("/workspaces");

    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    await page.getByRole("button", { name: "새 워크스페이스" }).click();
    await expect(page.getByText("워크스페이스 생성")).toBeVisible();

    await page.getByRole("button", { name: "취소" }).click();
    await expect(page.getByText("워크스페이스 생성")).toBeHidden();
  });

  test("워크스페이스가 없으면 빈 상태 메시지가 표시되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    await page.goto("/workspaces");

    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    // 워크스페이스 카드가 있거나 빈 상태 메시지가 있어야 함
    const hasWorkspaces = await page
      .locator("[class*='cursor-pointer']")
      .first()
      .isVisible()
      .catch(() => false);

    if (!hasWorkspaces) {
      await expect(page.getByText("워크스페이스가 없습니다")).toBeVisible();
    }
  });
});
