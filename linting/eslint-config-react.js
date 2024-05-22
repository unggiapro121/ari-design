module.exports = {
  'settings': {
    'react': {
      'pragma': 'React',
      'version': 'detect',
    },
  },
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended', // https://eslint.org/docs/rules/
    'plugin:react/recommended', // https://github.com/yannickcr/eslint-plugin-react#configuration
    'plugin:@typescript-eslint/recommended',
    'plugin:import/warnings',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2021,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
    'import',
  ],
  'rules': {
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-explicit-any': [
      'off',
    ],
    'key-spacing': [2, {'beforeColon': false, 'afterColon': true}],
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
        'VariableDeclarator': 1,
        'MemberExpression': 1,
        'FunctionDeclaration': {
          'body': 1,
          'parameters': 1,
        },
      },
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'operator-linebreak': [
      'error',
      'after',
    ],
    'no-console': [
      'error',
      {
        'allow': [
          'warn',
          'error',
        ],
      },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 1,
        'maxEOF': 0,
        'maxBOF': 0,
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        'namedComponents': 'arrow-function',
      },
    ],
    'react/forbid-component-props': [
      'error',
      {
        'forbid': [],
      },
    ],
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'never',
        'asyncArrow': 'always',
        'named': 'never',
      },
    ],
    'function-paren-newline': [
      'error',
      'consistent',
    ],
    'space-in-parens': [
      'error',
      'never',
    ],
    'sort-imports': [
      'error',
      {
        'ignoreCase': true,
        'ignoreDeclarationSort': true,
        'allowSeparatedGroups': true,
      },
    ],
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
        ],
        'pathGroups': [
          {
            'pattern': '@/**/**',
            'group': 'parent',
            'position': 'before',
          },
          {
            'pattern': '@**/**',
            'group': 'builtin',
            'position': 'after',
          },
        ],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true,
        },
      },
    ],
    'no-extra-boolean-cast': 'off',
    'react/no-unescaped-entities': 'off',
    'eqeqeq': ['error', 'smart'],
    'space-infix-ops': ['error', { "int32Hint": false }],
    'prefer-template': ['error'],
    'no-useless-concat': ['error'],
    'padding-line-between-statements': ['error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let'], next: '*'},
      { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let']},
      { blankLine: 'always', prev: 'if', next: '*'},
    ],
    'space-before-blocks': 'error',
  },
};
