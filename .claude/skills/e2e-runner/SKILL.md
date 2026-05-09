---
name: e2e-runner
description: Playwright E2Eテストの作成・実行・デバッグ。新規テスト実装、失敗調査、フレーキー解消に使用。
argument-hint: [テスト対象の機能名]
allowed-tools: Read, Grep, Glob, Bash, Edit, Write
paths: "tests/**/*.ts,pages/**/*.ts"
model: inherit
---

# E2E テスト作成・実行

引数: $ARGUMENTS

`.agent/rules/e2e-runner.md` のルールに従って作業してください。

## 現在のテスト状況

!`ls tests/*.spec.ts 2>/dev/null`

## 既存の Page Object

!`ls pages/*.ts 2>/dev/null`

## Phase 1: 計画（Planning）

テストコードを書く前に、以下を明確にして提示する：

- **ターゲット**: どのユーザーフローをテストするか
- **検証ポイント**: 何をもって「成功」と定義するか
- **リスク分類**: HIGH（認証, 決済） / MEDIUM（検索, ナビゲーション） / LOW（UI 表示）

ユーザーの承認を待つ。

## Phase 2: Page Object の確認・作成

`pages/` 配下の既存 Page Object を確認し、必要に応じて新規作成する。

準拠ルール：

- `.agent/rules/e2e-runner.md` の Functional POM パターンに従う（クラスではなく関数）
- ロケーター優先順位: `getByRole` > `getByLabel` > `getByPlaceholder` > `getByTestId` > `getByText`
- ロケーター単体を返す関数も個別に export する

## Phase 3: テスト実装

`tests/` 配下に `.spec.ts` ファイルを作成する。

準拠ルール：

- AAA パターン（Arrange / Act / Assert）をコメントで明示
- テスト名は振る舞いを日本語で説明する
- `.spec.ts` 内に `page.locator(...)` を直接書かない
- `waitForTimeout` の使用禁止

## Phase 4: 実行と安定性確認

```bash
# 単一実行
pnpm exec playwright test tests/<ファイル名>.spec.ts

# 特定ブラウザで実行
pnpm exec playwright test tests/<ファイル名>.spec.ts --project=chromium
pnpm exec playwright test tests/<ファイル名>.spec.ts --project=firefox
pnpm exec playwright test tests/<ファイル名>.spec.ts --project=webkit

# 安定性確認（3回以上繰り返し）
pnpm exec playwright test tests/<ファイル名>.spec.ts --repeat-each=3
```

### テスト種別ごとの注意

- **E2E テスト**（`vrt.spec.ts` を除く）: 全ブラウザで実行
- **アクセシビリティテスト**: `AxeBuilder` + WCAG 2.1 AA。既知の SUT 側問題は `disableRules()` で除外可
- **VRT**: Chromium のみ（`toHaveScreenshot()` + `maxDiffPixelRatio: 0.01`）

## Phase 5: デバッグ（失敗時）

テストが失敗した場合、以下の順序で対応する：

1. **エラーログを読む** — エラーメッセージを正確に把握
2. **トレース/スクリーンショットを確認** — `pnpm exec playwright show-trace` で視覚的に確認
3. **ロケーター/タイミングの問題を修正** — 盲目的にリトライしない

フレーキーテストが解消できない場合：

```typescript
test("flaky: マーケット検索", async ({ page }) => {
  test.fixme(true, "フレーキー — Issue #xxx");
});
```

## 完了条件

- [ ] テストが 3 回連続で成功する
- [ ] `.spec.ts` 内に直接ロケーターがない
- [ ] Page Object が Functional POM パターンに準拠している
- [ ] テスト名が振る舞いを日本語で説明している
