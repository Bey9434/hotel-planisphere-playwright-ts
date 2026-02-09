import { test, expect } from "@playwright/test";
import { goToLoginPage, emailInput, passwordInput, loginButton, loginPageTitle, emailErrorMessage, passwordErrorMessage } from '../pages/login.pages';

test("login", async ({ page }) => {
    await goToLoginPage(page);
    // ログインタイトルが表示されているか
    await expect(loginPageTitle(page)).toBeVisible();
    // メールアドレスの入力欄が表示されているか
    await expect(emailInput(page)).toBeVisible();
    await loginButton(page).click();
    // メールアドレスのエラーメッセージが表示されているか
    await expect(emailErrorMessage(page)).toHaveText('このフィールドを入力してください。');
    // パスワードの入力欄が表示されているか
    await expect(passwordInput(page)).toBeVisible();
    // パスワードのエラーメッセージが表示されているか
    await expect(passwordErrorMessage(page)).toHaveText('このフィールドを入力してください。');
});

