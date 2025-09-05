const { defineConfig } = require('eslint/config')

const globals = require('globals')

const base = require('./rules/base.js')
const react = require('./rules/react.js')
const typescript = require('./rules/typescript.js')
const prettier = require('./rules/prettier.js')

module.exports = defineConfig([
  ...base,
  ...react,
  ...typescript,
  ...prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        window: true,
        fetch: true,
      },
    },
    rules: {
      curly: ['error', 'all'],
    },
  },
])
