import type { Page } from "@playwright/test";

// ページタイトル
export const PLANS_PAGE_TITLE =
  "宿泊プラン一覧 | HOTEL PLANISPHERE - テスト自動化練習サイト" as const;

// 宿泊プラン一覧ページへ遷移する
export const navigateToPlans = (page: Readonly<Page>): Promise<unknown> =>
  page.goto("/ja/plans.html");
