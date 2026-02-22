import { test, expect } from "@playwright/test";
import { navigateToPlans, PLANS_PAGE_TITLE } from "../pages/plans.page";

test.describe("宿泊プラン一覧", () => {
  test("ページタイトルが正しいこと", async ({ page }) => {
    await navigateToPlans(page);
    await expect(page).toHaveTitle(PLANS_PAGE_TITLE);
  });
});
