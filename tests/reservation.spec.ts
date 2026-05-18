import { test, expect } from "@playwright/test";
import {
  navigateToReservation,
  fillDate,
  fillTerm,
  fillHeadCount,
  fillUsername,
  selectContact,
  fillEmail,
  fillTel,
  submitForm,
  getBreakfastCheckbox,
  getEarlyCheckInCheckbox,
  getSightseeingCheckbox,
  getTotalBill,
  getSubmitButton,
  getDateInput,
  getRequiredFieldError,
  getDatePastError,
  getDateMaxError,
  getMinValueError,
} from "../pages/reservation.page";
import {
  confirmReservation,
  getSuccessModalTitle,
  getConfirmHeading,
} from "../pages/confirm.page";
import {
  TEST_RESERVATION_NAME,
  TEST_RESERVATION_EMAIL,
  TEST_RESERVATION_TEL,
} from "../config/test-data";

// 日付を YYYY/MM/DD 形式にフォーマット（datepicker の期待フォーマット）
const formatDate = (date: Date): string => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
};

// 基準日から n 日後の Date を返す
const addDays = (base: Date, n: number): Date => {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
};

// 基本必須項目を入力するヘルパー
// 連絡希望を "no" に固定することで email/tel の条件分岐入力を除外し、最小限のフォーム完成状態を作る
// 日付を最後に入力するのは、他フィールドの操作をトリガーに JS が日付を再設定するため
// （先に入力した日付が上書きされる問題を回避）
const fillBasicReservation = async (
  page: Parameters<typeof navigateToReservation>[0],
  date: string,
  term = 1,
  headCount = 1,
) => {
  await fillTerm(page, term);
  await fillHeadCount(page, headCount);
  await fillUsername(page, TEST_RESERVATION_NAME);
  await selectContact(page, "no");
  await fillDate(page, date);
};

