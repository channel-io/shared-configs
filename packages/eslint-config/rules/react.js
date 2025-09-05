const { defineConfig } = require('eslint/config')

const { fixupPluginRules } = require('@eslint/compat')

// React plugin에서 필요한 부분만 추출
const reactPlugin = require('eslint-plugin-react')
const reactHooksPlugin = require('eslint-plugin-react-hooks')
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y')

module.exports = defineConfig([
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      react: fixupPluginRules({
        rules: reactPlugin.rules,
        configs: undefined, // configs를 제거하여 circular reference 방지
      }),
      'react-hooks': fixupPluginRules({
        rules: reactHooksPlugin.rules,
        configs: undefined,
      }),
      'jsx-a11y': fixupPluginRules({
        rules: jsxA11yPlugin.rules,
        configs: undefined,
      }),
    },

    rules: {
      'jsx-quotes': ['error', 'prefer-double'],

      'react/jsx-boolean-value': [
        'error',
        'never',
        {
          always: [],
        },
      ],

      'react/jsx-pascal-case': [
        'error',
        {
          allowAllCaps: true,
          ignore: [],
        },
      ],

      'react/no-string-refs': 'error',
      'react/no-unknown-property': 'error',

      'react/jsx-key': [
        'error',
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
        },
      ],

      'react/jsx-curly-spacing': [
        'error',
        {
          when: 'never',

          children: {
            when: 'always',
          },
        },
      ],

      'react/jsx-filename-extension': [
        'warn',
        {
          extensions: ['.js', '.jsx', '.tsx'],
        },
      ],

      'react/jsx-no-constructed-context-values': 'error',

      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
        },
      ],

      'react/no-find-dom-node': 'warn',
      'react/self-closing-comp': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },
])
