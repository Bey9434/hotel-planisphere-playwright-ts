---
trigger: always_on
glob:
description: コードレビュー時のチェック基準
---

# コードレビュー基準

コードを変更・レビューする際は、以下の基準で検査する。

## セキュリティ (CRITICAL)

- ハードコードされたシークレット（パスワード、APIキー、トークン）がないか
- `.env` の値がログやコンソールに出力されていないか
- `.env.keys` が参照・コミット対象になっていないか

## コード品質 (HIGH)

- 関数が 50 行を超えていないか
- ファイルが 800 行を超えていないか
- ネストの深さが 4 レベルを超えていないか
- エラーハンドリングが適切に実装されているか
- `console.log` がデバッグ用に残っていないか
- `any` 型が使われていないか（TypeScript strict mode 違反）

## Playwright 固有 (HIGH)

- ロケーター優先順位を守っているか（`getByRole` > `getByLabel` > `getByPlaceholder` > `getByTestId` > `getByText`）
- `.spec.ts` 内に `page.locator()` を直接書いていないか（Page Object 経由必須）
- `waitForTimeout` を使っていないか（Web-First Assertions を使うこと）
- Functional POM パターンに準拠しているか（クラスではなく関数）
- XPath・CSS クラスセレクターを使っていないか

## ベストプラクティス (MEDIUM)

- Mutation パターン（既存オブジェクト/配列の直接変更）を避けているか
- テストが欠如していないか
- AAA パターン（Arrange / Act / Assert）に従っているか
- テスト名が日本語で振る舞いを記述しているか

## 重要度の定義

| 重要度   | 説明                       | コミットへの影響   |
| -------- | -------------------------- | ------------------ |
| CRITICAL | セキュリティ上の問題       | ブロック           |
| HIGH     | 品質・安全性に直結する問題 | ブロック           |
| MEDIUM   | ベストプラクティス違反     | 警告（コミット可） |
| LOW      | スタイル・改善提案         | 任意               |
