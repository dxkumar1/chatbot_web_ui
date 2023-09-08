/** @format */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    rules: {
      semi: ['error', 'never'],
    },
  },
  plugins: ['prettier', '@typescript-eslint',"simple-import-sort"],
  extends: [
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],
  env: {
    browser: true,
    es2021: true,
  },
  rules: {
    'react/jsx-uses-react': 1,
    semi: ['error', 'always'],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  },
  overrides: [
    {
      files: ['*-test.js', '*.spec.js'],
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ]
};
