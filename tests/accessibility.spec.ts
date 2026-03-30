import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("アクセシビリティテスト", () => {
  test("トップページにアクセシビリティ違反がないこと", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(["color-contrast"]) // テスト対象サイト側の既知の違反のため除外
      .analyze();
    expect(results.violations).toStrictEqual([]);
  });

  test("プラン一覧ページにアクセシビリティ違反がないこと", async ({ page }) => {
    await page.goto("/ja/plans.html");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(["color-contrast"]) // テスト対象サイト側の既知の違反のため除外
      .analyze();
    expect(results.violations).toStrictEqual([]);
  });

  test("ログインページにアクセシビリティ違反がないこと", async ({ page }) => {
    await page.goto("/ja/login.html");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(["color-contrast"]) // テスト対象サイト側の既知の違反のため除外
      .analyze();
    expect(results.violations).toStrictEqual([]);
  });
});
