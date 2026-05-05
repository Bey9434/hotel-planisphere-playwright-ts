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

  test("Smoke Test: ログインページが表示されること", async ({ page }) => {
    // Act: ログインページに移動
    await page.goto(PATHS.LOGIN);

    // Assert: タイトルが期待通りであることを確認
    await expect(page).toHaveTitle(TITLES.LOGIN);
  });

  test("Smoke Test: プラン一覧ページが表示されること", async ({ page }) => {
    // Act: プラン一覧ページに移動
    await page.goto(PATHS.PLANS);

    // Assert: タイトルが期待通りであることを確認
    await expect(page).toHaveTitle(TITLES.PLANS);
  });
});
