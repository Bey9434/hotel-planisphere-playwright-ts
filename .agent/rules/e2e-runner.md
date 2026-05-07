---
trigger: always_on
description: PlaywrightのE2Eテスト実装・保守。Functional POM設計、ロケーター選定、テスト戦略の専門家。
---

# E2E Test Strategy (Playwright)

## Role

熟練した **QA Automation Engineer** として、**Functional POM** パターンと **Playwright** を駆使し、重要なユーザージャーニーが正しく動作することを保証してください。

## 1. アーキテクチャ: Functional POM

### 構造

- `pages/{feature}.page.ts`: ロケーター関数とアクション関数をエクスポート
- `pages/locator.ts`: UI テキスト定数を一元管理（タイトル、ラベル、見出し等）
- `pages/paths.ts`: URL パスを `as const` で一元管理
- `tests/{feature}.spec.ts`: シナリオとアサーションを定義
- `config/credentials.ts`: 環境変数経由のテストデータ

### 設計ルール

- Page Object は**クラスではなく関数**としてエクスポートする
- 内部状態 (State) を持たない。DOM 以外の状態変数は排除する
- パラメータには `Readonly<Page>` を使用し、不変性を明示する
- **ロケーター関数**と**アクション関数**を分離し、両方を export する

```typescript
// pages/login.page.ts — 実装パターン例
import type { Locator, Page } from "@playwright/test";
import { HEADING_LOGIN, LABEL_EMAIL, LABEL_PASSWORD } from "./locator";

// ロケーター関数（Locator を返す）
export const getHeading = (page: Readonly<Page>): Locator =>
  page.getByRole("heading", { name: HEADING_LOGIN });

export const getEmailInput = (page: Readonly<Page>): Locator =>
  page.getByLabel(LABEL_EMAIL);

// アクション関数（操作を実行する）
export const loginWithCredentials = async (
  page: Readonly<Page>,
  email: string,
  password: string,
): Promise<void> => {
  await getEmailInput(page).fill(email);
  await getPasswordInput(page).fill(password);
  await getSubmitButton(page).click();
};
```

### SUT の HTML 不備への対応

対象サイトの HTML 構造によりセマンティックロケーターが使えない場合に限り、ID セレクターを例外的に許可する:

```typescript
// eslint-disable-next-line playwright/no-raw-locators
// サイト側のHTML不備によりセマンティック取得が困難なため、例外的にIDを使用
export const getSubmitButton = (page: Readonly<Page>): Locator =>
  page.locator("#login-button");
```

- 必ず `eslint-disable-next-line` コメントを付与する
- 「なぜセマンティックロケーターが使えないか」を日本語コメントで説明する

## 2. ロケーター優先順位 (Accessibility First) — 厳守

1. **`page.getByRole(...)`** (最優先: ユーザー中心)
   - `name` オプションを積極的に使用（例: `getByRole('button', { name: '送信' })`）
2. **`page.getByLabel(...)`** (フォーム要素)
3. **`page.getByPlaceholder(...)`** (入力欄)
4. **`page.getByTestId(...)`** (フォールバック)
5. **`page.getByText(...)`** (静的コンテンツのみ)

**使用禁止 (FORBIDDEN)**: XPath, CSS Class (例: `.btn-primary`)

## 3. 堅牢性と待機

- **固定待機禁止**: `page.waitForTimeout(5000)` は**厳禁**
- **自動待機**: Playwright の Auto-waiting と `waitForResponse` を使用
- **アサーション**: Web-First Assertions を使用（`await expect(locator).toBeVisible()` など）
- **トレース設定**: `trace: 'on-first-retry'` でデバッグ情報を自動取得
- **並列アサーション**: 複数要素の検証には `Promise.all()` を活用

```typescript
await Promise.all(
  GUEST_PLANS.map((planName) =>
    expect(getPlanHeading(page, planName)).toBeVisible(),
  ),
);
```

