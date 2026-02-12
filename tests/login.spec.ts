import { test, expect } from "@playwright/test";
import { navigateToLogin, getEmailInput, getPasswordInput, getSubmitButton, getHeading, getEmailErrorMessage, getPasswordErrorMessage, login } from '../pages/login.page';

test.describe("ログイン機能", () => {
    test("タイトルが表示されるか", async ({ page }) => {
        await navigateToLogin(page);
        await expect(getHeading(page)).toBeVisible()
    });

    test("メールアドレスとパスワードの入力欄が表示されているか", async ({ page }) => {
        await navigateToLogin(page);
        await expect(getEmailInput(page)).toBeVisible()
        await expect(getPasswordInput(page)).toBeVisible()
    });

    test("メールアドレスとパスワードが未入力の場合、エラーメッセージが表示されるか", async ({ page }) => {
        await navigateToLogin(page);
        await getSubmitButton(page).click();
        await expect(getEmailErrorMessage(page)).toHaveText('このフィールドを入力してください。');
        await expect(getPasswordInput(page)).toBeVisible();
        await expect(getPasswordErrorMessage(page)).toHaveText('このフィールドを入力してください。')
    });

    test("メールアドレスとパスワードが正しく入力されている場合、マイページに遷移するか", async ({ page }) => {
        await navigateToLogin(page);
        await login(page);
        await expect(page).toHaveTitle(/マイページ/);
    });
});
