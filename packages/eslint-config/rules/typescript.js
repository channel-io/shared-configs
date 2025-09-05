const { defineConfig } = require('eslint/config')

const { fixupPluginRules } = require('@eslint/compat')

const tsParser = require('@typescript-eslint/parser')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const unusedImports = require('eslint-plugin-unused-imports')

module.exports = defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],

    languageOptions: {
      parser: tsParser,

      parserOptions: {
        suppressDeprecatedPropertyWarnings: true,
      },
    },

    plugins: {
      '@typescript-eslint': fixupPluginRules({
        rules: typescriptEslint.rules,
        configs: undefined, // configs를 제거하여 circular reference 방지
      }),
      'unused-imports': fixupPluginRules({
        rules: unusedImports.rules,
        configs: undefined,
      }),
    },

    rules: {
      '@typescript-eslint/consistent-type-imports': ['warn'],

      '@typescript-eslint/consistent-type-assertions': [
        'warn',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'allow',
        },
      ],

      '@typescript-eslint/no-extra-non-null-assertion': 'warn',
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-dupe-class-members': 'warn',
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'none',
          ignoreRestSiblings: true,
          caughtErrors: 'all',
        },
      ],

      'unused-imports/no-unused-imports': 'error',
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'warn',
      'no-undef': 'off',
    },

    settings: {
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],

      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
      },

      'import/resolver': {
        typescript: {},
      },
    },
  },
])
