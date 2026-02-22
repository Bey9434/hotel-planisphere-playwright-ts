# ポートフォリオプロジェクト - タスクリスト

## 概要

Playwright + TypeScript を使用した E2E テストプロジェクト

**プロジェクトパス**: `/home/bey9434/hotel-planisphere-playwright-ts/`（WSL2 Ubuntu）

---

## 現在のステータス: Step 1 実行中

---

## 既存プロジェクトの状態

- [x] `package.json` 作成済み
- [x] `playwright.config.ts` 作成済み
- [x] `.agent/rules/e2e-runnner.md` 作成済み
- [x] `node_modules` インストール済み
- [x] `tests/` 作成済み（smoke.spec.tsあり）
- [ ] `pages/` 空

---

## Step 0: 用語解説エージェント + 最初のテスト

- [x] 実装計画書の更新
- [x] `docs/glossary.md` の作成
- [x] `.agent/skills/glossary/SKILL.md` の作成
- [x] `.agent/workflows/add-glossary.md` の作成
- [x] `.agent/rules/coding.md` の更新
- [x] `playwright.config.ts` の更新（baseURL追加）
- [x] `tests/smoke.spec.ts` の作成
- [x] テスト実行・動作確認

## Step 1: TypeScript + ESLint + Prettier + クレデンシャル暗号化

- [/] `tsconfig.json` の作成
- [ ] `eslint.config.mts` の作成
- [ ] `prettier.config.ts` の作成
- [ ] `config/.env.example` の作成
- [ ] クレデンシャル暗号化設定

## Step 2: Page Object Model + テストケース設計書

- [ ] `pages/home.page.ts` の作成
- [ ] `pages/login.page.ts` の作成
- [ ] `pages/locators.ts` の作成
- [ ] `tests/testCase.md` の作成

## Step 3: VRT + アクセシビリティテスト

- [ ] `tests/vrt.spec.ts` の作成
- [ ] `tests/accessibility.spec.ts` の作成
- [ ] ベースラインスナップショット生成

## Step 4: AI 駆動開発環境の完成

- [ ] `.agent/rules/rules.md` の作成
- [ ] `.agent/rules/git.md` の作成
- [ ] `.agent/rules/review.md` の更新
- [ ] `.agent/skills/e2e-testing/SKILL.md` の作成

## Step 5: CI/CD + Husky + lint-staged

- [ ] `.github/workflows/e2e.yml` の作成
- [ ] `.github/workflows/lint-and-format.yml` の作成
- [ ] `.husky/` の設定
- [ ] `package.json` scripts 更新
