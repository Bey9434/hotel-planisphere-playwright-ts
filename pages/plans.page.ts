import type { Page } from "@playwright/test";
export { TITLE_PLANS as PLANS_PAGE_TITLE } from "./locator";

// 宿泊プラン一覧ページへ遷移する

export const navigateToPlans = (page: Readonly<Page>): Promise<unknown> =>
  page.goto("/ja/plans.html");

export const getPlanHeading = (page: Readonly<Page>, planName: string) =>
  page.getByRole("heading", { name: planName });
