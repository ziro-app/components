module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es6: true,
    jest: true,
    browser: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: true,
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'import', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': 'off',
    'react/jsx-filename-extension': ['error', {
      extensions: ['.js', '.jsx']
    }],

    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off', //['error', { argsIgnorePattern: '^_' }],
    'no-unused-expressions': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'global-require': 'off',
    'react-native/no-raw-text': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'consistent-return': 'off',
    'no-console': 'off', //['error', { allow: ['tron'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-throw-literal': 'off',
    'no-return-assign': 'off',
    'no-async-promise-executor': 'off',
    'default-case': 'off',
    'no-fallthrough': 'off',
    'no-useless-catch': 'off',
    'no-alert': 'off',
    'prefer-promise-reject-errors': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-unreachable': 'warn',
    'one-var': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-sparse-arrays': 'off',
    'no-shadow': 'off',
    radix: 'off',
  },
};