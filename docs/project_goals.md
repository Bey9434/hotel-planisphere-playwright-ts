# プロジェクト目標書: Playwright E2E テスト ポートフォリオ

## 1. プロジェクトの背景と目的

### 1.1 なぜこのプロジェクトを作るのか

私は **ジュニアQAエンジニア** として転職活動を行っています。
このプロジェクトは、以下の目的を達成するための **ポートフォリオ作品** です。

1. **技術力の証明**: Playwright + TypeScript を使ったE2Eテスト実装能力を示す
2. **論理的思考力の証明**: 「なぜその技術を選んだのか」を説明できる状態を作る
3. **AI活用スキルの証明**: Antigravity (AI駆動開発) を活用した効率的な開発プロセスを体験・習得する

### 1.2 最終的に達成したい状態

- **技術面接で自信を持って回答できる**
  - 「なぜ Selenium ではなく Playwright なのか？」
  - 「Page Object Model を使う理由は？」
  - 「テストの安定性をどう担保しているか？」
- **実際に動くテストスイートを見せられる**
  - GitHub リポジトリとして公開
  - CI/CD で自動実行されるテスト
  - テストレポートの可視化

---

## 2. 技術的な目標

### 2.1 使用技術スタック

| カテゴリ             | 技術               | 選定理由                                                             |
| -------------------- | ------------------ | -------------------------------------------------------------------- |
| テストフレームワーク | **Playwright**     | Auto-waiting による安定性、クロスブラウザ対応、TypeScript との親和性 |
| 言語                 | **TypeScript**     | 型安全性によるバグ防止、IDE サポートの充実                           |
| パッケージマネージャ | **pnpm**           | 高速、ディスク効率が良い                                             |
| Node バージョン管理  | **Volta**          | プロジェクト単位でのバージョン固定が容易                             |
| Linter               | **ESLint**         | コード品質の一貫性確保                                               |
| Formatter            | **Prettier**       | コードスタイルの自動統一                                             |
| CI/CD                | **GitHub Actions** | GitHub との統合が容易                                                |
| AI駆動開発           | **Antigravity**    | 効率的なコード生成、ドキュメント自動化                               |

### 2.2 開発環境

| 項目             | 詳細                                             |
| ---------------- | ------------------------------------------------ |
| OS               | Windows 11 + **WSL2 (Ubuntu)**                   |
| エディタ         | VS Code (Remote - WSL)                           |
| Node.js          | v22.21.1 (Volta で固定)                          |
| プロジェクトパス | `/home/bey9434/hotel-planisphere-playwright-ts/` |

### 2.3 テスト対象サイト

- **Hotel Planisphere** (テスト練習用サイト)
- URL: `https://hotel-example-site.takeyaqa.dev/ja/`

---

## 3. 学習目標（技術面接対策）

### 3.1 各技術について「Why」を説明できるようにする

私は単にコードを書くだけでなく、**「なぜその技術を選んだのか」を論理的に説明できる状態** を目指しています。

#### 例: Playwright を選んだ理由

- **Auto-waiting**: 明示的な待機処理が不要で、テストが安定する (Flaky test の削減)
- **クロスブラウザ**: Chromium, Firefox, WebKit を1つのAPIで操作可能
- **TypeScript ネイティブ**: 型定義が最初から提供されている
- **並列実行**: テスト実行が高速

#### 例: Page Object Model (POM) を使う理由

- **保守性**: UI変更時の修正箇所が1箇所に集約される
- **再利用性**: 同じ操作を複数のテストで使い回せる
- **可読性**: テストシナリオがビジネスロジックに集中できる

### 3.2 用語集の自動収集 (Glossary Agent)

開発中に出会った技術用語を、AIエージェントによって自動的に `docs/glossary.md` に蓄積します。
各用語について以下の情報を記録します：

1. **何をしているか** (What)
2. **なぜ必要か** (Why)
3. **公式ドキュメントへのリンク**
4. **類似技術との比較**
5. **面接で聞かれそうな質問と回答例**

---

## 4. 実装する機能

### 4.1 テスト機能

