import { test, expect } from "@playwright/test";
import { PATHS } from "../pages/paths";
import { TITLES } from "../pages/locator";

test.describe("Smoke Test", () => {
  test("Smoke Test: トップページが表示されること", async ({ page }) => {
    // Act: トップページに移動
    await page.goto(PATHS.HOME);

    // Assert: タイトルが期待通りであることを確認
    await expect(page).toHaveTitle(TITLES.HOME);
  });
});
