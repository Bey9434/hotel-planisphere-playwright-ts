# Hotel Planisphere E2E テスト

## 言語

すべての回答・コメント・コミットメッセージは**日本語**で行ってください。

## 概要

- **対象サイト**: https://hotel-example-site.takeyaqa.dev/ja/
- **テストフレームワーク**: Playwright (`@playwright/test`)
- **言語**: TypeScript (strict mode)
- **パッケージマネージャー**: pnpm
- **環境変数管理**: dotenvx（`.env` は暗号化してコミット済み、`.env.keys` は `.gitignore` で除外）
- **CI/CD**: GitHub Actions（matrix: Chromium / Firefox / WebKit）
- **コード品質**: ESLint + Prettier + Husky (lint-staged)

## コマンド

- `pnpm test` — E2E テスト実行（dotenvx 経由で `.env` を復号）
- `pnpm test:ui` — Playwright UI モードで実行
- `pnpm lint` / `pnpm lint:fix` — ESLint チェック / 自動修正
- `pnpm format` / `pnpm format:check` — Prettier フォーマット / チェック
- `pnpm exec playwright test --repeat-each=3` — テスト安定性確認
- `pnpm exec playwright test --project=chromium` — 単一ブラウザ実行

## ディレクトリ

- `pages/` — Functional POM（クラス不使用、関数エクスポート、`Readonly<Page>` パラメータ）
- `tests/` — テストシナリオ (`*.spec.ts`)
- `config/` — 環境設定・テストデータ（`process.env` 経由）
- `.agent/` — Antigravity IDE 用エージェント設定（**原則変更禁止だが、追加、修正に限り許可**）

## 絶対禁止

- `.env.keys` の内容を出力・ログ・コミットしない
- `.spec.ts` 内に `page.locator()` を直接書かない（Page Object 経由）
- `waitForTimeout` 禁止（Web-First Assertions を使用）
- `any` 型禁止
- XPath、CSS クラスセレクター禁止
- テスト名は振る舞いを日本語で記述すること

## エージェント行動指針

- 提案時は 3 案提示し、メリット・デメリットを明示（例外: バグ修正、フォーマット指定の生成タスク）
- 公式ドキュメントの URL・根拠を必ず提示
- 思考過程を明示
- 質問や相談に対して先走って実装しない（調査・提案にとどめる）
- 明示的に実装を指示された場合は完了まで自動実行する
