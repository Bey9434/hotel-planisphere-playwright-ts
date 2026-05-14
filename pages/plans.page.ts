import type { Page } from "@playwright/test";
import { PATHS } from "./paths";
import { TITLES } from "./locator";

export const PLANS_PAGE_TITLE = TITLES.PLANS;

// 宿泊プラン一覧ページへ遷移する

export const navigateToPlans = (page: Readonly<Page>): Promise<unknown> =>
  page.goto(PATHS.PLANS);

export const getPlanHeading = (page: Readonly<Page>, planName: string) =>
  page.getByRole("heading", { name: planName });

// プランカード全体の見出し一覧を返す（件数検証用）
export const getAllPlanHeadings = (page: Readonly<Page>) =>
  page.getByRole("heading", { level: 5 });
