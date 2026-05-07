---
paths:
  - "tests/**/*.ts"
  - "pages/**/*.ts"
---

# Playwright ファイル編集時の追加ルール

- ロケーター優先順位: `getByRole` > `getByLabel` > `getByPlaceholder` > `getByTestId` > `getByText`
- SUT の HTML 不備で semantic locator が使えない場合、`eslint-disable-next-line` コメント付きで ID セレクターを許可
- AAA パターン（Arrange / Act / Assert）をコメントで明示
- テスト名は振る舞いを日本語で記述
- `.spec.ts` 内に `page.locator(...)` を直接書かない（Page Object 経由）
- `waitForTimeout` 禁止（Web-First Assertions を使用）
- Page Object は関数エクスポート、パラメータは `Readonly<Page>`
