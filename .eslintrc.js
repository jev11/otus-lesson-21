module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest/globals": true,
    },
    "extends": [
        "airbnb-base",
        "prettier",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "jest"
    ],
    "rules": {
        "import/prefer-default-export": "off",
        "import/no-unresolved": "off", // https://github.com/typescript-eslint/typescript-eslint/issues/1624
        "import/extensions": ["warn", "never"],// https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
        "no-vars-requires": "off",
        "no-console": "off"
    },
    ignorePatterns: ["dist/**/*.js"]
};
