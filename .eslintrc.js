module.exports = {
  env: {
    es2021: true,
  },
  extends: ['eslint:recommended', 'airbnb', 'prettier'],
  overrides: [
    {
      parser: '@typescript-eslint/parser',
      files: ['packages/server/**/*.ts'],
      extends: [
        'eslint:recommended',
        'airbnb',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'prettier',
      ],
      plugins: ['@typescript-eslint', 'jest'],
      parserOptions: {
        project: ['packages/server/tsconfig.json'],
      },
      env: {
        node: true,
        'jest/globals': true,
      },
    },
    {
      files: ['packages/client/**/*.ts', 'packages/client/**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:react/recommended',
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
      ],
      plugins: ['react', '@typescript-eslint', 'jest'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ['packages/client/tsconfig.json'],
      },
      env: {
        browser: true,
        'jest/globals': true,
      },
    },
  ],

  rules: {
    'no-console': 'off',
    'import/no-unresolved': 'error',
  },
};
