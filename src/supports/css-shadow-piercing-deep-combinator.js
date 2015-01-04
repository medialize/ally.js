define(function defineSupportsCssShadowPiercingDeepCombinator(require) {
  'use strict';

  // see http://dev.w3.org/csswg/css-scoping/#shadow-pseudoelement

  var cache = require('./supports-cache');

  var testName = 'supports-css-shadow-piercing-deep-combinator';
  var combinator = cache.get(testName);
  if (typeof combinator !== 'string') {
    try {
      document.querySelector('html >>> :first-child');
      combinator = '>>>';
    } catch (e) {
      try {
        document.querySelector('html /deep/ :first-child');
        combinator = '/deep/';
      } catch (e) {
        combinator = '';
      }
    }

    cache.set(testName, combinator);
  }

  return combinator;
});