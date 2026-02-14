import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";
import functional from "eslint-plugin-functional";
import boundaries from "eslint-plugin-boundaries";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // lint対象外
  {
    ignores: [
      "node_modules/",
      "test-results/",
      "playwright-report/",
      "blob-report/",
    ],
  },
  // JS/TS ファイルに推奨ルールを適用
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  // TypeScript 型チェック付き推奨ルール
  ...tseslint.configs.recommendedTypeChecked,

  // 関数型プログラミング推奨ルール (eslint-plugin-functional)
  {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    plugins: { functional: functional as any },
    rules: {
      "functional/no-classes": "error",
      "functional/no-this-expressions": "error",
      "functional/no-throw-statements": "error",
      "functional/no-return-void": "error",
    },
  },

  // アーキテクチャ境界ルール (eslint-plugin-boundaries)
  {
    plugins: { boundaries },
    settings: {
      "boundaries/include": ["src/**/*", "tests/**/*"],
      "boundaries/elements": [
        { type: "pages", pattern: "src/pages" }, // POM & Logic (Application Layer)
        { type: "fixtures", pattern: "src/fixtures" }, // Test Fixtures
        { type: "tests", pattern: "tests" }, // E2E Tests
      ],
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow", // 原則禁止
          rules: [
            // 上位レイヤーは下位レイヤーにのみ依存可能
            { from: "fixtures", allow: ["pages"] },
            { from: "tests", allow: ["pages", "fixtures"] },
          ],
        },
      ],
      "boundaries/no-private": "error",
    },
  },

  // 型情報の設定（tsconfig.json を使用）
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Playwright 推奨ルール（テストファイルのみに適用）
  {
    ...playwright.configs["flat/recommended"],
    files: ["tests/**/*.spec.ts"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
      "functional/no-return-void": "off", // テストは副作用必須
      "functional/no-expression-statements": "off", // expect(...) は式
    },
  },
]);
