import { test, expect } from "@playwright/test";
import { PATHS } from "../pages/paths";

test.describe("Visual Regression Testing", () => {
  test("トップページの見た目が正しいこと", async ({ page }) => {
    await page.goto(PATHS.HOME);
    await expect(page).toHaveScreenshot("home.png");
  });

  test("プラン一覧ページの見た目が正しいこと", async ({ page }) => {
    await page.goto(PATHS.PLANS);
    await expect(page).toHaveScreenshot("plans.png");
  });

  test("ログインページの見た目が正しいこと", async ({ page }) => {
    await page.goto(PATHS.LOGIN);
    await expect(page).toHaveScreenshot("login.png");
  });
});
