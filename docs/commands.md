# コマンドリファレンス

## テスト

```bash
# 全テスト実行
pnpm test

# 特定のファイルだけ実行
pnpm test tests/plans.spec.ts

# 特定のテスト名で絞り込み（部分一致）
pnpm test -g "ページタイトル"

# ブラウザを表示して実行
pnpm test --headed

# UI モードで実行（デバッグに便利）
pnpm test --ui

# レポートを表示
npx playwright show-report
```

## リント & フォーマット

```bash
# ESLint チェック
pnpm lint

# ESLint 自動修正
pnpm lint:fix

# Prettier フォーマット
pnpm format
```
