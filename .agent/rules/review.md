---
trigger: always_on
description: コードレビュー時に適用すべきチェック基準。AIのセルフレビューにも使用。
---

# コードレビュー基準

コードを提案・レビューする際は、以下の基準に照らしてチェックすること。

## セキュリティ (CRITICAL)

- [ ] ハードコードされた秘密情報（API キー、パスワード、トークン）がないか
- [ ] ユーザー入力のバリデーションが実装されているか
- [ ] エラーメッセージに機密情報が含まれていないか
- [ ] `.env.keys` や復号済みシークレットがログ・コンソールに出力されていないか

## コード品質 (HIGH)

- [ ] 関数が 50 行を超えていないか
- [ ] ファイルが 800 行を超えていないか
- [ ] ネスト深度が 4 レベルを超えていないか
- [ ] エラーハンドリングが明示的に実装されているか
- [ ] `console.log` が残っていないか
- [ ] マジックナンバーが定数化されているか
- [ ] `any` 型を使用していないか
- [ ] インポート順序が正しいか（型 → 外部 → 内部）

## Playwright E2E 固有 (HIGH)

以下は `tests/` および `pages/` ディレクトリのファイルに適用:

- [ ] ロケーター優先順位に従っているか（`getByRole` > `getByLabel` > `getByPlaceholder` > `getByTestId` > `getByText`）
- [ ] Functional POM パターンに準拠しているか（クラスではなく関数、`Readonly<Page>` パラメータ）
- [ ] `.spec.ts` 内に `page.locator(...)` を直接書いていないか
- [ ] 固定待機（`waitForTimeout`）を使っていないか
- [ ] Web-First Assertions（`toBeVisible`, `toHaveText` 等）を使っているか
- [ ] テスト名が振る舞いを日本語で説明しているか
- [ ] AAA パターン（Arrange-Act-Assert）に従っているか
- [ ] ID セレクター使用時に eslint-disable + 理由コメントがあるか

## ベストプラクティス (MEDIUM)

- [ ] Mutation パターンを使っていないか（Immutable か）
- [ ] 新機能に対してテストが追加されているか
- [ ] コメントは「Why」を説明しているか（「What」ではない）
- [ ] 命名規則（camelCase / PascalCase / CONSTANT_CASE）に従っているか
- [ ] 定数が `locator.ts` や `paths.ts` に一元管理されているか

## Related Rules

- コードサイズ制約の詳細は `coding.md` を参照
- ロケーター選定とテスト戦略の詳細は `e2e-runner.md` を参照
- セキュリティルールの詳細は `security.md` を参照
