import { test, expect } from "@playwright/test";
import { TITLE_HOME } from "../pages/locator";

test.describe("Smoke Test", () => {
  test("Smoke Test: トップページが表示されること", async ({ page }) => {
    // Act: トップページに移動
    await page.goto("/");

    // Assert: タイトルが期待通りであることを確認
    await expect(page).toHaveTitle(TITLE_HOME);
  });
});
