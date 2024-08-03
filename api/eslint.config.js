module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // Disable the ban-types rule for this specific issue
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          CanActivate: false,
        },
        extendDefaults: true,
      },
    ],
  },
  overrides: [
    {
      files: ['src/auth/auth.guard.ts'],
      rules: {
        '@typescript-eslint/ban-types': 'off',
      },
    },
  ],
};
