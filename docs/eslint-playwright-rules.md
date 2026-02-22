# eslint-plugin-playwright 全ルール解説

> 公式: https://github.com/playwright-community/eslint-plugin-playwright

✅ = `recommended` に含まれる（設定しなくても有効）
🔧 = `--fix` で自動修正可能
💡 = エディタ上で修正候補を表示

---

## 1. テストの基本ルール

### `expect-expect` ✅

**テスト内にアサーション（検証）がなければエラー。**

```typescript
// ❌ 何も検証していない（意味のないテスト）
test("ログイン画面", async ({ page }) => {
  await page.goto("/login");
});

// ✅ 検証がある
test("ログイン画面", async ({ page }) => {
  await page.goto("/login");
  await expect(page).toHaveTitle("ログイン");
});
```

---

### `valid-expect` ✅

**`expect()` の書き方が正しいかチェック。**

```typescript
// ❌ マッチャーがない
await expect(page.locator("h1"));

// ✅ マッチャーがある
await expect(page.locator("h1")).toBeVisible();
```

---

### `valid-title` ✅ 🔧

**テスト名が空や不正でないかチェック。**

```typescript
// ❌ テスト名が空
test("", async ({ page }) => { ... });

// ✅ テスト名がある
test("正常にログインできる", async ({ page }) => { ... });
```

---

### `valid-describe-callback` ✅

**`describe()` のコールバック関数が正しいかチェック。**

```typescript
// ❌ async は不要（describe の中は同期）
test.describe("ログイン", async () => { ... });

// ✅
test.describe("ログイン", () => { ... });
```

---

### `valid-expect-in-promise` ✅

**Promise チェーン内の `expect` が正しく返されているかチェック。**

```typescript
// ❌ Promise の中の expect が返されていない
test("テスト", async () => {
  somePromise.then((value) => {
    expect(value).toBe(true); // これは待たれない
  });
});

// ✅ await する
test("テスト", async () => {
  const value = await somePromise;
  expect(value).toBe(true);
});
```

---

### `valid-test-tags` ✅

**テストタグの形式が正しいかチェック。**

```typescript
// ❌ タグの形式が不正
test("テスト", { tag: "smoke" }, async ({ page }) => { ... });

// ✅ @ で始まる
test("テスト", { tag: "@smoke" }, async ({ page }) => { ... });
```

---

## 2. await 関連

### `missing-playwright-await` ✅ 🔧

**Playwright API の `await` 忘れを検出。最も重要なルール。**

```typescript
// ❌ await がない → 操作完了を待たずに次へ進む
expect(page.locator("h1")).toBeVisible();

// ✅
await expect(page.locator("h1")).toBeVisible();
```

---

### `no-useless-await` ✅ 🔧

**不要な `await` を検出。**

```typescript
// ❌ getByRole は同期関数なので await 不要
const button = await page.getByRole("button");

// ✅
const button = page.getByRole("button");
```

---

## 3. 禁止される古い API

### `no-element-handle` ✅ 💡

**`page.$()` / `page.$$()` の使用を禁止。Playwright 旧バージョンの API。**

```typescript
// ❌ ElementHandle（古い API、Auto-waiting が効かない）
const button = await page.$("button");
await button?.click();

// ✅ ロケーター（新しい API、Auto-waiting が効く）
await page.getByRole("button").click();
```

---

### `no-eval` ✅

**`page.$eval()` / `page.$$eval()` の使用を禁止。**

```typescript
// ❌ DOM を直接評価（テストが壊れやすい）
const text = await page.$eval("h1", (el) => el.textContent);

// ✅ ロケーターで取得
const text = await page.locator("h1").textContent();
```

---

### `no-wait-for-navigation` ✅ 💡

**`page.waitForNavigation()` の使用を禁止。古い API。**

```typescript
// ❌ 古いパターン
await Promise.all([page.waitForNavigation(), page.click("a")]);

// ✅ Playwright は自動でナビゲーションを待つ
await page.click("a");
```

---

### `no-wait-for-selector` ✅ 💡

**`page.waitForSelector()` の使用を禁止。**

```typescript
// ❌ 古い API
await page.waitForSelector("h1");

// ✅ Web-First Assertions を使う
await expect(page.locator("h1")).toBeVisible();
```

---

### `no-wait-for-timeout` ✅ 💡

**固定時間の待機を禁止。テストが遅く＆不安定になる。**

```typescript
// ❌ 5秒待つ
await page.waitForTimeout(5000);

// ✅ 要素の出現を待つ
await expect(page.locator("h1")).toBeVisible();
```

---

