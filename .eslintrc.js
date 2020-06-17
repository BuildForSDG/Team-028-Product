module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['airbnb-base',
  "prettier"
],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-param-reassign': ['error', { props: false }],
    'import/no-dynamic-require': "off",
    "linebreak-style": 0,
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    "camelcase": ["error", {"allow": ["aa_bb"]}]
  }
};
