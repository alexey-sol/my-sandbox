module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'canonical',
    'canonical/browser',
    'canonical/jsx-a11y',
    'canonical/react',
    'canonical/typescript',
  ],
  rules: {
    'arrow-body-style': [
      'error',
      'as-needed',
    ],
    'import/newline-after-import': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: true },
    ],
    'object-curly-newline': [
      'error',
      {
        minProperties: 3,
        multiline: true,
      },
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'react/jsx-wrap-multilines': [
      'error',
      { prop: 'parens-new-line' },
    ],

    '@typescript-eslint/no-extra-parens': 'off'
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
}
