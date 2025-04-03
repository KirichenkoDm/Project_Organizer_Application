import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es6
      },
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        ecmaVersion: "latest",
        sourceType: "module"
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "prettier": prettierPlugin
    },
    rules: {
      "prettier/prettier": ["error", {
        "printWidth": 120
      }],
      "max-len": [
        "error",
        {
          "code": 120,
          "ignoreComments": true,
          "ignoreUrls": true,
          "ignoreStrings": true,
          "ignoreTemplateLiterals": true
        }
      ],
      "eqeqeq": ["error", "always"],
      "curly": "error",
      "eol-last": "error",
      'semi': 'error',
    }
  }
];