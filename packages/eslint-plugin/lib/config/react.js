module.exports = {
  parserOptions: { ecmaFeatures: { jsx: true } },
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-boolean-value': ['error', 'never', { always: [] }],
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
      { when: 'never', children: { when: 'always' } },
    ],
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'react/jsx-no-constructed-context-values': 'error',
    'react/no-find-dom-node': 'warn',
    'react/self-closing-comp': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
  },
  settings: {
    react: { version: 'detect' },
  },
}
