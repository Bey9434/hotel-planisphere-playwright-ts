# Hotel Planisphere - Playwright E2E テスト

[HOTEL PLANISPHERE（テスト自動化練習サイト）](https://hotel-example-site.takeyaqa.dev/ja/) に対する E2E テストプロジェクトです。

## 必要環境

| ツール  | バージョン | 備考                                  |
| ------- | ---------- | ------------------------------------- |
| Node.js | 22.21.1    | [Volta](https://volta.sh/) で自動管理 |
| pnpm    | 10.28.2    | Volta で自動管理                      |

> [!TIP]
> [Volta](https://volta.sh/) を導入すると、`package.json` の `volta` フィールドに基づいて Node.js と pnpm のバージョンが自動で切り替わります。

## セットアップ

```bash
# 1. リポジトリのクローン
git clone https://github.com/Bey9434/hotel-planisphere-playwright-ts.git
cd hotel-planisphere-playwright-ts

# 2. 作業ブランチに切り替え
git checkout feat/e2etest/pom

# 3. 依存関係のインストール
pnpm install

# 4. Playwright ブラウザのインストール
npx playwright install --with-deps
```

> [!IMPORTANT]
> `--with-deps` オプションにより、ブラウザに必要な OS レベルの依存関係も一緒にインストールされます。

## テストの実行

```bash
# chromium のみで実行（推奨・高速）
pnpm test

# 全ブラウザ（chromium / firefox / webkit）で実行
pnpm test:all

# UI モードで実行（デバッグに便利）
npx playwright test --ui
```

## リント & フォーマット

```bash
# ESLint 実行
pnpm lint

# ESLint 自動修正
pnpm lint:fix

# Prettier でフォーマット
pnpm format
```

コミット時に **Husky + lint-staged** が自動実行され、`*.ts` / `*.mts` ファイルに ESLint、全ファイルに Prettier が適用されます。

## ディレクトリ構成

```text
├── pages/          # Page Object Models（関数型スタイル）
├── tests/          # テストシナリオ（*.spec.ts）
├── config/         # 環境設定・テストデータ
├── docs/           # ドキュメント
├── .agent/         # AI 開発ツール設定
├── playwright.config.ts
├── eslint.config.mts
└── tsconfig.json
```

## 技術スタック

- **テストフレームワーク**: [Playwright](https://playwright.dev/) v1.58+
- **言語**: TypeScript（strict モード）
- **リンター**: ESLint v9（flat config）
  - `typescript-eslint` - 型チェック付き推奨ルール
  - `eslint-plugin-playwright` - Playwright ベストプラクティス
  - `eslint-plugin-functional` - 関数型プログラミング規約
  - `eslint-plugin-boundaries` - アーキテクチャ境界の強制
- **フォーマッター**: Prettier
- **Git Hooks**: Husky + lint-staged
