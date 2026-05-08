---
description: E2E テスト実装・実行ワークフロー
---

# E2E テスト実行ワークフロー

E2E テストの実装・実行・デバッグは `.claude/skills/e2e-runner/SKILL.md` に定義されたスキルを使用する。

## 起動方法

```
/e2e-runner [テスト対象の説明]
```

## 主なフェーズ

1. **計画** — 対象フロー、ツール選択、リスク分類を明示する
2. **実装** — Functional POM パターンで `pages/` と `tests/` を作成する
3. **実行** — 3〜5 回実行してフレーキーでないことを確認する
4. **デバッグ** — 失敗時はエラーログ・スクリーンショット・トレースを確認してから修正する

## 関連ファイル

- スキル定義: `.claude/skills/e2e-runner/SKILL.md`
- コーディング規約: `.agent/rules/coding.md`
- テストルール: `.claude/rules/playwright-paths.md`
