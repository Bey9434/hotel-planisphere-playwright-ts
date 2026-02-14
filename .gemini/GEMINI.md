# Gemini Configuration (プロジェクト固有)

## テスト戦略

### TDD (テスト駆動開発)

以下のサイクルに従ってください：

1. **Red**: 失敗するテストを先に書く
2. **Green**: テストを通す最小限のコードを書く
3. **Refactor**: コードを改善する（テストが通ることを確認しながら）

### Playwright E2E テスト

- **Page Object Model (POM)**: 関数型スタイルで実装する（クラスではなく関数）
- **ロケーター優先順位**: `getByRole` > `getByLabel` > `getByPlaceholder` > `getByTestId`
- **固定待機禁止**: `waitForTimeout` は使わない
- **Web-First Assertions**: `await expect(locator).toBeVisible()` を使用する
- **XPath / CSS Class セレクターは使用禁止**

### テスト原則

- 各テストは **独立** させる（他のテストに依存しない）
- テスト名は **何をテストしているか明確** にする
- **Arrange-Act-Assert** パターンに従う
- `test.describe` で関連テストをグルーピングする

## ディレクトリ構造

- `pages/`: Page Object Models（関数型スタイル）
- `tests/`: テストシナリオ（`*.spec.ts`）
- `config/`: 環境設定・テストデータ
- `docs/`: ドキュメント
