# 技術用語集

このドキュメントは、プロジェクトで使用される重要な技術用語、概念、ライブラリについて解説します。
Glossary Agent によって自動的に更新されることを想定しています。

## 用語一覧

### Playwright

#### 何をしているか

Webブラウザを自動操作するためのツールです。人間がブラウザで行う操作（クリック、入力、画面遷移など）をプログラムで自動実行し、Webサイトが正しく動作しているか確認（テスト）します。

#### なぜ必要か

手動でのテストは時間がかかり、ミスも起きやすいですが、Playwrightを使えば高速かつ正確に何度でもテストを実行できます。SeleniumやCypressといった他のツールに比べ、動作が高速で安定しており（Auto-waiting）、最新のWeb技術（Shadow DOMなど）にも強いのが特徴です。

#### 公式ドキュメント

- [Playwright 公式ドキュメント](https://playwright.dev/)

#### 類似技術との比較

| 技術          | 特徴                                                     | 選定理由                                                            |
| ------------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| **Selenium**  | 歴史が長く多言語対応だが、セットアップが複雑で動作が遅め | レガシーシステムの保守以外では選定頻度が低下                        |
| **Cypress**   | JavaScript特化で使いやすいが、複数タブ操作などに制限あり | フルスタックなE2EテストにはPlaywrightの方が柔軟性が高い             |
| **Puppeteer** | Chrome操作に特化（Google製）                             | クロスブラウザテスト（Firefox, Safari）が必要なためPlaywrightを採用 |

#### 面接で聞かれそうな質問

1. **Q**: なぜ Selenium ではなく Playwright を選んだのですか？
   **A**: Auto-waiting 機能によるテストの安定性（Flaky test の削減）と、並列実行による実行速度の速さを重視したからです。また、TypeScript との相性が良く、開発体験が優れている点も理由です。

#### 備考

このプロジェクトでは `agent-browser` (Vercel Agent Browser) と連携し、AIによる自動操作も活用します。

---

### .agent/ Directory Structure (Rules, Skills, Workflows)

#### 何をしているか

AIエージェント（Antigravity、Claude）の動作を制御するための設定ディレクトリです。3つの主要コンポーネント（Rules、Skills、Workflows）を使って、エージェントがどのようにコードを書き、どんな専門知識を持ち、どんな手順で作業するかを定義します。

**構成要素**:

- **Rules**: エージェントが**常に従う**べきコーディング規約やレビュー基準
- **Skills**: 特定のワークフローを実行するための専門知識（トリガー条件で自動起動）
- **Workflows**: ユーザーまたはエージェントが参照する手順書

#### なぜ必要か

AIエージェントに「一度教えたことを一貫して適用させる」ためです。毎回同じ指示を繰り返す代わりに、Rulesで基準を定義し、Skillsで再利用可能なワークフローを作成することで、開発効率と品質の一貫性が向上します。

また、このプロジェクトでは**ポートフォリオとしての価値**も狙っています：

- AI駆動開発の仕組みを具体的に示せる（転職面接でのアピールポイント）
- 「どう考えてこの構造にしたか」が説明できる（設計思想の可視化）

#### 公式ドキュメント

- [Claude Skills 公式ガイド](https://docs.anthropic.com/en/docs/build-with-claude/skills)
- [Antigravity by Google DeepMind](https://antigravity.google/)
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/)

#### 類似技術との比較

| アプローチ                     | 特徴                                  | このプロジェクトでの選定理由                                              |
| ------------------------------ | ------------------------------------- | ------------------------------------------------------------------------- |
| **プロンプトエンジニアリング** | 毎回の会話で指示を書く                | 一貫性がなく、繰り返しが多い ⇒ Rules/Skillsで自動化                       |
| **CLAUDE.md**                  | プロジェクトのルートに1ファイルで設定 | シンプルだが、複数の責任が混在しがち ⇒ Rules/Skills/Workflowsで責任を分離 |
| **MCP Server**                 | 外部システムとの統合（DB、API）       | このプロジェクトは「内部ルールの定義」が目的なので不要                    |

#### 引用と解釈

**引用元1**: [Claude Skills公式ガイド](https://docs.anthropic.com/en/docs/build-with-claude/skills) - "Progressive Disclosure" section

> Skills function uniformly across different Claude interfaces... Skills are skills encapsulated sets of instructions, scripts, and resources that teach Claude how to perform specific, repeatable tasks or workflows. They enable customization and consistency, allowing users to teach Claude a process once for repeated use.

**解釈**:
「一度教えれば繰り返し使える」という点に着目。このプロジェクトでは、コーディング規約（Rules）やワークフロー（Skills）を定義することで、毎回同じ指示を繰り返す必要がなくなる。特に、技術面接の準備として「Playwrightのロケーター優先順位」などを一度定義すれば、常に一貫したコードが生成される。

---

**引用元2**: [Claude Skills公式ガイド](https://github.com/anthropic-ai/anthropic-cookbook/blob/main/skills/creating-skills.md) - Best Practices

> Design skills for specific, repeatable tasks with clear examples... For complex requirements like matching voice or audience, it's often more effective to create separate, smaller skills rather than one large, generic skill.

**解釈**:
「小さく分割された専門スキルの方が効果的」という原則を適用。当初、`coding.md`と`e2e-runnner.md`でPlaywright関連の内容が重複していたが、リファクタリングで責任を分離：

- `coding.md`: TypeScript/JavaScript汎用規約
- `e2e-runnner.md`: Playwright E2E戦略のみ

これにより、各Ruleが明確な単一責任を持ち、メンテナンス性が向上した。

---

**引用元3**: [Antigravity公式サイト](https://antigravity.google/) - Design Principles

> Observability: Status and activities must be clearly visible... Agents should communicate their understanding and verify their work through "Artifacts" such as task lists, implementation plans, walkthroughs.

**解釈**:
「エージェントの構成を可視化する」という原則に基づき、`.agent/README.md`を作成。Rules/Skills/Workflowsの全体像と、それぞれの責任範囲を明記することで、以下を実現：

1. 時間が経っても設計意図を思い出せる（未来の自分への説明）
2. ポートフォリオとして見せる際、AI駆動開発の仕組みを説明できる
3. 新しいチャットセッション開始時、エージェント自身が全体像を素早く把握できる

#### 設計思想（Antigravity Best Practices）

このプロジェクトでは、以下の原則に基づいて設計しました：

1. **モジュール性 (Modularity)**: 1つのファイルに1つの責任
   - `coding.md` → TypeScript/JavaScript汎用規約
   - `e2e-runnner.md` → Playwright E2E戦略
   - `glossary.md` → 用語解説の品質基準

2. **Progressive Disclosure**: 必要な情報を段階的に提供
   - Skills の `description` フィールドで関連性を判断 → 関連があれば全体を読み込む
   3. **観察可能性 (Observability)**: エージェントの構成を可視化
   - `.agent/README.md` で全体像を説明

3. **DRY原則**: 重複の完全除去
   - 当初、`coding.md` と `e2e-runnner.md` でPlaywrightロケーター優先順位が重複していた
   - リファクタリングで`e2e-runnner.md`のみに集約し、相互参照を追加

#### 面接で聞かれそうな質問

1. **Q**: なぜ`.agent/`ディレクトリを作ったのですか？
   **A**: AI駆動開発を実践し、コーディング規約やテスト戦略を「教えれば一貫して適用される」状態にするためです。また、ポートフォリオとして「AIをどう活用したか」を具体的に示すためでもあります。

2. **Q**: RulesとSkillsの違いは何ですか？
   **A**: Rulesは「すべてのタスクで常に従うべき基準」、Skillsは「特定の条件で起動する専門ワークフロー」です。例えば、`coding.md`（Rule）はすべてのコードで適用され、`glossary`（Skill）は「〇〇について教えて」というトリガーで起動します。

3. **Q**: なぜworkflowsも必要なのですか？
   **A**: Skillsはエージェント向けの「専門知識」ですが、Workflowsは人間（またはエージェント）が参照する「手順書」です。例えば、`add-glossary.md`は用語追加の具体的なステップを示しており、新しいメンバーが参加した際にも役立ちます。

4. **Q**: 設計時に意識したベストプラクティスは？
   **A**: Antigravityの原則として、**モジュール性**（1ファイル=1責任）、**観察可能性**（README.mdで構成を可視化）、**Progressive Disclosure**（必要な情報を段階的に提供）を意識しました。また、重複をリファクタリングで除去し、DRY原則を徹底しました。

#### 備考

- このプロジェクトでは `.agent/`、`docs/` ディレクトリを `.gitignore` で除外し、ローカルでのみ使用しています（面接対策の内容が含まれるため）
- 将来的に、他のSkills（例: テストケース設計、リファクタリング提案）を追加できる拡張性を持たせています

---

### TypeScript

#### 何をしているか

JavaScriptに「型（Type）」を追加した言語。変数や関数の引数・戻り値に型を指定することで、実行前にエラーを検出できる。

```typescript
// 型を指定
function greet(name: string): string {
  return "Hello, " + name;
}
```

#### なぜ必要か

JavaScriptは動的型付けなので、実行するまでエラーがわからない。TypeScriptを使えばエディタが赤線で警告してくれるため、バグを早期発見できる。

#### 公式ドキュメント

- [TypeScript公式](https://www.typescriptlang.org/)

#### 引用と解釈

**引用元**: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)

> TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

**解釈**: 「JavaScriptのスーパーセット」なので、既存のJSコードはそのまま動く。型を少しずつ追加していける移行のしやすさが魅力。

#### 面接で聞かれそうな質問

1. **Q**: なぜTypeScriptを選んだのですか？
   **A**: 型によるエラー早期発見と、IDEの補完機能による開発効率向上のためです。特にPlaywrightとの相性が良く、APIの型定義が充実しています。

---

### Fixture（フィクスチャ）

#### 何をしているか

テストに必要な環境（ブラウザ、ページなど）を自動的にセットアップ・クリーンアップする仕組み。テスト関数の引数 `{ page }` がまさにFixture。

```typescript
test("テスト", async ({ page }) => {
  // page は Playwright が自動で用意してくれる
});
```

#### なぜ必要か

手動でブラウザを起動・終了するコードを書く必要がなくなる。テストに集中できる。

#### 公式ドキュメント

- [Playwright - Test Fixtures](https://playwright.dev/docs/test-fixtures)

#### 引用と解釈

**引用元**: Playwright公式

> Test fixtures are used to establish the environment for each test, giving the test everything it needs and nothing else.

**解釈**: 「必要なものだけを用意する」という点がポイント。`{ page }` と書けば page だけ、`{ browser, context }` と書けばそれらも用意される。依存性注入（DI）パターンの一種。

#### 面接で聞かれそうな質問

1. **Q**: Fixtureとは何ですか？
   **A**: テスト環境のセットアップ・クリーンアップを自動化する仕組みです。beforeEach/afterEach を書く必要がなく、テストコードがシンプルになります。

---

### Page オブジェクト

#### 何をしているか

**ブラウザの1つのタブを表すオブジェクト**。URLを格納するものではなく、「タブそのもの」を操作するインターフェース。

| メソッド                    | 意味            |
| --------------------------- | --------------- |
| `page.goto(url)`            | タブでURLを開く |
| `page.click(selector)`      | 要素をクリック  |
| `page.fill(selector, text)` | テキスト入力    |

#### なぜ必要か

ブラウザ操作を抽象化し、直感的なAPIで操作できる。

#### 公式ドキュメント

- [Playwright - Page](https://playwright.dev/docs/api/class-page)

#### 引用と解釈

**引用元**: Playwright公式

> Page provides methods to interact with a single tab in a Browser.

**解釈**: 「単一のタブ」という点が重要。1テスト = 1ページ = 独立した環境。他のテストの影響を受けない。

---

### Test Isolation（テスト分離）

#### 何をしているか

テストごとに**新しいブラウザタブ（Page）とコンテキスト**が作成され、テスト終了後に破棄される仕組み。

```
テスト1 → 新しいタブ作成 → テスト実行 → タブ破棄
テスト2 → 新しいタブ作成 → テスト実行 → タブ破棄
```

#### なぜ必要か

テスト間でCookieやログイン状態が共有されると、テストの順番で結果が変わる（Flaky Test）。分離することで信頼性が向上。

#### 公式ドキュメント

- [Playwright - Test Isolation](https://playwright.dev/docs/browser-contexts#test-isolation)

#### 引用と解釈

**引用元**: Playwright公式

> Each test gets a fresh environment, including a new page. This means tests are isolated from each other.

**解釈**: 「fresh environment」が核心。毎回まっさらな状態から始まるため、テストが互いに干渉しない。

---

### Locator（ロケーター）

#### 何をしているか

ページ上の要素を見つけるための仕組み。Playwrightでは複数の方法がある。

#### 公式推奨の優先順位

| 優先度 | メソッド             | 説明                   |
| ------ | -------------------- | ---------------------- |
| 1位    | `getByRole()`        | アクセシビリティロール |
| 2位    | `getByLabel()`       | フォームのラベル       |
| 3位    | `getByPlaceholder()` | プレースホルダー       |
| 4位    | `getByText()`        | テキスト内容           |
| 5位    | `getByTestId()`      | data-testid属性        |

#### なぜこの順番か

上位のロケーターは「ユーザーが認識する方法」で要素を探すため、CSSクラスやIDが変わっても壊れにくい。

#### 公式ドキュメント

- [Playwright - Locators](https://playwright.dev/docs/locators)

#### 引用と解釈

**引用元**: Playwright公式

> We recommend prioritizing user-facing attributes and explicit contracts such as `page.getByRole()`.

**解釈**: 「user-facing（ユーザー向け）」がキーワード。開発者視点（CSS、ID）ではなくユーザー視点（ボタン、入力欄）でテストを書くべき。

---

### Role（ロール）

#### 何をしているか

HTML要素が「何者か」を表すアクセシビリティ概念。スクリーンリーダーが要素を認識するために使用。

| HTML要素              | Role      |
| --------------------- | --------- |
| `<button>`            | `button`  |
| `<input type="text">` | `textbox` |
| `<h1>`                | `heading` |
| `<a href>`            | `link`    |

#### なぜ必要か

`getByRole()` はこのRoleを使って要素を探す。CSSクラスよりも意味的で、壊れにくいテストが書ける。

#### 公式ドキュメント

- [MDN: ARIA Roles](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles)

#### 引用と解釈

**引用元**: MDN

> ARIA roles provide semantic meaning to content, allowing screen readers and other tools to present and support interaction with an object.

**解釈**: 「semantic meaning（意味的な意味）」が重要。`<div class="btn">` よりも `<button>` の方が意味が明確で、テストも安定する。

---

### exact: true

#### 何をしているか

ロケーターで**完全一致**を指定するオプション。デフォルトは部分一致。

```typescript
// 部分一致: 「ユーザー名」を含むラベルすべてにマッチ
getByLabel("ユーザー名");

// 完全一致: 「ユーザー名」ぴったりのラベルだけ
getByLabel("ユーザー名", { exact: true });
```

#### なぜ必要か

「ユーザー名」と「ユーザー名（必須）」のように似たラベルがある場合、意図した要素だけを特定できる。

#### 公式ドキュメント

- [Playwright - Filtering by text](https://playwright.dev/docs/locators#filter-by-text)

#### 面接で聞かれそうな質問

1. **Q**: `exact: true` はいつ使いますか？
   **A**: 似たラベルや表示テキストが複数ある場合に、正確に1つの要素を特定するために使います。

---

### ESLint（flat config）

#### 何をしているか

JavaScriptやTypeScriptのコードを「書いた瞬間」にチェックし、バグやスタイル違反を自動検出するツール。「flat config」は ESLint v9 で導入された新しい設定形式で、1つの `eslint.config.mts` ファイルにすべての設定をフラットに書く。

#### なぜ必要か

コードレビューで「ここ `any` 使ってるよ」「`await` 忘れてるよ」と指摘する手間を、機械に任せるため。人間は設計やロジックのレビューに集中できる。旧形式（`.eslintrc`）は設定の継承が複雑で、どのルールがどこから来ているか追跡しにくかったが、flat config は1ファイルで全体像が見える。

#### 公式ドキュメント

- [ESLint 公式](https://eslint.org/)
- [Configuration Files (flat config)](https://eslint.org/docs/latest/use/configure/configuration-files)

#### 類似技術との比較

| 技術                          | 特徴                                   | 選定理由                                                                      |
| ----------------------------- | -------------------------------------- | ----------------------------------------------------------------------------- |
| **TSC (TypeScript Compiler)** | 型チェックのみ                         | コードスタイルやベストプラクティスは検出できない                              |
| **Biome**                     | Rust製で高速、ESLint + Prettier の代替 | プラグインエコシステムが未成熟（playwright, functional, boundaries 等がない） |
| **Deno lint**                 | Deno 内蔵のリンター                    | Node.js プロジェクトには不適                                                  |

#### 引用と解釈

**引用元**: [ESLint 公式 - Configuration Files](https://eslint.org/docs/latest/use/configure/configuration-files)

> The flat config file format consolidates all configuration into a single file, making it easier to understand and maintain.

**解釈**: 「1ファイルに集約」が flat config の核心。このプロジェクトでは `eslint.config.mts` 1つに6プラグインの設定をまとめ、TypeScript で型安全に書いている。

#### 面接で聞かれそうな質問

1. **Q**: なぜ ESLint を導入したのですか？
   **A**: コーディング規約（FP、ロケーター優先順位、アーキテクチャ境界）を機械的に強制するためです。レビューコストの削減と、チーム内の一貫性確保が目的です。

2. **Q**: flat config と旧形式の違いは？
   **A**: 旧形式は `.eslintrc` + `extends` チェーンで設定が分散しがちでしたが、flat config は1ファイルで完結し、JavaScript/TypeScript で記述するのでIDEの補完も効きます。

---

### eslint-plugin-playwright

#### 何をしているか

Playwright テストコードに特化した ESLint ルール群。`await` の付け忘れ、`.only()` の消し忘れ、旧 API（`page.$`）の使用、不安定なロケーター（CSS クラス）の使用などを自動検出する。

#### なぜ必要か

Playwright は非同期 API が多く、`await` の付け忘れが実行時まで気づけない。また、CIで `.only()` がそのまま通ると他のテストが実行されない。これらを「書いた瞬間」に検出するため。

#### 公式ドキュメント

- [eslint-plugin-playwright (GitHub)](https://github.com/playwright-community/eslint-plugin-playwright)

#### 引用と解釈

**引用元**: [eslint-plugin-playwright README](https://github.com/playwright-community/eslint-plugin-playwright)

> ESLint plugin for Playwright testing. Helps catch common mistakes and enforce best practices.

**解釈**: 「common mistakes（よくあるミス）」の防止が主目的。このプロジェクトでは recommended の全 `warn` ルールを `error` に昇格し、さらに16個の追加ルール（`no-raw-locators`, `no-hooks`, `prefer-to-be` 等）で品質基準を引き上げている。

#### このプロジェクトでのルール構成

| カテゴリ                           | ルール数 | 例                                            |
| ---------------------------------- | -------- | --------------------------------------------- |
| recommended（元から error）        | 13       | `missing-playwright-await`, `no-focused-test` |
| recommended（warn → error に昇格） | 15       | `no-wait-for-timeout`, `no-force-option`      |
| 追加ルール（recommended 外）       | 16       | `no-raw-locators`, `no-hooks`, `prefer-to-be` |

#### 面接で聞かれそうな質問

1. **Q**: なぜ recommended の `warn` を `error` にしたのですか？
   **A**: `warn` はCI/pre-commitで止まらないため、問題が蓄積します。「すべてのルールがエラーとして扱われる」状態にすることで、コードベースのクリーンさを保証しています。

2. **Q**: recommended に含まれないルールを追加した理由は？
   **A**: プロジェクトの方針（`getByRole` 優先、`beforeEach` 禁止、厳密マッチャー使用）を ESLint で自動強制するためです。ドキュメントに書くだけでは忘れられますが、リンターなら commit 時に止まります。

---

### eslint-plugin-functional

#### 何をしているか

関数型プログラミング（FP）のルールを強制する ESLint プラグイン。クラス、`this`、`throw`、ミュータブル変数の使用などを禁止できる。

#### なぜ必要か

このプロジェクトは「関数型 POM」を採用しており、Page Object をクラスではなく関数で実装する方針。この方針を「ドキュメントに書く」だけでなく「ESLint で自動強制」するため。

#### 公式ドキュメント

- [eslint-plugin-functional (GitHub)](https://github.com/jonaskello/eslint-plugin-functional)

#### このプロジェクトで有効なルール

| ルール                | 効果                | 禁止される例                   |
| --------------------- | ------------------- | ------------------------------ |
| `no-classes`          | `class` 構文を禁止  | `class LoginPage { ... }`      |
| `no-this-expressions` | `this` を禁止       | `this.page.goto(...)`          |
| `no-throw-statements` | `throw` を禁止      | `throw new Error(...)`         |
| `no-return-void`      | `void` 戻り値を禁止 | `function doSomething(): void` |

#### 引用と解釈

**引用元**: [eslint-plugin-functional - no-classes](https://github.com/jonaskello/eslint-plugin-functional/blob/main/docs/rules/no-classes.md)

> Classes, which are designed for object-oriented programming with internal state, are generally discouraged in a functional programming style.

**解釈**: OOP の内部状態管理を避け、純粋関数ベースの設計を強制する。テストファイルでは `no-return-void` と `no-expression-statements` を OFF にしている（テストは副作用が前提のため）。

#### 面接で聞かれそうな質問

1. **Q**: なぜ Page Object をクラスではなく関数で書くのですか？
   **A**: テスタビリティと可読性のためです。関数は `page` を引数で受け取るため依存が明示的で、各関数が独立してテスト・再利用できます。クラスは内部状態（`this.page`）を持つため、テスト間で状態が漏れるリスクがあります。

2. **Q**: テストファイルで一部ルールを OFF にした理由は？
   **A**: `expect(...)` は式文（expression statement）であり、テストのアクション（`click`, `fill`）は `void` を返します。テストは本質的に副作用の集合なので、これらのルールは矛盾します。

---

### eslint-plugin-boundaries

#### 何をしているか

プロジェクト内のモジュール間の依存方向を ESLint で制限するプラグイン。ディレクトリ単位で「要素タイプ」を定義し、どの要素がどの要素を import できるかをルール化する。

#### なぜ必要か

E2E テストプロジェクトでは `tests/` → `pages/` の一方向依存が正しい設計。逆方向（`pages/` → `tests/`）やテスト間の相互参照（`tests/` → `tests/`）は設計破壊。これを機械的に防ぐため。

#### 公式ドキュメント

- [eslint-plugin-boundaries (GitHub)](https://github.com/javierbrea/eslint-plugin-boundaries)
- [jsboundaries.dev](https://jsboundaries.dev/)

#### このプロジェクトでの設定

```
tests/ ──import──→ pages/   ✅ 許可
pages/ ──import──→ tests/   ❌ 禁止
tests/ ──import──→ tests/   ❌ 禁止（別ファイル間）
```

#### 引用と解釈

**引用元**: [eslint-plugin-boundaries README](https://github.com/javierbrea/eslint-plugin-boundaries)

> It checks folder structures and dependencies between them, defining constraints for how elements can interact with each other.

**解釈**: 「フォルダ構造と依存関係の制約」を定義する。アーキテクチャの意思決定をコードレベルで強制できるため、チームが拡大してもルールが崩れない。

#### 面接で聞かれそうな質問

1. **Q**: なぜ依存方向を制限するのですか？
   **A**: Page Object はテストの実装詳細を知るべきではなく、テストは Page Object を通じてのみページを操作すべきです。この一方向依存が崩れると、変更の影響範囲が予測不能になります。

---

### husky + lint-staged（pre-commit フック）

#### 何をしているか

- **husky**: Git のフック（`pre-commit`, `pre-push` 等）を簡単に管理するツール。`.husky/pre-commit` にコマンドを書くだけで、コミット前に自動実行される
- **lint-staged**: Git でステージされたファイル（`git add` されたもの）だけにリンター/フォーマッターを実行するツール

2つを組み合わせて「コミット前に ESLint + Prettier を実行し、エラーがあればコミットを拒否」する仕組みを作る。

#### なぜ必要か

`pnpm run lint` を手動で実行するのを忘れる開発者がいる。pre-commit フックなら「コミットボタンを押した瞬間」に自動実行されるため、品質の低いコードがリポジトリに混入することを防げる。

#### 公式ドキュメント

- [husky 公式](https://typicode.github.io/husky/)
- [lint-staged (GitHub)](https://github.com/lint-staged/lint-staged)

#### このプロジェクトでの設定

```
git commit
  └── .husky/pre-commit: "pnpm exec lint-staged"
        └── lint-staged (package.json):
              ├── *.{ts,mts} → eslint --fix
              └── **/*       → prettier --write --ignore-unknown
```

#### 類似技術との比較

| 技術                     | 特徴                        | 選定理由                              |
| ------------------------ | --------------------------- | ------------------------------------- |
| **手動 `pnpm run lint`** | 忘れる可能性がある          | 自動化が必要                          |
| **CI でのみチェック**    | push 後にしか気づけない     | ローカルで早期発見したい              |
| **pre-commit (Python)**  | Python 製のフック管理ツール | Node.js プロジェクトには husky が自然 |

#### 引用と解釈

**引用元**: [lint-staged README](https://github.com/lint-staged/lint-staged)

> Run linters against staged git files and don't let 💩 slip into your code base!

**解釈**: 「ステージされたファイルだけ」がポイント。全ファイルをリントすると時間がかかるが、変更されたファイルだけなら高速。開発体験を損なわずに品質を維持できる。

#### 面接で聞かれそうな質問

1. **Q**: なぜ CI だけでなく pre-commit でもチェックするのですか？
   **A**: フィードバックループを短くするためです。CI で弾かれると push → 失敗通知 → 修正 → 再 push と時間がかかりますが、pre-commit ならコミット前の数秒で完結します。

2. **Q**: lint-staged で全ファイルではなくステージファイルだけを対象にする理由は？
   **A**: パフォーマンスと開発体験のためです。大規模プロジェクトで全ファイルをリントすると数十秒かかりますが、変更されたファイルだけなら1-2秒で完了します。
