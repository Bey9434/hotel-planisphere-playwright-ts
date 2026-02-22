# 実装計画書: Playwright E2E テスト ポートフォリオプロジェクト

## 概要

ジュニアQAエンジニアの転職ポートフォリオとして、**Playwright + TypeScript** を使用した E2E テストプロジェクトを構築します。

**プロジェクトパス**: `/home/bey9434/hotel-planisphere-playwright-ts/`（WSL2 Ubuntu）

---

## プロジェクトの進捗状況

### ✅ 完了済み（Step 0 まで）

| 項目                      | 状態                            |
| ------------------------- | ------------------------------- |
| `package.json`            | ✅ Node v22.21.1 指定 (Volta)   |
| `playwright.config.ts`    | ✅ baseURL 設定済み             |
| `tests/smoke.spec.ts`     | ✅ 最初のテスト作成・確認済み   |
| `docs/glossary.md`        | ✅ 用語集作成・デモ用語追加済み |
| `.agent/skills/glossary/` | ✅ 用語解説エージェント稼働中   |
| `.agent/rules/coding.md`  | ✅ コーディング規約策定済み     |

### 🚧 現在の作業: Step 1 (環境構築)

TypeScript, ESLint, Prettier の導入と、クレデンシャル暗号化セットアップを行います。

| 項目        | ファイル                                |
| ----------- | --------------------------------------- |
| TS 設定     | `tsconfig.json`                         |
| Lint 設定   | `eslint.config.mts`                     |
| Format 設定 | `prettier.config.ts`, `.prettierignore` |
| 環境変数    | `.env.example`, `.env.local.vault`      |

---

## 今後の実装ステップ

### Step 2: Page Object Model + テストケース設計書

**作成するファイル**:

```
├── pages/
│   ├── home.page.ts              # [NEW]
│   ├── login.page.ts             # [NEW]
│   ├── signup.page.ts            # [NEW]
│   └── locators.ts               # [NEW]
├── tests/
│   ├── login.spec.ts             # [NEW]
│   ├── signup.spec.ts            # [NEW]
│   └── testCase.md               # [NEW] テストケース設計書
```

---

### Step 3: VRT + アクセシビリティテスト

**作成するファイル**:

```
├── tests/
│   ├── vrt.spec.ts               # [NEW]
│   └── accessibility.spec.ts     # [NEW]
└── snapshots/                    # [NEW] VRT ベースライン
```

---

### Step 4: AI 駆動開発環境の完成

**作成/更新するファイル**:

```
├── .agent/
│   ├── rules/
│   │   ├── rules.md              # [NEW] 基本ルール
│   │   ├── git.md                # [NEW] Git 規約
│   │   └── review.md             # [UPDATE] マルチエージェント用
│   └── skills/
│       └── e2e-testing/
│           └── SKILL.md          # [NEW]
```

---

### Step 5: CI/CD + Husky + lint-staged

**作成するファイル**:

```
├── .github/
│   └── workflows/
│       ├── e2e.yml               # [NEW]
│       └── lint-and-format.yml   # [NEW]
├── .husky/                       # [NEW]
└── package.json                  # [UPDATE] scripts, lint-staged 追加
```

---

## 確定した追加要件メモ

| 要件             | 対応 Step | 備考                     |
| ---------------- | --------- | ------------------------ |
| **WSL2 対応**    | Step 0    | ✅ 完了 (Node v22.21.1)  |
| **用語自動収集** | Step 0    | ✅ 完了 (Glossary Agent) |
| アクセシビリティ | Step 3    | `@axe-core/playwright`   |
| テスト設計書     | Step 2    | 境界値分析、同値分割     |
| クレデンシャル   | Step 1    | `dotenv-vault`           |
| VRT              | Step 3    | Playwright 標準機能      |
