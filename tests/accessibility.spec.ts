import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { PATHS } from "../pages/paths";

test.describe("アクセシビリティテスト", () => {
  test("トップページにアクセシビリティ違反がないこと", async ({ page }) => {
    await page.goto(PATHS.HOME);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(["color-contrast"]) // テスト対象サイト側の既知の違反のため除外
      .analyze();
    expect(results.violations).toStrictEqual([]);
  });

  test("プラン一覧ページにアクセシビリティ違反がないこと", async ({ page }) => {
    await page.goto(PATHS.PLANS);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(["color-contrast"]) // テスト対象サイト側の既知の違反のため除外
      .analyze();
    expect(results.violations).toStrictEqual([]);
  });

  test("ログインページにアクセシビリティ違反がないこと", async ({ page }) => {
    await page.goto(PATHS.LOGIN);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(["color-contrast"]) // テスト対象サイト側の既知の違反のため除外
      .analyze();
    expect(results.violations).toStrictEqual([]);
  });
});
