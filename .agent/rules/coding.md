---
trigger: always_on
description: 汎用的なTypeScript/JavaScript コーディング規約。FP原則、型安全性、コード品質基準。
---

# TypeScript/JavaScript Coding Standards

## Role

世界最高峰の **Software Engineer** として、保守性が高く、可読性に優れた TypeScript コードを実装してください。

## Principles (Functional Approach)

このプロジェクトでは、**関数型プログラミング (FP)** の要素を取り入れ、副作用を最小限に抑えます。

- **Immutable**: 可能な限り `const` を使用し、既存のオブジェクト/配列の変更（Mutation）を避ける
- **Declarative**: `for` / `while` ループよりも `map`, `filter`, `reduce`, `forEach` を優先
- **Pure Functions**: 副作用のない純粋関数を優先し、テスタビリティを向上させる
- **`as const` アサーション**: 定数オブジェクトには `as const` を使用し、リテラル型を保持する
- **`Readonly<T>`**: 外部から受け取るオブジェクトには `Readonly<T>` を適用し、不変性を明示する

## TypeScript Best Practices

### 型安全性

- **`any` 型の使用禁止**: 適切な型定義を行う
- **型推論の活用**: 可能な限り型推論を利用し、冗長な型注釈を避ける
- **Union Types**: 複数の可能性がある場合は Union Types を使用

### インポート順序

以下の順序でインポートを整理する:

1. **型インポート**: `import type { ... } from "..."` （常に最上部）
2. **外部ライブラリ**: `import { test, expect } from "@playwright/test"`
3. **内部モジュール**: `import { PATHS } from "../pages/paths"`

```typescript
import type { Locator, Page } from "@playwright/test";
import { test, expect } from "@playwright/test";
import { getHeading, navigateToLogin } from "../pages/login.page";
import { TITLES } from "../pages/locator";
```

### Naming Conventions ([Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html#naming-style))

- **変数・関数・パラメータ**: camelCase (例: `getUserData`, `loginButton`)
- **クラス・型・インターフェース**: PascalCase (例: `UserProfile`, `LoginCredentials`)
- **Enum**: PascalCase、メンバーは CONSTANT_CASE (例: `UserRole.PREMIUM_MEMBER`)
- **モジュールレベル定数**: CONSTANT_CASE (例: `LOGIN_PAGE_PATH`, `MAX_RETRY_COUNT`)
- **ファイル名**: 小文字 + ハイフン区切り (例: `login.page.ts`, `error-messages.ts`)

## Code Quality

### エラーハンドリング

- 明示的なエラーハンドリングを実装する
- エラーは適切にログに記録する

### コメント

- **Why, not What**: コードの「何をしているか」ではなく「なぜそうしているか」を説明する
- 日本語でのコメントを推奨

## コードサイズ制約

- **ファイル**: 200〜400 行が標準、800 行を上限とする
- **関数**: 50 行未満に保つ。超える場合は責務ごとに分割を検討
- **ネスト**: 4 レベル以上のネストは禁止。Early Return（ガード節）で平坦化する

## コードスメル（避けるべきパターン）

- **マジックナンバー**: 意味のある閾値・遅延・制限値には名前付き定数を使用する
- **深いネスト**: Early Return やガード節でネストを浅く保つ
- **巨大関数**: 責務ごとに関数を分割する

## 入力バリデーション

システム境界（`.env` 読み込み、外部 API 応答等）では必ずバリデーションを行う:

- 必要な環境変数が存在するか起動時に検証する
- 外部データを信頼せず、型・形式を検証してから使用する
- バリデーション失敗時は明確なエラーメッセージで即座に失敗させる

## コード品質チェックリスト

作業完了前に確認:

- [ ] 関数は 50 行未満か
- [ ] ファイルは 800 行未満か
- [ ] ネストは 4 レベル以内か
- [ ] エラーハンドリングは明示的か
- [ ] マジックナンバーはないか（定数化済みか）
- [ ] Mutation パターンは使っていないか（Immutable か）
- [ ] コメントは「Why」を説明しているか
- [ ] インポート順序は正しいか（型 → 外部 → 内部）

## Related Rules

- E2E テスト/Playwright に関する具体的な実装は `e2e-runner.md` を参照
