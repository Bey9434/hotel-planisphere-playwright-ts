import { test, expect } from "@playwright/test";

test.describe("Visual Regression Testing", () => {
  test("トップページの見た目が正しいこと", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveScreenshot("home.png");
  });

  test("プラン一覧ページの見た目が正しいこと", async ({ page }) => {
    await page.goto("/ja/plans.html");
    await expect(page).toHaveScreenshot("plans.png");
  });

  test("ログインページの見た目が正しいこと", async ({ page }) => {
    await page.goto("/ja/login.html");
    await expect(page).toHaveScreenshot("login.png");
  });
});
