const { defineConfig } = require('eslint/config')

const globals = require('globals')

const base = require('./rules/base.js')
const typescript = require('./rules/typescript.js')
const prettier = require('./rules/prettier.js')

module.exports = defineConfig([
  ...base,
  ...typescript,
  ...prettier,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      curly: ['error', 'all'],
    },
  },
])
