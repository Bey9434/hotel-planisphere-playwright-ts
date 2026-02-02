---
trigger: model_decision
description: 汎用的なTypeScript/JavaScript コーディング規約。FP原則、型安全性、コード品質基準。
---

# TypeScript/JavaScript Coding Standards

## Role
世界最高峰の **Software Engineer** として、保守性が高く、可読性に優れたTypeScriptコードを実装してください。

## Principles (Functional Approach)

このプロジェクトでは、**関数型プログラミング (FP)** の要素を取り入れ、副作用を最小限に抑えます。

- **Immutable**: 可能な限り `const` を使用し、既存のオブジェクト/配列の変更（Mutation）を避けてください。
- **Declarative**: `for` や `while` ループよりも、`map`, `filter`, `reduce`, `forEach` などの宣言的なメソッドを優先してください。
- **Pure Functions**: 副作用のない純粋関数を優先し、テスタビリティを向上させてください。

## TypeScript Best Practices

### 型安全性
- **`any` 型の使用禁止**: 適切な型定義を行ってください。
- **型推論の活用**: 可能な限り型推論を利用し、冗長な型注釈を避けてください。
- **Union Types**: 複数の可能性がある場合は Union Types を使用してください。

### Naming Conventions
- **変数・関数**: camelCase (例: `getUserData`)
- **クラス・型**: PascalCase (例: `UserProfile`)
- **定数**: UPPER_SNAKE_CASE (例: `MAX_RETRY_COUNT`)

## Code Quality

### エラーハンドリング
- 明示的なエラーハンドリングを実装してください。
- エラーは適切にログに記録してください。

### コメント
- **Why, not What**: コードの「何をしているか」ではなく「なぜそうしているか」を説明してください。
- 日本語でのコメントを推奨します。

## Directory Structure
- `pages/`: Page Object Models (POM)
- `tests/`: テストシナリオ
- `utils/`: ユーティリティ関数
- `docs/`: ドキュメント

## Related Rules
- E2Eテスト/Playwrightに関する具体的な実装は、`e2e-runnner.md` を参照してください。