## 4. テスト制御の禁止

### `no-focused-test` ✅ 💡

**`.only` の消し忘れ防止。CIで他のテストが全スキップされる。**

```typescript
// ❌ これをコミットすると他のテストが全部スキップ
test.only("ログイン", async ({ page }) => { ... });

// ✅
test("ログイン", async ({ page }) => { ... });
```

---

### `no-skipped-test` ✅ 💡

**`.skip` の使用を警告。スキップされたテストが放置されがち。**

```typescript
// ❌ スキップが放置される
test.skip("会員登録", async ({ page }) => { ... });
```

---

### `no-slowed-test` 💡

**`.slow()` の使用を警告。テスト自体を修正すべき。**

```typescript
// ❌ タイムアウトを3倍にする（根本解決ではない）
test("重い処理", async ({ page }) => {
  test.slow();
  ...
});
```

---

## 5. テスト内のロジック制限

### `no-conditional-in-test` ✅

**テスト内の `if/else` を禁止。テストを分割すべき。**

```typescript
// ❌ 条件分岐があるとどのパスが実行されたかわからない
test("ログイン", async ({ page }) => {
  if (isMobile) {
    await page.click("menu");
  }
});

// ✅ テストを分ける
test("PC版ログイン", async ({ page }) => { ... });
test("モバイル版ログイン", async ({ page }) => { ... });
```

---

### `no-conditional-expect` ✅

**`if` の中で `expect` を呼ぶことを禁止。**

```typescript
// ❌ 条件によってはアサーションがスキップされる
if (isLoggedIn) {
  await expect(page.locator("h1")).toHaveText("マイページ");
}

// ✅ 常に検証する
await expect(page.locator("h1")).toHaveText("マイページ");
```

---

### `no-standalone-expect` ✅

**`test()` ブロックの外で `expect` を使うことを禁止。**

```typescript
// ❌ テストの外（意味がない）
expect(1 + 1).toBe(2);

test("テスト", async ({ page }) => { ... });
```

---

### `no-unsafe-references` ✅ 🔧

**`page.evaluate()` 内で外側の変数を直接参照することを禁止。**

```typescript
// ❌ ブラウザコンテキストから Node.js の変数は見えない
const name = "太郎";
await page.evaluate(() => console.log(name));

// ✅ 引数として渡す
await page.evaluate((n) => console.log(n), name);
```

---

## 6. ステップとネスト

### `no-nested-step` ✅

**`test.step()` のネストを禁止。フラットに書く。**

```typescript
// ❌ ステップの中にステップ
await test.step("ログイン", async () => {
  await test.step("入力", async () => { ... });
});

// ✅ フラットにする
await test.step("メールアドレスを入力", async () => { ... });
await test.step("パスワードを入力", async () => { ... });
```

---

### `max-nested-describe` ✅

**`describe` のネスト深度を制限（デフォルト5階層）。**

```typescript
// ❌ ネストが深すぎる
test.describe("A", () => {
  test.describe("B", () => {
    test.describe("C", () => {
      test.describe("D", () => {
        test.describe("E", () => {
          test.describe("F", () => { ... }); // 6階層目 → エラー
        });
      });
    });
  });
});
```

---

## 7. ロケーター関連

### `no-raw-locators`

**`page.locator()` の直接使用を禁止。より具体的なロケーターを使わせる。**

```typescript
// ❌ CSS セレクタで直接指定
page.locator(".login-button");
page.locator("#email");

// ✅ 意味のあるロケーターを使う
page.getByRole("button", { name: "ログイン" });
page.getByLabel("メールアドレス");
```

---

### `prefer-native-locators` 🔧

**`page.locator()` の代わりに `getByRole` 等のビルトインロケーターを推奨。**

```typescript
// ❌ locator でテキスト検索
page.locator("text=ログイン");

// ✅ ビルトインロケーター
page.getByText("ログイン");
```

---

### `prefer-locator`

**`page.$` 系メソッドより `page.locator()` を推奨。**

```typescript
// ❌ page.$（古い API）
const el = await page.$("h1");

// ✅ locator
const el = page.locator("h1");
```

---

### `no-nth-methods`

**`first()` / `last()` / `nth()` の使用を禁止。より具体的なロケーターを使わせる。**

```typescript
// ❌ 何番目かで指定（UI変更で壊れやすい）
await page.getByRole("button").first().click();
await page.getByRole("listitem").nth(2).click();

// ✅ 具体的に指定
await page.getByRole("button", { name: "送信" }).click();
```

---

### `no-get-by-title` 🔧

**`getByTitle()` の使用を禁止。`title` 属性はユーザーに見えにくい。**

