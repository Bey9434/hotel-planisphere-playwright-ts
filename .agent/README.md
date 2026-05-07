# Agent Configuration Directory

このディレクトリには、Antigravity AIエージェントの動作を制御するルール、スキル、ワークフローが含まれています。

## Directory Structure

```text
.agent/
├── README.md               # このファイル
├── rules/                  # エージェントが常に従うべきルール
│   ├── agent-behavior.md  # エージェントの提案・コミュニケーションルール
│   ├── coding.md          # TypeScript/JavaScript一般コーディング規約
│   ├── e2e-runner.md      # Playwright E2Eテスト戦略
│   ├── glossary.md        # 用語解説の品質基準
│   ├── review.md          # コードレビュー基準
│   └── security.md        # セキュリティガイドライン
├── skills/                 # 特定のワークフローを実行するスキル
│   └── glossary/
│       └── SKILL.md       # 技術用語解説生成スキル
└── workflows/             # 手順書（ユーザー実行またはエージェント参照）
    ├── add-glossary.md    # 用語追加ワークフロー
    ├── code-review.md     # コードレビューワークフロー
    ├── e2e-runner.md      # E2Eテスト作成・実行ワークフロー
    └── plan.md            # 実装計画ワークフロー
```

## Rules (ルール)

エージェントが**常に従う**べき基準とガイドライン。

### agent-behavior.md

- **目的**: エージェントの提案・コミュニケーションの品質基準
- **適用範囲**: すべてのエージェント応答
- **主な内容**: 3案提示、根拠URL必須、思考過程の明示

### coding.md

- **目的**: TypeScript/JavaScriptの汎用コーディング規約
- **適用範囲**: すべてのTypeScript/JavaScriptコード
- **主な内容**: FP原則、型安全性、命名規則、ファイル/関数サイズ制約、コード品質チェックリスト

### e2e-runner.md

- **目的**: Playwright E2Eテストの実装・保守戦略
- **適用範囲**: E2Eテストコード (`tests/*.spec.ts`, `pages/*.ts`)
- **主な内容**: Agent Browser CLI、Functional POM設計、ロケーター優先順位、AAAパターン、テスト命名規則

### glossary.md

- **目的**: 技術用語解説の品質基準
- **適用範囲**: `docs/glossary.md` の生成時
- **主な内容**: 解説の深さ、情報源優先順位、フォーマット規則

### review.md

- **目的**: コードレビュー時のチェック基準
- **適用範囲**: すべてのコード変更
- **主な内容**: セキュリティ、品質、Playwright固有、ベストプラクティスの4カテゴリチェックリスト

### security.md

- **目的**: シークレット管理とセキュリティインシデント対応
- **適用範囲**: すべてのコード変更・コミット前
- **主な内容**: `.env` 運用ルール、コミット前チェックリスト、インシデント対応手順

## Skills (スキル)

特定のワークフローを実行するための専門知識。

### glossary

- **トリガー**: ユーザーが「〇〇について教えて」「〇〇を用語集に追加して」と質問
- **機能**: 公式ドキュメント検索 → 技術面接レベルの解説生成 → `docs/glossary.md` に追記
- **連携**: `rules/glossary.md` の品質基準に従う

## Workflows (ワークフロー)

具体的な手順書。スラッシュコマンドで起動する。

### /add-glossary

- **目的**: 新しい技術用語を用語集に追加する手順

### /code-review

- **目的**: ローカル変更または GitHub PR に対するコードレビュー
- **モード**: ローカルレビューモード / PR レビューモード

### /e2e-runner

- **目的**: Playwright E2E テストの作成・実行・デバッグ手順
- **フェーズ**: 計画 → POM確認 → 実装 → 実行 → デバッグ

### /plan

- **目的**: コードを書く前に構造化された実装計画を作成
- **特徴**: ユーザー承認を得るまでコードに触れない

## Rules と Skills の違い

| 項目     | Rules                          | Skills                               |
| -------- | ------------------------------ | ------------------------------------ |
| **役割** | 常に従うべき基準・ガイドライン | 特定のワークフローを実行する専門知識 |
| **適用** | すべてのタスクに自動適用       | トリガー条件が満たされた時のみ       |
| **例**   | コーディング規約、レビュー基準 | 用語解説生成、テストケース設計       |

## Antigravity Best Practices

このプロジェクトでは、以下のAntigravityベストプラクティスを適用しています：

1. **モジュール性**: 1つのルール/スキルに1つの責任
2. **明確な責任分担**: `coding.md` (汎用) と `e2e-runner.md` (Playwright特化) の分離
3. **Artifacts優先**: `task.md`, `implementation_plan.md` で進捗を可視化
4. **観察可能性**: このREADMEでエージェントの構成を明確化

## 追加・変更時のガイドライン

### 新しいRuleを追加する場合

1. 既存のRuleと重複していないか確認
2. このREADMEを更新

### 新しいSkillを追加する場合

1. `skills/{skill-name}/SKILL.md` を作成
2. Frontmatterに明確な `name` と `description` (WHEN/WHEN NOT パターン) を記載
3. 対応する `workflows/{skill-name}.md` を作成（必要に応じて）
4. このREADMEを更新

### 新しいWorkflowを追加する場合

1. `workflows/{workflow-name}.md` を作成
2. Frontmatterに `description` を記載
3. Phase ごとの手順を明確に記述
4. このREADMEを更新
