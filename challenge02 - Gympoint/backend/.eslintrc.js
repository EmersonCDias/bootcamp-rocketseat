module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': [0],
    'linebreak-style': 0,
    'comma-dangle': ['error', 'only-multiline'],
    'no-param-reassign': [0],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-body-style': [0],
    camelcase: [0],
    strict: [0],
  },
};