test.describe("宿泊予約", () => {
  test.describe("正常系", () => {
    test("必須項目をすべて入力して予約確認画面に遷移できること", async ({
      page,
    }) => {
      // Arrange
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);

      // Act
      await fillBasicReservation(page, tomorrow);
      await submitForm(page);

      // Assert: 確認画面に遷移
      await expect(page).toHaveURL(/confirm\.html/);
      await expect(getConfirmHeading(page)).toBeVisible();
    });

    test("オプション（朝食バイキング・昼からチェックインプラン・お得な観光プラン）を選択して合計金額が正しく計算されること", async ({
      page,
    }) => {
      // Arrange
      // fillDate は他フィールド操作後に JS が日付を再セットするため最後に入力する
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);
      await fillTerm(page, 1);
      await fillHeadCount(page, 1);
      await fillDate(page, tomorrow);

      // Act & Assert: 基準金額を取得し、オプション追加ごとに期待値を Web-First Assertion で検証
      const baseText = await getTotalBill(page).textContent();
      const base = parseInt((baseText ?? "0").replace(/[^\d]/g, ""), 10);
      expect(base).toBeGreaterThan(0);

      // オプション1つ（朝食: +1,000円）
      await getBreakfastCheckbox(page).check();
      await expect(getTotalBill(page)).toHaveText(
        `${(base + 1000).toLocaleString("ja-JP")}円`,
      );

      // オプション3つ（朝食 + 昼チェックイン + 観光: +3,000円）
      await getEarlyCheckInCheckbox(page).check();
      await getSightseeingCheckbox(page).check();
      await expect(getTotalBill(page)).toHaveText(
        `${(base + 3000).toLocaleString("ja-JP")}円`,
      );
    });

    test("確認のご連絡で「希望しない」を選択して予約できること", async ({
      page,
    }) => {
      // Arrange
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);

      // Act
      await fillBasicReservation(page, tomorrow);
      await submitForm(page);

      // Assert
      await expect(page).toHaveURL(/confirm\.html/);
      await expect(getConfirmHeading(page)).toBeVisible();
    });

    test("確認のご連絡で「メールでのご連絡」を選択し、メールアドレスを入力して予約できること", async ({
      page,
    }) => {
      // Arrange
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);

      // Act: fillDate は JS による日付再セットを避けるため最後に入力する
      await fillTerm(page, 1);
      await fillHeadCount(page, 1);
      await fillUsername(page, TEST_RESERVATION_NAME);
      await selectContact(page, "email");
      await fillEmail(page, TEST_RESERVATION_EMAIL);
      await fillDate(page, tomorrow);
      await submitForm(page);

      // Assert
      await expect(page).toHaveURL(/confirm\.html/);
      await expect(getConfirmHeading(page)).toBeVisible();
    });

    test("確認のご連絡で「電話でのご連絡」を選択し、電話番号を入力して予約できること", async ({
      page,
    }) => {
      // Arrange
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);

      // Act: fillDate は JS による日付再セットを避けるため最後に入力する
      await fillTerm(page, 1);
      await fillHeadCount(page, 1);
      await fillUsername(page, TEST_RESERVATION_NAME);
      await selectContact(page, "tel");
      await fillTel(page, TEST_RESERVATION_TEL);
      await fillDate(page, tomorrow);
      await submitForm(page);

      // Assert
      await expect(page).toHaveURL(/confirm\.html/);
      await expect(getConfirmHeading(page)).toBeVisible();
    });

    test("宿泊予約完了後に、アニメーション付きダイアログが表示されること", async ({
      page,
    }) => {
      // Arrange
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);
      await fillBasicReservation(page, tomorrow);
      await submitForm(page);
      await expect(page).toHaveURL(/confirm\.html/);

      // Act: 確認画面で予約確定
      await confirmReservation(page);

      // Assert: 完了モーダルが表示される
      await expect(getSuccessModalTitle(page)).toBeVisible();
    });
  });

  test.describe("異常系", () => {
    test("宿泊日を未入力で送信するとエラーメッセージが表示されること", async ({
      page,
    }) => {
      // Arrange: すべて入力してから宿泊日をクリア（バリデーション表示を誘発）
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);
      await fillBasicReservation(page, tomorrow);

      // Act: 宿泊日をクリアしてフォーカスを外す
      await getDateInput(page).click({ clickCount: 3 });
      await getDateInput(page).press("Delete");
      await getDateInput(page).press("Tab");

      // Assert
      await expect(getRequiredFieldError(page)).toBeVisible();
    });

    test("宿泊日に過去の日付を入力するとエラーメッセージが表示されること", async ({
      page,
    }) => {
      // Arrange: 先に有効な日付でフォームを入力してから日付を上書き
      const tomorrow = formatDate(addDays(new Date(), 1));
      const yesterday = formatDate(addDays(new Date(), -1));
      await navigateToReservation(page);
      await fillBasicReservation(page, tomorrow);

      // Act: 過去日付で上書き（fillDate は triple-click で既存値をクリアしてから入力）
      await fillDate(page, yesterday);

      // Assert
      await expect(getDatePastError(page)).toBeVisible();
    });

    test("氏名を未入力で送信するとエラーメッセージが表示されること", async ({
      page,
    }) => {
      // Arrange: 氏名以外を入力
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);
      await fillDate(page, tomorrow);
      await fillTerm(page, 1);
      await fillHeadCount(page, 1);
      await selectContact(page, "no");

      // Act: 氏名は空のまま送信を試みる
      await getSubmitButton(page).click();

      // Assert
      await expect(getRequiredFieldError(page)).toBeVisible();
    });

    test("確認のご連絡で「メールでのご連絡」を選択し、メールアドレス未入力で送信するとエラーが表示されること", async ({
      page,
    }) => {
      // Arrange
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);
      await fillDate(page, tomorrow);
      await fillTerm(page, 1);
      await fillHeadCount(page, 1);
      await fillUsername(page, TEST_RESERVATION_NAME);
      await selectContact(page, "email");

      // Act: メールアドレスは空のまま送信
      await getSubmitButton(page).click();

      // Assert
      await expect(getRequiredFieldError(page)).toBeVisible();
    });

    test("確認のご連絡で「電話でのご連絡」を選択し、電話番号未入力で送信するとエラーが表示されること", async ({
      page,
    }) => {
      // Arrange
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);
      await fillDate(page, tomorrow);
      await fillTerm(page, 1);
      await fillHeadCount(page, 1);
      await fillUsername(page, TEST_RESERVATION_NAME);
      await selectContact(page, "tel");

      // Act: 電話番号は空のまま送信
      await getSubmitButton(page).click();

      // Assert
      await expect(getRequiredFieldError(page)).toBeVisible();
    });

    test("宿泊数にマイナス値を入力するとエラーメッセージが表示されること", async ({
      page,
    }) => {
      // Arrange
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);
      await fillDate(page, tomorrow);
      await fillHeadCount(page, 1);
      await fillUsername(page, TEST_RESERVATION_NAME);
      await selectContact(page, "no");

      // Act
      await fillTerm(page, -1);
      await getSubmitButton(page).click();

      // Assert
      await expect(getMinValueError(page)).toBeVisible();
    });

    test("人数にマイナス値を入力するとエラーメッセージが表示されること", async ({
      page,
    }) => {
      // Arrange
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);
      await fillDate(page, tomorrow);
      await fillTerm(page, 1);
      await fillUsername(page, TEST_RESERVATION_NAME);
      await selectContact(page, "no");

      // Act
      await fillHeadCount(page, -1);
      await getSubmitButton(page).click();

      // Assert
      await expect(getMinValueError(page)).toBeVisible();
    });
  });

  test.describe("境界値", () => {
    test("宿泊日に今日の日付を入力するとエラーメッセージが表示されること（最小有効日は翌日）", async ({
      page,
    }) => {
      // Arrange
      // new Date() を1回だけ取得し、深夜0時付近での日付ズレによるフレーキーを防ぐ
      const now = new Date();
      const tomorrow = formatDate(addDays(now, 1));
      const today = formatDate(now);
      await navigateToReservation(page);
      await fillBasicReservation(page, tomorrow);

      // Act: 今日の日付で上書き（minDate:1 により翌日以降のみ有効）
      await fillDate(page, today);

      // Assert
      await expect(getDatePastError(page)).toBeVisible();
    });

    test("宿泊日に明日の日付を入力して予約できること（最小有効日）", async ({
      page,
    }) => {
      // Arrange: minDate:1 により翌日が最小有効日
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);

      // Act
      await fillBasicReservation(page, tomorrow);
      await submitForm(page);

      // Assert
      await expect(page).toHaveURL(/confirm\.html/);
      await expect(getConfirmHeading(page)).toBeVisible();
    });

    test("宿泊日に3ヶ月後（90日後）の日付を入力して予約できること", async ({
      page,
    }) => {
      // Arrange: maxDate:90 より、90日後が上限
      const ninetyDaysLater = formatDate(addDays(new Date(), 90));
      await navigateToReservation(page);

      // Act
      await fillBasicReservation(page, ninetyDaysLater);
      await submitForm(page);

      // Assert
      await expect(page).toHaveURL(/confirm\.html/);
      await expect(getConfirmHeading(page)).toBeVisible();
    });

    test("宿泊日に3ヶ月後+1日（91日後）の日付を入力するとエラーが表示されること", async ({
      page,
    }) => {
      // Arrange: maxDate:90 より、91日後は範囲外
      const ninetyOneDaysLater = formatDate(addDays(new Date(), 91));
      await navigateToReservation(page);

      // Act: fillBasicReservation で基本情報を入力（日付は最後にセット）
      await fillBasicReservation(page, ninetyOneDaysLater);
      await getSubmitButton(page).click();

      // Assert
      await expect(getDateMaxError(page)).toBeVisible();
    });

    test("宿泊数を0泊にするとエラーが表示されること（最小有効値1の隣）", async ({
      page,
    }) => {
      // Arrange: fillDate は JS による日付再セットを避けるため最後に入力する
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);
      await fillHeadCount(page, 1);
      await fillUsername(page, TEST_RESERVATION_NAME);
      await selectContact(page, "no");

      // Act
      await fillTerm(page, 0);
      await fillDate(page, tomorrow);
      await getSubmitButton(page).click();

      // Assert
      await expect(getMinValueError(page)).toBeVisible();
    });

    test("宿泊数を1泊にして予約できること", async ({ page }) => {
      // Arrange
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);

      // Act
      await fillBasicReservation(page, tomorrow, 1, 2);
      await submitForm(page);

      // Assert
      await expect(page).toHaveURL(/confirm\.html/);
      await expect(getConfirmHeading(page)).toBeVisible();
    });

    test("人数を0名にするとエラーが表示されること（最小有効値1の隣）", async ({
      page,
    }) => {
      // Arrange: fillDate は JS による日付再セットを避けるため最後に入力する
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);
      await fillTerm(page, 1);
      await fillUsername(page, TEST_RESERVATION_NAME);
      await selectContact(page, "no");

      // Act
      await fillHeadCount(page, 0);
      await fillDate(page, tomorrow);
      await getSubmitButton(page).click();

      // Assert
      await expect(getMinValueError(page)).toBeVisible();
    });

    test("人数を1名にして予約できること", async ({ page }) => {
      // Arrange
      const tomorrow = formatDate(addDays(new Date(), 1));
      await navigateToReservation(page);

      // Act
      await fillBasicReservation(page, tomorrow, 2, 1);
      await submitForm(page);

      // Assert
      await expect(page).toHaveURL(/confirm\.html/);
      await expect(getConfirmHeading(page)).toBeVisible();
    });
  });
});
