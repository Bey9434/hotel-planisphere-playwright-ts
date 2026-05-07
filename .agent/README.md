# Agent Configuration Directory

このディレクトリには、Antigravity AIエージェントの動作を制御するルール、スキル、ワークフローが含まれています。

## Directory Structure

```text
.agent/
├── README.md               # このファイル
├── rules/                  # エージェントが常に従うべきルール
│   ├── coding.md          # TypeScript/JavaScript一般コーディング規約
│   ├── e2e-runner.md     # Playwright E2Eテスト戦略
│   ├── glossary.md        # 用語解説の品質基準
│   └── review.md          # コードレビュー基準（予定）
├── skills/                 # 特定のワークフローを実行するスキル
│   └── glossary/
│       └── SKILL.md       # 技術用語解説生成スキル
└── workflows/             # 手順書（ユーザー実行またはエージェント参照）
    ├── add-glossary.md    # 用語追加ワークフロー
    └── e2e-runner.md     # E2Eテスト実行手順（予定）
```

## Rules (ルール)

エージェントが**常に従う**べき基準とガイドライン。

### coding.md

- **目的**: TypeScript/JavaScriptの汎用コーディング規約
- **適用範囲**: すべてのTypeScript/JavaScriptコード
- **主な内容**: FP原則、型安全性、命名規則、エラーハンドリング

### e2e-runner.md

- **目的**: Playwright E2Eテストの実装・保守戦略
- **適用範囲**: E2Eテストコード (`tests/*.spec.ts`, `pages/*.ts`)
- **主な内容**: Agent Browser CLI、POM設計、ロケーター優先順位、テストワークフロー

### glossary.md

- **目的**: 技術用語解説の品質基準
- **適用範囲**: `docs/glossary.md` の生成時
- **主な内容**: 解説の深さ、情報源優先順位、フォーマット規則

## Skills (スキル)

特定のワークフローを実行するための専門知識。

### glossary

- **トリガー**: ユーザーが「〇〇について教えて」「〇〇を用語集に追加して」と質問
- **機能**: 公式ドキュメント検索 → 技術面接レベルの解説生成 → `docs/glossary.md` に追記
- **連携**: `rules/glossary.md` の品質基準に従う

## Workflows (ワークフロー)

具体的な手順書。

### add-glossary.md

- **目的**: 新しい技術用語を用語集に追加する手順
- **利用方法**: `/add-glossary` コマンドまたは手動実行

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
2. Frontmatterに `trigger` と `description` を記載
3. このREADMEを更新

### 新しいSkillを追加する場合

1. `skills/{skill-name}/SKILL.md` を作成
2. Frontmatterに明確な `name` と `description` (WHEN/WHEN NOT パターン) を記載
3. 対応する `workflows/{skill-name}.md` を作成（必要に応じて）
4. このREADMEを更新
