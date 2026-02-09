import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
    await page.goto("login");
    // ログインタイトルが表示されているか
    await expect(page.getByRole("heading", { name: "ログイン" })).toBeVisible();
    // ログインボタンをクリックする
    await page.locator("#login-form").getByRole("button", { name: "ログイン", exact: true }).click();
    // メールアドレスの入力欄が表示されているか
    await expect(page.getByRole("textbox", { name: "メールアドレス", exact: true })).toBeVisible();
    // メールアドレスのエラーメッセージが表示されているか
    await expect(page.locator('#email-message')).toHaveText('このフィールドを入力してください。');
    // パスワードの入力欄が表示されているか
    await expect(page.getByRole("textbox", { name: "パスワード", exact: true })).toBeVisible();
    // パスワードのエラーメッセージが表示されているか
    await expect(page.locator('#password-message')).toHaveText('このフィールドを入力してください。');
});

