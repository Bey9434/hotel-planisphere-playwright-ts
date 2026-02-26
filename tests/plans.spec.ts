import { test, expect } from "@playwright/test";
import {
  navigateToPlans,
  PLANS_PAGE_TITLE,
  getPlanHeading,
} from "../pages/plans.page";
import { navigateToLogin, loginWithCredentials } from "../pages/login.page";

const GUEST_PLANS = [
  "お得な特典付きプラン", // ID:0 なし
  "素泊まり", // ID:4 なし
  "出張ビジネスプラン", // ID:5 なし
  "エステ・マッサージプラン", // ID:6 なし
  "貸し切り露天風呂プラン", // ID:7 なし
  "カップル限定プラン", // ID:8 なし
  "テーマパーク優待プラン", // ID:9 なし
];

const GENERAL_PLANS = [
  ...GUEST_PLANS,
  "ディナー付きプラン", // ID:2 一般会員
  "お得なプラン", // ID:3 一般会員
];

const PREMIUM_PLANS = [
  ...GENERAL_PLANS,
  "プレミアムプラン", // ID:1 プレミアム会員
];

test.describe("宿泊プラン一覧", () => {
  test("ページタイトルが正しいこと", async ({ page }) => {
    await navigateToPlans(page);
    await expect(page).toHaveTitle(PLANS_PAGE_TITLE);
  });

  //会員ごとにプランが違うため、期待するプランが取得できるか行う。
  //未ログイン会員の場合
  test("未ログイン会員の場合、取得するプランタイトルが正しいこと。", async ({
    page,
  }) => {
    await navigateToPlans(page);
    await Promise.all(
      GUEST_PLANS.map((planName) =>
        expect(getPlanHeading(page, planName)).toBeVisible(),
      ),
    );
  });

  //一般会員の場合
  test("一般会員の場合、取得するプランタイトルが正しいこと。", async ({
    page,
  }) => {
    await navigateToLogin(page);
    await loginWithCredentials(page, "sakura@example.com", "pass1234");
    await navigateToPlans(page);
    await Promise.all(
      GENERAL_PLANS.map((planName) =>
        expect(getPlanHeading(page, planName)).toBeVisible(),
      ),
    );
  });

  //プレミアム会員の場合
  test("プレミアム会員の場合、取得するプランタイトルが正しいこと。", async ({
    page,
  }) => {
    await navigateToLogin(page);
    await loginWithCredentials(page, "ichiro@example.com", "password");
    await navigateToPlans(page);
    await Promise.all(
      PREMIUM_PLANS.map((planName) =>
        expect(getPlanHeading(page, planName)).toBeVisible(),
      ),
    );
  });
});
