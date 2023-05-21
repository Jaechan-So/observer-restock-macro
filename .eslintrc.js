module.exports = {
  env: {
    es2022: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json']
  },
  plugins: [
    'sort-keys-fix',
    'typescript-sort-keys',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'curly': ['error', 'all'],
    'eqeqeq': ['error', 'always'],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: ['builtin', 'external', 'internal', ['index', 'sibling', 'parent']],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          }
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 'off',
    'prettier/prettier': ['error', {
        trailingComma: 'all',
        singleQuote: true,
    }],
    'sort-keys': ['error', 'asc'],
    'sort-keys-fix/sort-keys-fix': ['error'],
    'typescript-sort-keys/interface': 'error',
    'quotes': ['error', 'single', {
      allowTemplateLiterals: false,
      avoidEscape: true,
    }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
