import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import vueParser from "vue-eslint-parser"
import { defineConfig } from "eslint/config"
import prettier from "eslint-config-prettier"
import pluginPrettier from "eslint-plugin-prettier/recommended"

export default defineConfig([
  {
    ignores: [".nuxt/**", ".output/**", "dist/**", "node_modules/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
  prettier,
  pluginPrettier,
  {
    files: ["app/pages/**/*.vue", "app/components/ui/**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
  {
    files: ["**/*.{ts,mts,cts,vue}"],
    rules: {
      "no-undef": "off",
    },
  },
  {
    files: ["tests/**/*.ts"],
    rules: {
      "vue/one-component-per-file": "off",
    },
  },
])
