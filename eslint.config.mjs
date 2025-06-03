import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import jestPlugin from "eslint-plugin-jest";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        global: "readonly",
        module: "readonly",
        exports: "readonly",
      },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": "error",
    },
  },
  {
    plugins: {
      jest: jestPlugin,
    },
    files: ["**/*.test.js", "**/*.spec.js"],
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },
];
