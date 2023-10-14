module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',

  ],

  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props':'off',
    "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".ts"] }],
    "react/jsx-indent": ['error', 2],
    "max-len": ["error", { "code": 150, "tabWidth": 4 }],
    "import/no-extraneous-dependencies": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "import/prefer-default-export": [
      "off" // default is "single"
    ]
  },
  settings: {
    "import/resolver": {
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    },
  },
}