| 機能                                | 説明                              | 対応 Step |
| ----------------------------------- | --------------------------------- | --------- |
| **スモークテスト**                  | サイトが正常に表示されるか確認    | Step 0 ✅ |
| **ログインテスト**                  | 正常ログイン、異常ログインの検証  | Step 2    |
| **会員登録テスト**                  | 必須項目、バリデーションの検証    | Step 2    |
| **VRT (Visual Regression Testing)** | UI の見た目が変わっていないか検証 | Step 3    |
| **アクセシビリティテスト**          | WCAG 基準への準拠確認             | Step 3    |

### 4.2 テスト設計

| 設計手法               | 説明                                           |
| ---------------------- | ---------------------------------------------- |
| **境界値分析**         | 入力値の境界 (最小値、最大値、境界±1) をテスト |
| **同値分割**           | 入力値を有効/無効クラスに分けてテスト          |
| **テストケース設計書** | 上記の分析結果を `tests/testCase.md` に文書化  |

### 4.3 アーキテクチャ

| パターン                    | 説明                                              |
| --------------------------- | ------------------------------------------------- |
| **Page Object Model (POM)** | ロケーターとアクションを `pages/` に集約          |
| **ロケーター優先順位**      | `getByRole` > `getByLabel` > `getByTestId`        |
| **コーディング規約**        | 関数型プログラミング原則 (Immutable, Declarative) |

### 4.4 セキュリティ

| 機能                     | 説明                                              |
| ------------------------ | ------------------------------------------------- |
| **クレデンシャル暗号化** | `dotenv-vault` を使用してテスト用認証情報を暗号化 |
| **`.gitignore` 設定**    | 秘密情報が Git にコミットされないよう設定         |

### 4.5 CI/CD

| 機能                    | 説明                                               |
| ----------------------- | -------------------------------------------------- |
| **GitHub Actions**      | PR 時に自動でテスト実行                            |
| **Husky + lint-staged** | コミット前に Lint/Format を自動実行                |
| **テストレポート**      | Playwright HTML レポートを GitHub Pages にデプロイ |

---

## 5. AI駆動開発 (Antigravity)

### 5.1 活用するエージェント機能

| 機能               | 説明                                           |
| ------------------ | ---------------------------------------------- |
| **Glossary Agent** | 用語解説を自動生成し `docs/glossary.md` に追記 |
| **E2E Runner**     | Playwright テストの実装・デバッグを支援        |
| **コードレビュー** | コーディング規約への準拠をチェック             |

### 5.2 期待する効果

- **学習効率の向上**: 用語や概念をその場で解説してもらえる
- **コーディング効率の向上**: ボイラープレートコードの自動生成
- **ドキュメント自動化**: 用語集や設計書の自動更新

---

## 6. プロジェクトのロードマップ

| Step       | 内容                                                  | 状態        |
| ---------- | ----------------------------------------------------- | ----------- |
| **Step 0** | 用語解説エージェント + 最初のテスト                   | ✅ 完了     |
| **Step 1** | TypeScript + ESLint + Prettier + クレデンシャル暗号化 | 🚧 次に実施 |
| **Step 2** | Page Object Model + テストケース設計書                | 📋 計画済み |
| **Step 3** | VRT + アクセシビリティテスト                          | 📋 計画済み |
| **Step 4** | AI駆動開発環境の完成                                  | 📋 計画済み |
| **Step 5** | CI/CD + Husky + lint-staged                           | 📋 計画済み |

---

## 7. 成功の定義

このプロジェクトが「成功した」と言えるのは、以下の状態になったとき：

1. **ポートフォリオとして見せられる状態**
   - GitHub リポジトリが公開されている
   - README が充実しており、プロジェクトの概要が分かる
   - テストが CI で自動実行されている

2. **技術面接で説明できる状態**
   - 各技術の「Why」を自分の言葉で説明できる
   - `docs/glossary.md` を見れば用語を復習できる
   - コードを見せながら設計判断を説明できる

3. **自分自身のスキルアップ**
   - Playwright を使ったE2Eテストを自力で書ける
   - TypeScript の基本的な型定義ができる
   - AI駆動開発の効率性を体感し、今後も活用できる

---

## 8. AIエージェントへの指示（プロンプト設計）

### 8.1 エージェントルール (`.agent/rules/`)

プロジェクト内に配置された以下のファイルが、AIエージェントの動作を制御します。

#### `.agent/rules/e2e-runner.md`

