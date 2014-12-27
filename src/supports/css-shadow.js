define(function defineSupportsCssShadow(require) {
  'use strict';

  // see http://dev.w3.org/csswg/css-scoping/#shadow-pseudoelement

  var cache = require('./supports-cache');

  var testName = 'supports-css-shadow-pseudo';
  var supportsCssShadowPseudo = cache.get(testName);
  if (typeof supportsCssShadowPseudo !== 'boolean') {
    try {
      // it may become possible to run real test
      // if ::shadow actually finds something
      document.querySelector('::shadow');
      supportsCssShadowPseudo = true;
    } catch (e) {
      supportsCssShadowPseudo = false;
    }

    cache.set(testName, supportsCssShadowPseudo);
  }

  return supportsCssShadowPseudo;
});