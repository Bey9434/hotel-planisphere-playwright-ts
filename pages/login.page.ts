import type { Locator, Page } from '@playwright/test';

// ログインページへ遷移する
export const navigateToLogin = (page: Readonly<Page>): Promise<unknown> =>
    page.goto("login");

// ログインページの見出しを取得する
export const getHeading = (page: Readonly<Page>): Locator =>
    page.getByRole("heading", { name: "ログイン" });

// メールアドレス入力欄を取得する
export const getEmailInput = (page: Readonly<Page>): Locator =>
    page.getByLabel("メールアドレス");

// パスワード入力欄を取得する
export const getPasswordInput = (page: Readonly<Page>): Locator =>
    page.getByLabel("パスワード");

// ログインボタンを取得する
export const getSubmitButton = (page: Readonly<Page>): Locator =>
    page.locator('#login-button');

// メールアドレスのエラーメッセージを取得する
export const getEmailErrorMessage = (page: Readonly<Page>): Locator =>
    page.locator('#email-message');

// パスワードのエラーメッセージを取得する
export const getPasswordErrorMessage = (page: Readonly<Page>): Locator =>
    page.locator('#password-message');

// メールアドレスとパスワードを入力しログインする
export const login = async (page: Readonly<Page>): Promise<void> => {
    await getEmailInput(page).fill("ichiro@example.com");
    await getPasswordInput(page).fill("password");
    await getSubmitButton(page).click();
};