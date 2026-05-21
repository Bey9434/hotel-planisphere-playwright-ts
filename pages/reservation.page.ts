import type { Page } from "@playwright/test";
import { PATHS } from "./paths";
import {
  LABEL_DATE,
  LABEL_TERM,
  LABEL_HEAD_COUNT,
  LABEL_BREAKFAST,
  LABEL_EARLY_CHECK_IN,
  LABEL_SIGHTSEEING,
  LABEL_USERNAME,
  LABEL_CONTACT,
  LABEL_EMAIL,
  LABEL_TEL,
  BUTTON_SUBMIT_RESERVATION,
  ERROR_REQUIRED_FIELD,
  ERROR_DATE_PAST,
  ERROR_DATE_MAX,
  ERROR_MIN_VALUE,
} from "./locator";

// plan-id=0（お得な特典付きプラン）をデフォルトとして使用
export const navigateToReservation = (page: Readonly<Page>, planId = 0) =>
  page.goto(`${PATHS.RESERVE}?plan-id=${planId}`);

// ロケーター
export const getDateInput = (page: Readonly<Page>) =>
  page.getByLabel(LABEL_DATE);
export const getTermInput = (page: Readonly<Page>) =>
  page.getByLabel(LABEL_TERM);
export const getHeadCountInput = (page: Readonly<Page>) =>
  page.getByLabel(LABEL_HEAD_COUNT);
export const getBreakfastCheckbox = (page: Readonly<Page>) =>
  page.getByLabel(LABEL_BREAKFAST);
export const getEarlyCheckInCheckbox = (page: Readonly<Page>) =>
  page.getByLabel(LABEL_EARLY_CHECK_IN);
export const getSightseeingCheckbox = (page: Readonly<Page>) =>
  page.getByLabel(LABEL_SIGHTSEEING);
export const getUsernameInput = (page: Readonly<Page>) =>
  page.getByLabel(LABEL_USERNAME);
export const getContactSelect = (page: Readonly<Page>) =>
  page.getByLabel(LABEL_CONTACT);
export const getEmailInput = (page: Readonly<Page>) =>
  page.getByLabel(LABEL_EMAIL);
export const getTelInput = (page: Readonly<Page>) => page.getByLabel(LABEL_TEL);
// <output> 要素は ARIA role="status" を持つ
export const getTotalBill = (page: Readonly<Page>) => page.getByRole("status");
// ボタンには data-test 属性があるが、data-testid でないため getByRole を使用
export const getSubmitButton = (page: Readonly<Page>) =>
  page.getByRole("button", { name: BUTTON_SUBMIT_RESERVATION });

// アクション
// TODO(human): 以下の3関数を修正してください
// fillDate   → triple-click の後に Control+a を追加（webkit の選択漏れ対策）
// fillTerm   → triple-click で既存値をクリアしてから fill する
// fillHeadCount → fillTerm と同じパターンで修正する
export const fillDate = async (
  page: Readonly<Page>,
  date: string,
): Promise<void> => {
  // triple-click で既存値を全選択してから上書き（JSによる事前入力に対応）
  // fill() では datepicker の change イベントが発火しないため pressSequentially を使用
  await getDateInput(page).click({ clickCount: 3 });
  await getDateInput(page).press("Control+a");
  await getDateInput(page).pressSequentially(date);
  await getDateInput(page).press("Tab");
};

export const fillTerm = async (
  page: Readonly<Page>,
  term: number | string,
): Promise<void> => {
  await getTermInput(page).click({ clickCount: 3 });
  await getTermInput(page).fill(String(term));
};

export const fillHeadCount = async (
  page: Readonly<Page>,
  count: number | string,
) => {
  await getHeadCountInput(page).click({ clickCount: 3 });
  await getHeadCountInput(page).fill(String(count));
};
export const fillUsername = (page: Readonly<Page>, name: string) =>
  getUsernameInput(page).fill(name);

export const selectContact = (
  page: Readonly<Page>,
  value: "no" | "email" | "tel",
) => getContactSelect(page).selectOption(value);

export const fillEmail = (page: Readonly<Page>, email: string) =>
  getEmailInput(page).fill(email);

export const fillTel = (page: Readonly<Page>, tel: string) =>
  getTelInput(page).fill(tel);

export const submitForm = (page: Readonly<Page>) =>
  getSubmitButton(page).click();

// エラーメッセージロケーター
export const getRequiredFieldError = (page: Readonly<Page>) =>
  page.getByText(ERROR_REQUIRED_FIELD);
export const getDatePastError = (page: Readonly<Page>) =>
  page.getByText(ERROR_DATE_PAST);
export const getDateMaxError = (page: Readonly<Page>) =>
  page.getByText(ERROR_DATE_MAX);
// ブラウザのバリデーションメッセージは "{n}以上の値を入力してください。" 形式
export const getMinValueError = (page: Readonly<Page>) =>
  page.getByText(ERROR_MIN_VALUE);
