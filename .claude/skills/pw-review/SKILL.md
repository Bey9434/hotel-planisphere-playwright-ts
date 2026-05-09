---
name: pw-review
description: Playwright テストコードの固有チェック。ロケーター優先順位、Functional POM、waitForTimeout 禁止等を検査。
argument-hint: ""
allowed-tools: Read, Grep, Glob, Bash
model: inherit
---

# Playwright テストコードレビュー

## 現在の変更状況

!`git diff --stat HEAD`

## 対象ファイルの収集

```bash
# staged の変更（Playwright 関連のみ）
git diff --cached --name-only | grep -E '(\.spec\.ts|pages/)'

# unstaged の変更（Playwright 関連のみ）
git diff --name-only | grep -E '(\.spec\.ts|pages/)'

# untracked ファイル（Playwright 関連のみ）
git ls-files --others --exclude-standard | grep -E '(\.spec\.ts|pages/)'
```

対象ファイルがない場合は「Playwright 関連の変更なし」で終了。

## チェック基準

`.agent/rules/review.md` と `.agent/rules/e2e-runner.md` の基準に従い、以下を検査する。

### ロケーター優先順位 (HIGH)

以下の優先順位を守っているか：

1. `page.getByRole(...)` （最優先）
2. `page.getByLabel(...)`
3. `page.getByPlaceholder(...)`
4. `page.getByTestId(...)`
5. `page.getByText(...)`

**使用禁止**: XPath、CSS クラスセレクター（`.btn-primary` 等）、ID（`data-testid` 以外）

### Page Object 分離 (HIGH)

- `.spec.ts` 内に `page.locator()` を直接書いていないか
- ロケーターは必ず `pages/` 配下の Page Object 経由で使用すること

### Functional POM パターン (HIGH)

- Page Object がクラスではなく**関数**として実装されているか
- 内部状態（State）を持っていないか（DOM 以外の状態変数は排除）
- ロケーター単体を返す関数も個別に export されているか
- パラメータの型が `Readonly<Page>` になっているか

### 待機戦略 (HIGH)

- `waitForTimeout` を使用していないか（**厳禁**）
- Web-First Assertions（`await expect(locator).toBeVisible()` 等）を使用しているか
- `networkidle` を使用していないか（タイムアウトの温床）

### テスト記述 (MEDIUM)

- テスト名が日本語で振る舞いを記述しているか
- AAA パターン（Arrange / Act / Assert）に従っているか
- テスト間で状態を共有していないか（各テストが独立しているか）

## レポート

検出事項を以下の形式で出力：

- **重要度**: CRITICAL / HIGH / MEDIUM
- **ファイル位置と行番号**
- **問題の説明**
- **修正案**（コード例付き）

CRITICAL または HIGH の問題がある場合はコミット前の修正を推奨する。