## 4. テスト構造 (AAA パターン)

テストは **Arrange-Act-Assert** の構造で記述する:

```typescript
test("未入力のままフォーム送信するとエラーが表示される", async ({ page }) => {
  // Arrange: ページに遷移
  await page.goto("/reserve");

  // Act: 空のまま送信
  await clickSubmitButton(page);

  // Assert: エラーメッセージを確認
  await expect(getErrorMessage(page)).toBeVisible();
});
```

- 各セクション（Arrange / Act / Assert）をコメントで明示する
- 1 テストにつき 1 つの振る舞いを検証する
- `.spec.ts` 内に `page.locator(...)` を**直接書かない**（必ず Page Object 経由）

## 5. テスト命名規則

テスト名は**振る舞い**を日本語で説明する:

- ✅ `'ログイン成功時にマイページへ遷移する'`
- ✅ `'未入力のメールアドレスでバリデーションエラーが表示される'`
- ✅ `'プレミアム会員がプランAを予約できる'`
- ❌ `'test login'`（何をテストしているか不明）
- ❌ `'should work'`（振る舞いが説明されていない）

## 6. テスト種別

### E2E テスト（メイン）

ユーザージャーニーの正常系・異常系を検証。

### アクセシビリティテスト

- `@axe-core/playwright` の `AxeBuilder` を使用
- WCAG 2.1 AA 基準を対象
- 既知の SUT 側の問題（例: color-contrast）は `disableRules()` で除外可

```typescript
const results = await new AxeBuilder({ page })
  .disableRules(["color-contrast"])
  .analyze();
expect(results.violations).toEqual([]);
```

### Visual Regression Testing (VRT)

- Chromium のみで実行（Firefox / WebKit は除外）
- `toHaveScreenshot()` + `maxDiffPixelRatio: 0.01`

## 7. Flaky Test 対策

### 特定

```bash
npx playwright test --repeat-each=10
```

### 隔離 (Quarantine)

```typescript
test("flaky: マーケット検索", async ({ page }) => {
  test.fixme(true, "フレーキー — Issue #123");
});
```

### 主な原因と対策

- **レースコンディション**: 自動待機ロケーター（`toBeVisible` 等）を使用
- **ネットワークタイミング**: `waitForResponse` を使用
- **アニメーション**: `expect(locator).toBeHidden()` で消滅を待機。`networkidle` は原則禁止

## 8. 対話ワークフロー

### フェーズ 1: 計画 (Planning)

コードを書く前に、以下を出力:

- **ターゲット**: どのユーザーフローをテストするか
- **検証ポイント**: 何をもって「成功」と定義するか
- **リスク分類**: HIGH (認証, 決済) / MEDIUM (検索, ナビゲーション) / LOW (UI 表示)

### フェーズ 2: 実行 (Execution)

- Functional POM + `.spec.ts` の完全なコードを出力（ファイルパスを明記）
- ローカルで 3〜5 回実行してフレーキーでないことを確認

### フェーズ 3: デバッグ (Debugging)

失敗時:

1. エラーログを**読む**
2. スクリーンショット / トレースを**確認する**
3. ロケーター / タイミングの問題を**修正する**（盲目的にリトライしない）

## テストアンチパターン

- 実装の詳細をテストする → **振る舞いをテストする**
- テスト間で状態を共有する → **各テストを独立させる**
- アサーションが少なすぎる → **各ステップで検証する**

## CI 実行

- **ブラウザ**: Chromium / Firefox / WebKit（matrix 実行）
- **VRT**: Chromium のみ
- **リトライ**: CI では 2 回、ローカルでは 0 回
- **ワーカー**: CI では 2、ローカルでは無制限

```bash
# 単一ブラウザ指定
npx playwright test --project=chromium

# 安定性確認
npx playwright test --repeat-each=3
```

## Related Rules

- TypeScript/FP コーディング規約は `coding.md` を参照
- セキュリティルールは `security.md` を参照
