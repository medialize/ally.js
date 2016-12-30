
module.exports = {
  "extends": "semistandard",
  "settings": {
    "ecmascript": 6,
  },
  "env": {
    "browser": 1,
    "es6": 1,
  },
  "rules": {
    // I'm willing to revert my stance on this, at some point
    "space-before-function-paren": ["error", "never"],

    // holding my ground on this
    "operator-linebreak": ["error", "before"],

    // I'm sorry, it's just simpler to manage
    "comma-dangle": ["error", "always-multiline"],

    // enforce scoped variables
    "no-var": 2,
    "prefer-const": 2,
  }
};
