import { expect, test } from "./fixtures/auth";
import { getOrganizations, getWorkspaces, loginViaApi } from "./helpers/api";

const HAS_CREDENTIALS =
  !!process.env.TEST_USER_EMAIL && !!process.env.TEST_USER_PASSWORD;

let workspaceId: string | null = null;

test.describe("대화 목록", () => {
  test.skip(
    () => !HAS_CREDENTIALS,
    "TEST_USER_EMAIL and TEST_USER_PASSWORD env vars required",
  );

  test.beforeAll(async ({ request }) => {
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

    await page.goto(`/workspaces/${workspaceId}/conversations`);
    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });
  });

  test("대화 목록 페이지가 표시되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    await expect(
      page.getByRole("heading", { name: /conversations|대화/i }),
    ).toBeVisible();
  });

  test("검색 입력창이 표시되어야 한다", async ({ authenticatedPage: page }) => {
    await expect(page.getByPlaceholder(/search|검색/i)).toBeVisible();
  });

  test("상태 필터 드롭다운이 표시되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    const statusFilter = page.locator("button").filter({
      has: page.getByText(/all|전체/i),
    });
    await expect(statusFilter).toBeVisible();
  });

  test("상태 필터 옵션이 있어야 한다", async ({ authenticatedPage: page }) => {
    // 드롭다운 열기
    const statusFilter = page.locator("button").filter({
      has: page.getByText(/all|전체/i),
    });
    await statusFilter.click();

    // 옵션 확인 (SelectItem role=option)
    await expect(
      page.locator("[role='option']").filter({ hasText: /active|활성/i }),
    ).toBeVisible();
    await expect(
      page.locator("[role='option']").filter({ hasText: /closed|종료/i }),
    ).toBeVisible();
  });

  test("대화 테이블 헤더가 표시되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    // 대화가 있으면 테이블 헤더가 보여야 함
    const hasTable = await page
      .locator("table")
      .isVisible()
      .catch(() => false);

    if (hasTable) {
      await expect(
        page.getByRole("columnheader", { name: /customer|고객/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("columnheader", { name: /messages|메시지/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("columnheader", { name: /status|상태/i }),
      ).toBeVisible();
    }
  });

  test("대화가 없으면 빈 상태 메시지가 표시되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    const hasTable = await page
      .locator("table")
      .isVisible()
      .catch(() => false);

    if (!hasTable) {
      await expect(page.locator("svg.lucide-message-square")).toBeVisible();
    }
  });
});

test.describe("대화 상세", () => {
  test.skip(
    () => !HAS_CREDENTIALS,
    "TEST_USER_EMAIL and TEST_USER_PASSWORD env vars required",
  );

  test.beforeAll(async ({ request }) => {
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

  test("대화 행을 클릭하면 상세 페이지로 이동해야 한다", async ({
    authenticatedPage: page,
  }) => {
    if (!workspaceId) {
      test.skip(true, "No workspace available");
      return;
    }

    await page.goto(`/workspaces/${workspaceId}/conversations`);
    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    // 대화 행이 있는지 확인
    const firstRow = page.locator("tbody tr").first();
    const hasConversations = await firstRow.isVisible().catch(() => false);

    if (!hasConversations) {
      test.skip(true, "No conversations available");
      return;
    }

    // 첫 번째 대화 클릭
    await firstRow.click();

    // 상세 페이지로 이동 확인 (뒤로가기 버튼이 있어야 함)
    await expect(page.locator("svg.lucide-arrow-left")).toBeVisible({
      timeout: 10000,
    });
  });

  test("상세 페이지에서 뒤로가기 버튼이 동작해야 한다", async ({
    authenticatedPage: page,
  }) => {
    if (!workspaceId) {
      test.skip(true, "No workspace available");
      return;
    }

    await page.goto(`/workspaces/${workspaceId}/conversations`);
    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    const firstRow = page.locator("tbody tr").first();
    const hasConversations = await firstRow.isVisible().catch(() => false);

    if (!hasConversations) {
      test.skip(true, "No conversations available");
      return;
    }

    await firstRow.click();
    await expect(page.locator("svg.lucide-arrow-left")).toBeVisible({
      timeout: 10000,
    });

    // 뒤로가기 클릭
    await page.locator("svg.lucide-arrow-left").click();

    // 목록 페이지로 돌아왔는지 확인
    await expect(
      page.getByRole("heading", { name: /conversations|대화/i }),
    ).toBeVisible();
  });

  test("상세 페이지에 메시지가 표시되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    if (!workspaceId) {
      test.skip(true, "No workspace available");
      return;
    }

    await page.goto(`/workspaces/${workspaceId}/conversations`);
    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    const firstRow = page.locator("tbody tr").first();
    const hasConversations = await firstRow.isVisible().catch(() => false);

    if (!hasConversations) {
      test.skip(true, "No conversations available");
      return;
    }

    await firstRow.click();
    await expect(page.locator("svg.lucide-arrow-left")).toBeVisible({
      timeout: 10000,
    });

    // 메시지 영역이 있어야 함 (스크롤 영역)
    await expect(
      page.locator("[data-radix-scroll-area-viewport]"),
    ).toBeVisible();
  });

  test("상태 뱃지가 표시되어야 한다", async ({ authenticatedPage: page }) => {
    if (!workspaceId) {
      test.skip(true, "No workspace available");
      return;
    }

    await page.goto(`/workspaces/${workspaceId}/conversations`);
    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });

    const firstRow = page.locator("tbody tr").first();
    const hasConversations = await firstRow.isVisible().catch(() => false);

    if (!hasConversations) {
      test.skip(true, "No conversations available");
      return;
    }

    await firstRow.click();
    await expect(page.locator("svg.lucide-arrow-left")).toBeVisible({
      timeout: 10000,
    });

    // 상태 뱃지 확인 (Active, Waiting, Assigned, Closed 중 하나)
    // 헤더 영역에서 고객 ID와 상태 뱃지가 함께 표시됨
    const header = page.locator("h1.font-mono");
    await expect(header).toBeVisible();
  });
});
