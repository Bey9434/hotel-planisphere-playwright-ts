import type { Locator, Page } from "@playwright/test";
import { HEADING_LOGIN, LABEL_EMAIL, LABEL_PASSWORD } from "./locator";
import { PATHS } from "./paths";

// ログインページへ遷移する
export const navigateToLogin = (page: Readonly<Page>): Promise<unknown> =>
  page.goto(PATHS.LOGIN);

// ログインページの見出しを取得する
export const getHeading = (page: Readonly<Page>): Locator =>
  page.getByRole("heading", { name: HEADING_LOGIN });

// メールアドレス入力欄を取得する
export const getEmailInput = (page: Readonly<Page>): Locator =>
  page.getByLabel(LABEL_EMAIL);

// パスワード入力欄を取得する
export const getPasswordInput = (page: Readonly<Page>): Locator =>
  page.getByLabel(LABEL_PASSWORD);

// ログインボタンを取得する
export const getSubmitButton = (page: Readonly<Page>): Locator =>
  // eslint-disable-next-line playwright/no-raw-locators
  page.locator("#login-button");

// メールアドレスのエラーメッセージを取得する
export const getEmailErrorMessage = (page: Readonly<Page>): Locator =>
  // eslint-disable-next-line playwright/no-raw-locators
  page.locator("#email-message");

export const getPasswordErrorMessage = (page: Readonly<Page>): Locator =>
  // eslint-disable-next-line playwright/no-raw-locators
  page.locator("#password-message");

// メールアドレスとパスワードを引数で受け取り、ログインする
export const loginWithCredentials = async (
  page: Readonly<Page>,
  email: string,
  password: string,
): Promise<void> => {
  await navigateToLogin(page);
  await getEmailInput(page).fill(email);
  await getPasswordInput(page).fill(password);
  await getSubmitButton(page).click();
};
