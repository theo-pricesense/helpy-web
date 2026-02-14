import { expect, test } from "./fixtures/auth";
import { getOrganizations, getWorkspaces, loginViaApi } from "./helpers/api";

const HAS_CREDENTIALS =
  !!process.env.TEST_USER_EMAIL && !!process.env.TEST_USER_PASSWORD;

let workspaceId: string | null = null;

test.describe("워크스페이스 설정", () => {
  test.skip(
    () => !HAS_CREDENTIALS,
    "TEST_USER_EMAIL and TEST_USER_PASSWORD env vars required",
  );

  test.beforeAll(async ({ request }) => {
    // API를 통해 워크스페이스 ID 가져오기
    const loginData = await loginViaApi(request);
    const orgs = await getOrganizations(request, loginData.accessToken);
    if (orgs.length > 0) {
      const workspaces = await getWorkspaces(
        request,
        loginData.accessToken,
        orgs[0].id,
      );
      if (workspaces.length > 0) {
        workspaceId = workspaces[0].id;
      }
    }
  });

  test.beforeEach(async ({ authenticatedPage: page }) => {
    if (!workspaceId) {
      test.skip(true, "No workspace available");
      return;
    }

    // 워크스페이스 설정 페이지로 직접 이동
    await page.goto(`/workspaces/${workspaceId}/settings`);
    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });
  });

  test("워크스페이스 설정 페이지가 표시되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    await expect(page.locator("h1.text-2xl")).toBeVisible();
    await expect(
      page.getByText("활성").or(page.getByText("Active")),
    ).toBeVisible();
  });

  test("API 키 섹션이 표시되어야 한다", async ({ authenticatedPage: page }) => {
    await expect(
      page.getByText("API Key").or(page.getByText("API 키")),
    ).toBeVisible();
    await expect(page.locator(".font-mono").first()).toBeVisible();
  });

  test("API 키 복사 버튼이 있어야 한다", async ({
    authenticatedPage: page,
  }) => {
    const copyButton = page.locator("button").filter({
      has: page.locator("svg.lucide-copy"),
    });
    await expect(copyButton).toBeVisible();
  });

  test("API 키 재발급 다이얼로그가 열려야 한다", async ({
    authenticatedPage: page,
  }) => {
    const regenerateButton = page.locator("button").filter({
      has: page.locator("svg.lucide-refresh-cw"),
    });
    await regenerateButton.click();

    await expect(page.getByRole("alertdialog")).toBeVisible();
    await page.getByRole("button", { name: /cancel|취소/i }).click();
    await expect(page.getByRole("alertdialog")).toBeHidden();
  });

  test("워크스페이스 이름 변경 폼이 표시되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    const nameInput = page.locator("input#workspaceName");
    await expect(nameInput).toBeVisible();
    await expect(
      page.getByRole("button", { name: /save|저장/i }),
    ).toBeVisible();
  });

  test("워크스페이스 이름을 수정하면 저장 버튼이 활성화되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    const nameInput = page.locator("input#workspaceName");
    const originalValue = await nameInput.inputValue();

    await nameInput.fill(originalValue + " Test");

    const saveButton = page.getByRole("button", { name: /save|저장/i });
    await expect(saveButton).toBeEnabled();

    await nameInput.fill(originalValue);
  });

  test("Danger Zone이 표시되어야 한다", async ({ authenticatedPage: page }) => {
    await expect(
      page.getByText("Danger Zone").or(page.getByText("위험 구역")),
    ).toBeVisible();

    const deleteButton = page.locator("button").filter({
      has: page.locator("svg.lucide-trash-2"),
    });
    await expect(deleteButton).toBeVisible();
  });

  test("워크스페이스 삭제 다이얼로그가 열려야 한다", async ({
    authenticatedPage: page,
  }) => {
    const deleteButton = page.locator("button").filter({
      has: page.locator("svg.lucide-trash-2"),
    });
    await deleteButton.click();

    await expect(page.getByRole("alertdialog")).toBeVisible();
    await page.getByRole("button", { name: /cancel|취소/i }).click();
    await expect(page.getByRole("alertdialog")).toBeHidden();
  });
});