```typescript
// ❌ title 属性はホバー時しか見えない
page.getByTitle("閉じる");

// ✅ role + name を使う
page.getByRole("button", { name: "閉じる" });
```

---

### `no-restricted-locators`

**特定のロケーターメソッドを禁止（カスタム設定）。**

```typescript
// 例: getByTestId を禁止したい場合
"playwright/no-restricted-locators": ["error", {
  getByTestId: "getByRole を使ってください"
}]
```

---

## 8. 操作の制限

### `no-force-option` ✅

**`{ force: true }` の使用を禁止。Auto-waiting を無視してしまう。**

```typescript
// ❌ 要素が操作可能になるのを待たずに強制クリック
await page.click("button", { force: true });

// ✅ Auto-waiting に任せる
await page.click("button");
```

---

### `no-networkidle` ✅

**`networkidle` オプションの使用を禁止。遅い＆不安定。**

```typescript
// ❌ ネットワークが完全に止まるまで待つ
await page.goto("/", { waitUntil: "networkidle" });

// ✅ デフォルト（load イベント）を使う
await page.goto("/");
```

---

### `no-page-pause` ✅

**`page.pause()` の消し忘れ防止。CI が止まる。**

```typescript
// ❌ デバッグ用。コミットすると CI がハングする
await page.pause();
```

---

### `no-unused-locators` ✅

**宣言したのに使っていないロケーターを検出。**

```typescript
// ❌ 宣言だけして使っていない
const button = page.getByRole("button");
// button を一度も使わないまま終わる
```

---

## 9. フック関連

### `no-hooks`

**`beforeEach` / `afterEach` 等のフックを全面禁止。**

```typescript
// ❌ フックで暗黙的にセットアップ
test.beforeEach(async ({ page }) => {
  await page.goto("/login");
});

// ✅ 各テスト内で明示的に書く
test("ログイン", async ({ page }) => {
  await page.goto("/login");
  ...
});
```

---

### `no-duplicate-hooks`

**同じフックが重複していないかチェック。**

```typescript
// ❌ beforeEach が2つある
test.beforeEach(async ({ page }) => { ... });
test.beforeEach(async ({ page }) => { ... }); // 重複！
```

---

### `prefer-hooks-on-top`

**フックをテストケースより先に書くことを推奨。**

```typescript
// ❌ テストの後にフック（読みにくい）
test("テスト1", async ({ page }) => { ... });
test.beforeEach(async ({ page }) => { ... }); // テストの後に来ている

// ✅ フックが先
test.beforeEach(async ({ page }) => { ... });
test("テスト1", async ({ page }) => { ... });
```

---

### `prefer-hooks-in-order`

**フックの順番を統一。`beforeAll` → `beforeEach` → `afterEach` → `afterAll`。**

```typescript
// ❌ 順番がバラバラ
test.afterEach(() => { ... });
test.beforeEach(() => { ... }); // after の後に before

// ✅ 正しい順番
test.beforeEach(() => { ... });
test.afterEach(() => { ... });
```

---

### `require-hook`

**セットアップコードをフック内に書くことを必須化。`no-hooks` とは逆。**

```typescript
// ❌ describe 直下にセットアップ
test.describe("テスト", () => {
  const data = setupData(); // フックの外

  test("テスト1", async () => { ... });
});

// ✅ フック内に書く
test.describe("テスト", () => {
  let data;
  test.beforeAll(() => { data = setupData(); });
  test("テスト1", async () => { ... });
});
```

---

## 10. マッチャー推奨

### `prefer-web-first-assertions` ✅ 🔧

**Web-First Assertions を推奨。自動リトライ付き。**

```typescript
// ❌ 値を取得してから比較（Auto-retry なし）
const text = await page.locator("h1").textContent();
expect(text).toBe("ログイン");

// ✅ Web-First（要素が条件を満たすまで自動リトライ）
await expect(page.locator("h1")).toHaveText("ログイン");
```

---

### `no-useless-not` ✅ 🔧

**不要な `.not` の検出。逆のマッチャーがある場合はそちらを使う。**

```typescript
// ❌ 二重否定
await expect(locator).not.toBeHidden();

// ✅ 対応するマッチャーを使う
await expect(locator).toBeVisible();
```

---

### `prefer-to-be` 🔧

**`toEqual()` より `toBe()` を推奨（プリミティブ値の比較時）。**

```typescript
// ❌
expect(count).toEqual(5);

// ✅ プリミティブ値には toBe
expect(count).toBe(5);
```

---

### `prefer-strict-equal` 💡

