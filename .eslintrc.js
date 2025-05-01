module.exports = {
  extends: ["next/core-web-vitals", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
  plugins: ["import", "@typescript-eslint"],
  rules: {
    // Enforce named exports over default exports
    "import/no-default-export": "error",

    // Exception for pages and layouts which Next.js requires as default exports
    "import/no-default-export": [
      "error",
      {
        ignore: ["**/pages/**/*.tsx", "**/pages/**/*.ts", "**/app/**/page.tsx", "**/app/**/layout.tsx"],
      },
    ],

    // Ensure all exports are used
    "import/no-unused-modules": [
      1,
      {
        unusedExports: true,
      },
    ],

    // Ensure imports correspond to named exports
    "import/named": "error",

    // Enforce a consistent import order
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],

    // Prevent importing the same module multiple times
    "import/no-duplicates": "error",
  },
  overrides: [
    {
      // Allow default exports for Next.js specific files
      files: ["**/pages/**/*.tsx", "**/pages/**/*.ts", "**/app/**/page.tsx", "**/app/**/layout.tsx"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
}
