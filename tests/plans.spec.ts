import { test, expect } from "@playwright/test";
import {
  navigateToPlans,
  PLANS_PAGE_TITLE,
  getPlanHeading,
} from "../pages/plans.page";
import { navigateToLogin, loginWithCredentials } from "../pages/login.page";
import {
  PLAN_BUSINESS,
  PLAN_COUPLE,
  PLAN_DINNER,
  PLAN_ESTHE,
  PLAN_OTOKU,
  PLAN_PREMIUM,
  PLAN_ROTENBURO,
  PLAN_SUDOMARI,
  PLAN_THEMEPARK,
  PLAN_TOKUTEN,
} from "../pages/locator";

const GUEST_PLANS = [
  PLAN_TOKUTEN,
  PLAN_SUDOMARI,
  PLAN_BUSINESS,
  PLAN_ESTHE,
  PLAN_ROTENBURO,
  PLAN_COUPLE,
  PLAN_THEMEPARK,
];

import { GENERAL_USER, PREMIUM_USER } from "../config/credentials";

const GENERAL_PLANS = [...GUEST_PLANS, PLAN_DINNER, PLAN_OTOKU];

const PREMIUM_PLANS = [...GENERAL_PLANS, PLAN_PREMIUM];

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
    await loginWithCredentials(page, GENERAL_USER.email, GENERAL_USER.password);
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
    await loginWithCredentials(page, PREMIUM_USER.email, PREMIUM_USER.password);
    await navigateToPlans(page);
    await Promise.all(
      PREMIUM_PLANS.map((planName) =>
        expect(getPlanHeading(page, planName)).toBeVisible(),
      ),
    );
  });
});
