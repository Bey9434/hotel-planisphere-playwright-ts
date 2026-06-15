import { test, expect } from "@playwright/test";
import {
  navigateToLogin,
  getEmailInput,
  getPasswordInput,
  getSubmitButton,
  getHeading,
  getEmailErrorMessage,
  getPasswordErrorMessage,
  loginWithCredentials,
} from "../pages/login.page";
import { GENERAL_USER } from "../config/credentials";
import { ERROR_REQUIRED_FIELD } from "../pages/locator";

test.describe("ログイン機能", () => {
  test("タイトルが表示されるか", async ({ page }) => {
    await navigateToLogin(page);
    await expect(getHeading(page)).toBeVisible();
  });

  test("メールアドレスとパスワードの入力欄が表示されているか", async ({
    page,
  }) => {
    await navigateToLogin(page);
    await expect(getEmailInput(page)).toBeVisible();
    await expect(getPasswordInput(page)).toBeVisible();
  });

  test("メールアドレスとパスワードが未入力の時、エラーメッセージが表示されるか", async ({
    page,
  }) => {
    await navigateToLogin(page);
    await getSubmitButton(page).click();
    await expect(getEmailErrorMessage(page)).toHaveText(ERROR_REQUIRED_FIELD);
    await expect(getPasswordInput(page)).toBeVisible();
    await expect(getPasswordErrorMessage(page)).toHaveText(
      ERROR_REQUIRED_FIELD,
    );
  });

  test("メールアドレスとパスワードが正しく入力されている場合、マイページに遷移するか", async ({
    page,
  }) => {
    await navigateToLogin(page);
    await loginWithCredentials(page, GENERAL_USER.email, GENERAL_USER.password);
    await expect(page).toHaveTitle(/マイページ/);
  });
});
