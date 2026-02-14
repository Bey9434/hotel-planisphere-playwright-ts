import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";
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
  // TypeScript 推奨ルール
  tseslint.configs.recommended,
  // Playwright 推奨ルール（テストファイルのみに適用）
  {
    ...playwright.configs["flat/recommended"],
    files: ["tests/**/*.spec.ts"],
  },
]);
