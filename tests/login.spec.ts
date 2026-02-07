import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
    await page.goto("login");
    // ログインタイトルが表示されているか
    await expect(page.getByRole("heading", { name: "ログイン" })).toBeVisible();
    // メールアドレスの入力欄が表示されているか
    await expect(page.getByRole("textbox", { name: "メールアドレス", exact: true })).toBeVisible();
    // パスワードの入力欄が表示されているか
    await expect(page.getByRole("textbox", { name: "パスワード", exact: true })).toBeVisible();
    // ログインボタンが表示されているか
    await expect(page.locator("#login-form").getByRole("button", { name: "ログイン", exact: true })).toBeVisible();
});