// ページタイトル
export const TITLES = {
  HOME: "HOTEL PLANISPHERE - テスト自動化練習サイト",
  PLANS: "宿泊プラン一覧 | HOTEL PLANISPHERE - テスト自動化練習サイト",
  LOGIN: "ログイン | HOTEL PLANISPHERE - テスト自動化練習サイト",
} as const;

// プラン名
export const PLAN_TOKUTEN = "お得な特典付きプラン" as const;
export const PLAN_SUDOMARI = "素泊まり" as const;
export const PLAN_BUSINESS = "出張ビジネスプラン" as const;
export const PLAN_ESTHE = "エステ・マッサージプラン" as const;
export const PLAN_ROTENBURO = "貸し切り露天風呂プラン" as const;
export const PLAN_COUPLE = "カップル限定プラン" as const;
export const PLAN_THEMEPARK = "テーマパーク優待プラン" as const;
export const PLAN_DINNER = "ディナー付きプラン" as const;
export const PLAN_OTOKU = "お得なプラン" as const;
export const PLAN_PREMIUM = "プレミアムプラン" as const;

// フォームラベル（ログイン）
export const LABEL_EMAIL = "メールアドレス" as const;
export const LABEL_PASSWORD = "パスワード" as const;

// フォームラベル（予約）
export const LABEL_DATE = "宿泊日" as const;
export const LABEL_TERM = "宿泊数" as const;
export const LABEL_HEAD_COUNT = "人数" as const;
export const LABEL_BREAKFAST = "朝食バイキング" as const;
export const LABEL_EARLY_CHECK_IN = "昼からチェックインプラン" as const;
export const LABEL_SIGHTSEEING = "お得な観光プラン" as const;
export const LABEL_USERNAME = "氏名" as const;
export const LABEL_CONTACT = "確認のご連絡" as const;
export const LABEL_TEL = "電話番号" as const;

// ボタンラベル（予約フォーム）
export const BUTTON_SUBMIT_RESERVATION = "予約内容を確認する" as const;
export const BUTTON_CONFIRM_RESERVATION = "この内容で予約する" as const;
export const BUTTON_CLOSE_MODAL = "閉じる" as const;

// 予約完了モーダル
export const HEADING_SUCCESS_MODAL = "予約を完了しました" as const;

// 見出し
export const HEADING_LOGIN = "ログイン" as const;
export const HEADING_CONFIRM = "宿泊予約確認" as const;

// 予約フォームのバリデーションエラーメッセージ
export const ERROR_REQUIRED_FIELD =
  "このフィールドを入力してください。" as const;
export const ERROR_DATE_PAST = "翌日以降の日付を入力してください。" as const;
export const ERROR_DATE_MAX = "3ヶ月以内の日付を入力してください。" as const;
// ブラウザが "{min}以上の値を入力してください。" の形式で生成するため正規表現で照合
export const ERROR_MIN_VALUE = /以上の値を入力してください。/;

// 予約テストデータ
export const TEST_RESERVATION_NAME = "テスト太郎" as const;
export const TEST_RESERVATION_EMAIL = "test@example.com" as const;
export const TEST_RESERVATION_TEL = "09012345678" as const;
