module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["airbnb", "plugin:react/recommended", "plugin:react-native/all"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "react-native"],
  rules: {
    quotes: ["error", "double"],
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": "off",
    "no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: false },
    ],
    "function-paren-newline": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "object-curly-newline": "off",
    "implicit-arrow-linebreak": "off",
    "react/require-default-props": "off",
    "no-unused-vars": ["warn"],
    "no-console": "off",
    "comma-dangle": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
