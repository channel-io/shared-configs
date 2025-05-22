module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      extends: ['plugin:import/typescript'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        // eslint-plugin-react@7.32.2 accesses superTypeParameters, which is deprecated by
        // typescript-estree and prints a warning by default
        suppressDeprecatedPropertyWarnings: true,
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/consistent-type-imports': ['warn'],
        '@typescript-eslint/consistent-type-assertions': [
          'warn',
          { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow' },
        ],
        '@typescript-eslint/no-extra-non-null-assertion': 'warn',

        // Overrides
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
        'import/resolver': { typescript: {} },
      },
    },
  ],
}
