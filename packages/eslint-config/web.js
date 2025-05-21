module.exports = {
  extends: [
    './rules/base.js',
    './rules/react.js',
    './rules/typescript.js',
    './rules/prettier.js',
  ],
  env: { browser: true },
  globals: { window: true, fetch: true },
  rules: { curly: ['error', 'all'] },
}
