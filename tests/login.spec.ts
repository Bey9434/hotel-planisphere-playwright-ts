import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
    await page.goto("login");
    // ログインタイトルが表示されているか
    await expect(page.getByRole("heading", { name: "ログイン" })).toBeVisible();
    // ユーザー名の入力欄が表示されているか
    await expect(page.getByLabel("ユーザー名", { exact: true })).toBeVisible();
    // パスワードの入力欄が表示されているか
    await expect(page.getByLabel("パスワード", { exact: true })).toBeVisible();
    // ログインボタンが表示されているか
    await expect(page.getByRole("button", { name: "ログイン", exact: true })).toBeVisible();
});