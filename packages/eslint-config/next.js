const { defineConfig } = require('eslint/config')

const globals = require('globals')

const base = require('./rules/base.js')
const react = require('./rules/react.js')
const typescript = require('./rules/typescript.js')
const prettier = require('./rules/prettier.js')
const nextRules = require('./rules/next.js')

module.exports = defineConfig([
  ...base,
  ...react,
  ...typescript,
  ...prettier,
  ...nextRules,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        window: true,
        fetch: true,
      },
    },

    rules: {
      curly: ['error', 'all'],
    },
  },
])
