import { test, expect } from "@playwright/test";

test("Smoke Test: トップページが表示されること", async ({ page }) => {
  // Act: トップページに移動
  await page.goto("/");

  // Assert: タイトルが期待通りであることを確認
  await expect(page).toHaveTitle("HOTEL PLANISPHERE - テスト自動化練習サイト");
});
