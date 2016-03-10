
// convert a CSS selector so that it also pierces ShadowDOM
// takes ".a, #b" and turns it into ".a, #b, html >>> .a, html >>> #b"

import cssShadowPiercingDeepCombinator from '../supports/css-shadow-piercing-deep-combinator';

let shadowPrefix;

export default function(selector) {
  if (typeof shadowPrefix !== 'string') {
    const operator = cssShadowPiercingDeepCombinator();
    if (operator) {
      shadowPrefix = ', html ' + operator + ' ';
    }
  }

  if (!shadowPrefix) {
    return selector;
  }

  return selector + shadowPrefix + selector.replace(/\s*,\s*/g, ',').split(',').join(shadowPrefix);
}