**`toEqual()` より `toStrictEqual()` を推奨（オブジェクト比較時）。**

```typescript
// ❌ toEqual は undefined プロパティを無視する
expect(obj).toEqual({ name: "太郎" });

// ✅ toStrictEqual は厳密に比較
expect(obj).toStrictEqual({ name: "太郎" });
```

---

### `prefer-to-contain` 🔧

**`expect(arr.includes(x)).toBe(true)` より `toContain` を推奨。**

```typescript
// ❌ 回りくどい
expect(items.includes("apple")).toBe(true);

// ✅ 読みやすい
expect(items).toContain("apple");
```

---

### `prefer-to-have-count` 🔧

**ロケーターの数を検証するとき `toHaveCount()` を推奨。**

```typescript
// ❌ count() を取得してから比較
const count = await page.getByRole("listitem").count();
expect(count).toBe(3);

// ✅ Web-First（自動リトライ付き）
await expect(page.getByRole("listitem")).toHaveCount(3);
```

---

### `prefer-to-have-length` 🔧

**配列の長さを検証するとき `toHaveLength()` を推奨。**

```typescript
// ❌
expect(items.length).toBe(3);

// ✅ 読みやすい
expect(items).toHaveLength(3);
```

---

### `prefer-comparison-matcher` 🔧

**比較を検証するとき専用マッチャーを推奨。**

```typescript
// ❌
expect(count > 5).toBe(true);

// ✅
expect(count).toBeGreaterThan(5);
```

---

### `prefer-equality-matcher` 💡

**等価比較を検証するとき専用マッチャーを推奨。**

```typescript
// ❌
expect(a === b).toBe(true);

// ✅
expect(a).toBe(b);
```

---

### `no-restricted-matchers`

**特定のマッチャーを禁止（カスタム設定）。**

```typescript
// 例: toBeTruthy を禁止したい場合
"playwright/no-restricted-matchers": ["error", {
  toBeTruthy: "toBe(true) を使ってください"
}]
```

---

### `require-to-throw-message`

**`toThrow()` にメッセージを必須化。**

```typescript
// ❌ どんなエラーでも通ってしまう
expect(() => fn()).toThrow();

// ✅ 期待するエラーメッセージを指定
expect(() => fn()).toThrow("無効な入力です");
```

---

## 11. テスト構造

### `require-top-level-describe`

**テストを `test.describe` ブロック内に書くことを必須化。**

```typescript
// ❌ describe なしでテストが散らばる
test("テスト1", async ({ page }) => { ... });
test("テスト2", async ({ page }) => { ... });

// ✅ グルーピングされている
test.describe("ログインテスト", () => {
  test("正常ログイン", async ({ page }) => { ... });
  test("異常ログイン", async ({ page }) => { ... });
});
```

---

### `max-expects`

**1テスト内のアサーション数を制限。テストが大きすぎる場合に分割を促す。**

```typescript
// 例: 最大5個に制限
"playwright/max-expects": ["error", { max: 5 }]
```

---

### `no-commented-out-tests`

**コメントアウトされたテストを禁止。消すか `test.skip` にする。**

```typescript
// ❌ コメントアウトが残っている
// test("古いテスト", async ({ page }) => { ... });

// ✅ 不要なら削除。一時的なら skip を使う
test.skip("一時停止中", async ({ page }) => { ... });
```

---

## 12. ソフトアサーション

### `require-soft-assertions` 🔧

**すべてのアサーションを `expect.soft()` にすることを強制。**

```typescript
// ❌ 最初の失敗でテストが止まる
await expect(page.locator("h1")).toBeVisible();
await expect(page.locator("h2")).toBeVisible(); // ← h1 が失敗したらここは実行されない

// ✅ soft なら全部実行してからまとめて失敗を報告
await expect.soft(page.locator("h1")).toBeVisible();
await expect.soft(page.locator("h2")).toBeVisible();
```

---

## 13. スタイル

### `consistent-spacing-between-blocks` ✅ 🔧

**テストブロック間のスペースを統一。**

```typescript
// ❌ スペースがない
test("テスト1", async ({ page }) => { ... });
test("テスト2", async ({ page }) => { ... });

// ✅ 空行で区切る
test("テスト1", async ({ page }) => { ... });

test("テスト2", async ({ page }) => { ... });
```

---

### `prefer-lowercase-title` 🔧

**テスト名を小文字で始めることを強制。日本語テストには不要。**

```typescript
// ❌ 大文字始まり（英語の場合）
test("Login test", async ({ page }) => { ... });

// ✅ 小文字始まり
test("login test", async ({ page }) => { ... });
```
