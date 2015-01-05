define(function defineSupportsCssShadowPiercingDeepCombinator(require) {
  'use strict';

  // see http://dev.w3.org/csswg/css-scoping-1/#deep-combinator
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1117572
  // https://code.google.com/p/chromium/issues/detail?id=446051

  var cache = require('./supports-cache');

  var testName = 'supports-css-shadow-piercing-deep-combinator';
  var combinator = cache.get(testName);
  if (typeof combinator !== 'string') {
    try {
      document.querySelector('html >>> :first-child');
      combinator = '>>>';
    } catch (e) {
      try {
        // old syntax supported at least up to Chrome 41
        // https://code.google.com/p/chromium/issues/detail?id=446051
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