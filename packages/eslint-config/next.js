module.exports = {
  extends: [
    './rules/base.js',
    './rules/react.js',
    './rules/typescript.js',
    './rules/prettier.js',
    './rules/next.js',
  ],
  env: {
    browser: true,
    node: true,
  },
  globals: {
    window: true,
    fetch: true,
  },
}
