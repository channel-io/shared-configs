"use strict";

module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-clean-order/error",
    "stylelint-config-prettier-scss",
  ],
  overrides: [
    {
      files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
      customSyntax: "postcss-styled-syntax",
    },
  ],
};
