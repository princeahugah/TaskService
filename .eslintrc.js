module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "google",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {
    "require-jsdoc": [
      "error",
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: false,
          ClassDeclaration: false,
          ArrowFunctionExpression: false,
          FunctionExpression: false,
        },
      },
    ],
    "max-len": [
      2,
      {
        code: 120,
        ignoreTemplateLiterals: true,
        ignoreUrls: true
      },
    ],
    "comma-dangle": ["error", "never"],
    "quotes": ["error", "single"],
    "new-cap": "off",
    "object-curly-spacing": ["error", "always", { "objectsInObjects": false }],
    "@typescript-eslint/interface-name-prefix": [
      "error",
      {
        prefixWithI: "never",
      },
    ],
  },
};
