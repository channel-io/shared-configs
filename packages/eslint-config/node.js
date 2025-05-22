module.exports = {
  extends: ['./rules/base.js', './rules/typescript.js', './rules/prettier.js'],
  env: { node: true },
  rules: { curly: ['error', 'all'] },
}
