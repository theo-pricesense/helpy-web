import { expect, test } from "./fixtures/auth";

const HAS_CREDENTIALS =
  !!process.env.TEST_USER_EMAIL && !!process.env.TEST_USER_PASSWORD;

test.describe("멤버 관리", () => {
  test.skip(
    () => !HAS_CREDENTIALS,
    "TEST_USER_EMAIL and TEST_USER_PASSWORD env vars required",
  );

  test.beforeEach(async ({ authenticatedPage: page }) => {
    await page.goto("/settings/members");

    await expect(page.locator("[class*='animate-spin']")).toBeHidden({
      timeout: 10000,
    });
  });

  test("멤버 페이지가 표시되어야 한다", async ({ authenticatedPage: page }) => {
    await expect(page.getByRole("heading", { name: "Members" })).toBeVisible();
    await expect(
      page.getByText("Manage team members and their roles."),
    ).toBeVisible();
  });

  test("Invite Member 버튼이 표시되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    await expect(
      page.getByRole("button", { name: "Invite Member" }),
    ).toBeVisible();
  });

  test("Team Members 테이블이 표시되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    await expect(page.getByText("Team Members")).toBeVisible();
    await expect(
      page.getByText("People who have access to your organization."),
    ).toBeVisible();

    // 테이블 헤더 확인
    await expect(
      page.getByRole("columnheader", { name: "Member" }),
    ).toBeVisible();
    await expect(
      page.getByRole("columnheader", { name: "Role" }),
    ).toBeVisible();
  });

  test("현재 사용자가 멤버 목록에 표시되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    // 최소 1명(본인)은 테이블에 있어야 함
    const rows = page.getByRole("row");
    await expect(rows).toHaveCount({ minimum: 2 }); // 헤더 + 최소 1명
  });

  test("초대 다이얼로그가 열려야 한다", async ({ authenticatedPage: page }) => {
    await page.getByRole("button", { name: "Invite Member" }).click();

    await expect(
      page.getByRole("heading", { name: "Invite Member" }),
    ).toBeVisible();
    await expect(
      page.getByText("Send an invitation email to add a new team member."),
    ).toBeVisible();
    await expect(page.getByLabel("Email address")).toBeVisible();
    await expect(page.getByLabel("Role")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Send Invite" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Cancel" })).toBeVisible();
  });

  test("이메일 없이 초대하면 유효성 검증 에러가 표시되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Invite Member" }).click();
    await page.getByRole("button", { name: "Send Invite" }).click();

    await expect(page.getByText("유효한 이메일을 입력해주세요")).toBeVisible();
  });

  test("잘못된 이메일로 초대하면 유효성 검증 에러가 표시되어야 한다", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Invite Member" }).click();
    await page.getByLabel("Email address").fill("invalid-email");
    await page.getByRole("button", { name: "Send Invite" }).click();

    await expect(page.getByText("유효한 이메일을 입력해주세요")).toBeVisible();
  });

  test("Cancel 버튼으로 초대 다이얼로그가 닫혀야 한다", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Invite Member" }).click();
    await expect(
      page.getByRole("heading", { name: "Invite Member" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Cancel" }).click();
    await expect(
      page.getByRole("heading", { name: "Invite Member" }),
    ).toBeHidden();
  });

  test("역할 선택 드롭다운에서 Admin과 Member를 선택할 수 있어야 한다", async ({
    authenticatedPage: page,
  }) => {
    await page.getByRole("button", { name: "Invite Member" }).click();

    // Role 셀렉트 클릭
    await page.getByLabel("Role").click();

    await expect(page.getByRole("option", { name: "Admin" })).toBeVisible();
    await expect(page.getByRole("option", { name: "Member" })).toBeVisible();
  });

  test("Owner 역할의 멤버에는 액션 메뉴가 없어야 한다", async ({
    authenticatedPage: page,
  }) => {
    // Owner 뱃지가 있는 행에는 액션 버튼이 없어야 함
    const ownerRow = page.getByRole("row").filter({ hasText: "Owner" });
    const hasOwner = await ownerRow
      .first()
      .isVisible()
      .catch(() => false);

    if (hasOwner) {
      await expect(
        ownerRow.first().getByRole("button", { name: "Actions" }),
      ).toBeHidden();
    }
  });
});
