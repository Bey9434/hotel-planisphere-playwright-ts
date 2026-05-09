---
name: add-glossary
description: 技術用語を用語集（docs/glossary.md）に追加。「〇〇について教えて」「用語追加」で起動。
argument-hint: [用語名]
allowed-tools: Read, Write, Edit, WebSearch, WebFetch, Grep, Glob
model: inherit
---

# 用語集に追加

引数: $ARGUMENTS

`.agent/rules/glossary.md` と `.agent/skills/glossary/SKILL.md` の品質基準とフォーマットに従ってください。

## 手順

### 1. 用語の特定

$ARGUMENTS で指定された用語を特定する。

### 1.5. 重複チェック

`docs/glossary.md` に同一または類似の用語が既に存在しないか確認する。
既に存在する場合は、更新が必要か判断し、ユーザーに報告する。

### 2. 調査

必要に応じてウェブ検索を行い、最新の公式ドキュメントや比較記事を参照する。
情報源の優先順位: 公式ドキュメント → GitHub リポジトリ → 技術ブログ → カンファレンス資料

### 3. 解説生成

`.agent/skills/glossary/SKILL.md` のフォーマットに従って解説を生成する。

### 4. ファイル更新

`docs/glossary.md` の末尾に追記する。

### 5. 報告

追加完了を報告し、簡易的な解説を表示する。
