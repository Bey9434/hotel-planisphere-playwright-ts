---
name: code-review
description: ローカル未コミット変更または GitHub PR のコードレビュー。PR番号/URLを渡すとPRモード。
argument-hint: [PR番号]
allowed-tools: Read, Grep, Glob, Bash
model: inherit
---

# コードレビュー

引数: $ARGUMENTS

## 現在の変更状況

!`git diff --stat HEAD`

## モード選択

引数に PR 番号または PR URL が含まれる場合 → **PR レビューモード**
それ以外 → **ローカルレビューモード**

---

## ローカルレビューモード

未コミットの変更に対するセキュリティ・品質レビュー。

### Phase 1 — 収集

```bash
# staged の変更
git diff --cached --name-only

# unstaged の変更
git diff --name-only

# untracked ファイル
git ls-files --others --exclude-standard
```

変更ファイルがない場合は「レビュー対象なし」で終了。

### Phase 2 — レビュー

変更ファイルを全文読み込み、`.agent/rules/review.md` のチェック基準に従って検査する：

**セキュリティ (CRITICAL):**

- ハードコードされたシークレット
- `.env` の値がログやコンソールに出力されていないか

**コード品質 (HIGH):**

- 関数 > 50行
- ファイル > 800行
- ネスト深度 > 4レベル
- エラーハンドリングの欠如
- `console.log` の残存
- `any` 型の使用

**Playwright 固有 (HIGH):**

- ロケーター優先順位違反（`getByRole` > `getByLabel` > ...）
- `.spec.ts` 内の直接ロケーター使用
- `waitForTimeout` の使用
- Functional POM パターンの不準拠

**ベストプラクティス (MEDIUM):**

- Mutation パターンの使用
- テストの欠如
- AAA パターンの不遵守

### Phase 3 — レポート

検出事項をレポートとして出力：

- **重要度**: CRITICAL / HIGH / MEDIUM / LOW
- **ファイル位置と行番号**
- **問題の説明**
- **修正案**

CRITICAL または HIGH の問題がある場合はコミットをブロックする。

---

## PR レビューモード

GitHub PR に対する包括的なレビュー。

### Phase 1 — 取得

```bash
gh pr view $ARGUMENTS --json number,title,body,author,baseRefName,headRefName,changedFiles,additions,deletions
gh pr diff $ARGUMENTS
```

### Phase 2 — レビュー

変更ファイルを全文（差分だけでなく前後のコンテキストも含めて）読み込み、以下のカテゴリで検査する：

| カテゴリ         | チェック内容                                                  |
| ---------------- | ------------------------------------------------------------- |
| **正確性**       | ロジックエラー、オフバイワン、null ハンドリング、エッジケース |
| **型安全性**     | 型の不一致、`any` 使用、型推論の欠如                          |
| **パターン準拠** | プロジェクト規約（命名、ファイル構造、Functional POM）        |
| **セキュリティ** | シークレット露出、`.env` 管理                                 |
| **完全性**       | テスト不足、エラーハンドリング不足、ドキュメント不足          |
| **保守性**       | デッドコード、マジックナンバー、深いネスト、不明瞭な命名      |

### Phase 3 — バリデーション

```bash
npx tsc --noEmit
pnpm lint
pnpm test
```

### Phase 4 — 判定

| 条件                                     | 判定                        |
| ---------------------------------------- | --------------------------- |
| CRITICAL/HIGH がゼロ、バリデーション通過 | **APPROVE**                 |
| MEDIUM/LOW のみ、バリデーション通過      | **APPROVE**（コメント付き） |
| HIGH がある、またはバリデーション失敗    | **REQUEST CHANGES**         |
| CRITICAL がある                          | **BLOCK**                   |

---

## フォールバック

- **`gh` CLI がない場合**: ローカルレビューのみ実行。GitHub への公開をスキップし、警告を表示
- **大規模 PR（50ファイル超）**: レビュー範囲の警告を表示。ソースコード → テスト → 設定/ドキュメントの優先順で対応