```yaml
trigger: model_decision
description: PlaywrightのE2Eテスト実装・保守の専門家
```

**主な指示内容**:

- Agent Browser（セマンティックセレクタ）を優先使用
- フォールバックとして標準 Playwright を使用
- **Functional POM**（関数型スタイル）を推奨
- **ロケーター階層**: `getByRole` > `getByLabel` > `getByPlaceholder` > `getByTestId`
- **使用禁止**: XPath, CSS Class, `waitForTimeout`
- 常に日本語で回答

#### `.agent/rules/coding.md`

```yaml
trigger: model_decision
description: 新機能の実装、コードの修正、リファクタリング、テストコード作成時に参照
```

**主な指示内容**:

- **関数型プログラミング原則**:
  - `const` を使用（Immutable）
  - `for`/`while` ではなく `map`/`filter`/`reduce` を使用（Declarative）
  - Page Object は状態を持たない（Stateless）
- **Playwright Strategy**:
  - Web First Assertions を使用
  - Auto-waiting を活用
- **`any` 型の使用禁止**

### 8.2 エージェントスキル (`.agent/skills/`)

#### Glossary Agent (`.agent/skills/glossary/SKILL.md`)

**役割**: 技術用語を技術面接レベルで解説し、用語集に追記する

**出力フォーマット**:

1. **何をしているか** (What)
2. **なぜ必要か** (Why)
3. **公式ドキュメント**
4. **類似技術との比較**（テーブル形式）
5. **面接で聞かれそうな質問と回答例**
6. **備考**

**トリガー**: ユーザーが「〇〇について教えて」と依頼した時

### 8.3 ワークフロー (`.agent/workflows/`)

#### `add-glossary.md`

用語を追加する際の手順を定義:

1. 用語の特定
2. 解説生成（`search_web` で最新情報を参照）
3. `docs/glossary.md` に追記
4. ユーザーへの報告

---

## 9. 参考リポジトリ・リソース

### 9.1 メイン参考リポジトリ

| リポジトリ                  | 用途                           | URL                                                                                           |
| --------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------- |
| **playwrightPractice**      | CI/CD, プロジェクト構成の参考  | [nanishi2001/playwrightPractice](https://github.com/nanishi2001/playwrightPractice/tree/main) |
| **everything-claude-code/** | エージェントルール設計の参考   | https://github.com/affaan-m/everything-claude-code/tree/main                                  |
| AI実装フルコーディング      | AI駆動開発する際の効果的な方法 | https://zenn.dev/erukiti/articles/2512-full-ai-cofing                                         |

### 9.2 playwrightPractice から流用する要素

| 要素                | ファイル/フォルダ           | 備考                         |
| ------------------- | --------------------------- | ---------------------------- |
| GitHub Actions      | `.github/workflows/e2e.yml` | テスト自動実行、レポート生成 |
| Husky + lint-staged | `package.json`, `.husky/`   | コミット前チェック           |
| dotenv-vault        | `config/`                   | クレデンシャル暗号化         |
| ESLint 設定         | `eslint.config.mts`         | Flat Config 形式             |

### 9.3 公式ドキュメント

| 技術               | URL                                                                  |
| ------------------ | -------------------------------------------------------------------- |
| Playwright         | https://playwright.dev/                                              |
| TypeScript         | https://www.typescriptlang.org/docs/                                 |
| ESLint Flat Config | https://eslint.org/docs/latest/use/configure/configuration-files-new |
| Volta              | https://volta.sh/                                                    |
| pnpm               | https://pnpm.io/                                                     |
| GitHub Actions     | https://docs.github.com/en/actions                                   |
| axe-core (a11y)    | https://github.com/dequelabs/axe-core                                |

### 9.4 テスト対象サイト

| サイト名          | URL                                         | 用途            |
| ----------------- | ------------------------------------------- | --------------- |
| Hotel Planisphere | https://hotel-example-site.takeyaqa.dev/ja/ | E2Eテスト練習用 |

---

## 10. 備考

- このドキュメントは、Antigravity との会話を通じて整理されました。
- 詳細な実装計画は `implementation_plan.md` を参照してください。
- タスクの進捗は `task.md` で管理しています。
- エージェントルールは `.agent/rules/` 配下のファイルで管理しています。
