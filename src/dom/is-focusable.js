define(function defineDomIsFocusable(require) {
  'use strict';

  var selector = require('../map/selector');
  var visible = require('../dom/visible');

  function isFocusable(element) {
    return element.matches(selector.focusable);
  }

  return isFocusable;
});