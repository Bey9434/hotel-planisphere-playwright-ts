# Hotel Planisphere - Playwright E2E テスト

[![Playwright Tests](https://github.com/Bey9434/hotel-planisphere-playwright-ts/actions/workflows/playwright.yml/badge.svg)](https://github.com/Bey9434/hotel-planisphere-playwright-ts/actions/workflows/playwright.yml)

[HOTEL PLANISPHERE（テスト自動化練習サイト）](https://hotel-example-site.takeyaqa.dev/ja/) に対する **E2E テスト自動化プロジェクト** です。

## プロジェクト概要

| 項目             | 内容                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------- |
| **目的**         | Playwright + TypeScript による E2E テスト自動化のポートフォリオ                        |
| **テスト対象**   | [Hotel Planisphere](https://hotel-example-site.takeyaqa.dev/ja/)（テスト練習用サイト） |
| **テスト種別**   | 機能テスト / VRT（Visual Regression Testing） / アクセシビリティテスト                 |
| **設計パターン** | Functional Page Object Model（関数型 POM）                                             |
| **CI/CD**        | GitHub Actions で自動テスト実行                                                        |

## テストケース

### 機能テスト

- **ログインテスト**: 正常ログイン・バリデーションエラーの検証
- **宿泊プラン一覧テスト**: 未ログイン / 一般会員 / プレミアム会員ごとのプラン表示検証
- **スモークテスト**: サイトの基本的な疎通確認

### Visual Regression Testing（VRT）

Playwright 標準の `toHaveScreenshot` を使用し、**トップページ / プラン一覧 / ログインページ** の見た目が変わっていないことを 3 ブラウザ × 3 ページ = **9 パターン** で検証します。

### アクセシビリティテスト

[axe-core](https://github.com/dequelabs/axe-core) を使用して、WCAG 基準への準拠を自動チェックします。

## アーキテクチャ

### Functional Page Object Model（関数型 POM）

Page Object をクラスではなく純粋関数として実装し、状態を持たない設計にしています。

```typescript
// pages/login.page.ts — ロケーターとアクションを純粋関数としてエクスポート
export const getEmailInput = (page: Page) =>
  page.getByRole("textbox", { name: "メールアドレス" });

export const loginWithCredentials = async (
  page: Page,
  email: string,
  password: string,
) => {
  await getEmailInput(page).fill(email);
  await getPasswordInput(page).fill(password);
  await getSubmitButton(page).click();
};
```

### ロケーター優先順位（Accessibility First）

ユーザーが実際に操作する方法に近いロケーターを使用しています。

1. `page.getByRole()` — 最優先（ユーザーが実際に操作する方法に近い）
2. `page.getByLabel()` — フォーム要素
3. `page.getByPlaceholder()` — 入力欄
4. `page.getByTestId()` — フォールバック

## クレデンシャル管理

テスト用の認証情報は [dotenvx](https://dotenvx.com/) で暗号化し、安全に管理しています。

```text
.env          ← 暗号化済み（Git にコミットされる）
.env.keys     ← 復号用の秘密鍵（.gitignore で除外）
.env.example  ← 環境変数の一覧（値なし、チームメンバー向け）
```

### 新規でクレデンシャルをセットアップする場合

```bash
# 1. .env.example をコピーして .env を作成
cp .env.example .env

# 2. .env に認証情報を記入
#    GENERAL_USER_EMAIL=xxx@example.com
#    GENERAL_USER_PASSWORD=xxx
#    PREMIUM_USER_EMAIL=xxx@example.com
#    PREMIUM_USER_PASSWORD=xxx

# 3. dotenvx で .env を暗号化（.env.keys が自動生成される）
pnpm exec dotenvx encrypt
```

> [!WARNING]
> `.env.keys` は **絶対に Git にコミットしないでください**（`.gitignore` で除外済み）。

### CI 環境（GitHub Actions）の場合

1. リポジトリの `Settings` → `Secrets and variables` → `Actions` を開く
2. `New repository secret` をクリック
3. **Name**: `DOTENV_PRIVATE_KEY` / **Secret**: `.env.keys` 内の秘密鍵の値
4. ワークフロー内で `dotenvx` が自動的に復号します

## 必要環境

| ツール | バージョン | インストール                                                     |
| ------ | ---------- | ---------------------------------------------------------------- |
| Git    | 任意       | [git-scm.com](https://git-scm.com/downloads)                     |
| Volta  | 任意       | `curl https://get.volta.sh \| bash`（[公式](https://volta.sh/)） |

> [!TIP]
> Volta をインストールすると、このプロジェクトに必要な **Node.js（v22.21.1）** と **pnpm（v10.28.2）** が初回実行時に自動でインストールされます。手動でバージョンを揃える必要はありません。

## セットアップ

```bash
# 1. リポジトリのクローン
git clone https://github.com/Bey9434/hotel-planisphere-playwright-ts.git
cd hotel-planisphere-playwright-ts

# 2. 依存関係のインストール（初回は Volta が Node.js と pnpm を自動取得します）
pnpm install

# 3. Playwright ブラウザのインストール
npx playwright install --with-deps
```

> [!IMPORTANT]
> `--with-deps` オプションにより、ブラウザに必要な OS レベルの依存関係も一緒にインストールされます。

> [!NOTE]
> ログインテスト・宿泊プランテストを実行するには、`.env.keys`（復号用の秘密鍵）が必要です。リポジトリ管理者から受け取り、プロジェクトルートに配置してください。
> `.env.keys` がなくても、スモークテスト・VRT・アクセシビリティテストは実行できます。

## テストの実行

```bash
# 全ブラウザ（Chromium / Firefox / Webkit）で E2E テストを実行
pnpm test

# UI モードで実行（デバッグに便利）
pnpm run test:ui
```

テスト結果は `playwright-report/` に HTML レポートとして出力されます。

```bash
# レポートをブラウザで確認
pnpm exec playwright show-report
```

## lint & format

```bash
# ESLint 実行
pnpm lint

# ESLint 自動修正
pnpm lint:fix

# Prettier でフォーマット
pnpm format
```

コミット時に **Husky + lint-staged** が自動実行され、`*.ts` / `*.mts` ファイルに ESLint、全ファイルに Prettier が適用されます。

## CI/CD

GitHub Actions により、`main` / `master` ブランチへの Push および Pull Request 時に高度に最適化されたテスト自動化パイプラインが実行されます。

- **マトリックス実行と並列化**: Chromium / Firefox / Webkit のテストを GitHub Actions の Matrix Strategy で並列（パラレル）に実行し、CI の実行時間を大幅に短縮しています。
- **レポートのマージとデプロイ**: 各ブラウザごとの `blob` レポートを 1 つの HTML レポートに自動マージ（`merge-reports`）し、`main` ブランチへのマージ完了時は自動的に GitHub Pages へテストレポートがデプロイ・公開されます。
- **環境変数（クレデンシャル管理）**: `dotenvx` と GitHub Secrets を連携させ、セキュアにテスト用のアカウント情報を復号してテストを実行します。
- **定期的な依存関係のアップデート**: Dependabot の `multi-ecosystem-groups` を導入し、Playwright の npm パッケージ（`@playwright/test`）と GitHub Actions のコンテナイメージ（Playwright 公式 Docker）のアップデートを必ず 1 つの Pull Request にまとめます。これにより、npm パッケージと Docker イメージのバージョン不一致による CI 環境の依存関係エラーを防止しています。
