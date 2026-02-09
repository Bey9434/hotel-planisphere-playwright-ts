import type { Locator, Page } from '@playwright/test';

//ログインページへ進む
export const goToLoginPage = (page: Readonly<Page>): Promise<unknown> =>
    page.goto("login");
//ログインページのタイトル確認
export const loginPageTitle = (page: Readonly<Page>): Locator =>
    page.getByRole("heading", { name: "ログイン" });
//メールアドレスの入力フォーム確認
export const emailInput = (page: Readonly<Page>): Locator =>
    page.getByLabel("メールアドレス");
//パスワードの入力フォーム確認
export const passwordInput = (page: Readonly<Page>): Locator =>
    page.getByLabel("パスワード");
// ログインボタンを押す
export const loginButton = (page: Readonly<Page>): Locator =>
    page.locator('#login-button');
//メールエラーメッセージの表示
export const emailErrorMessage = (page: Readonly<Page>): Locator =>
    page.locator('#email-message');
// パスワードエラーメッセージの表示
export const passwordErrorMessage = (page: Readonly<Page>): Locator =>
    page.locator('#password-message');
// メールアドレスとパスワードを入力しログインする
export const LoginPage = (page: Readonly<Page>) => {


}