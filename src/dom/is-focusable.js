define(function defineDomIsFocusable(require) {
  'use strict';

  var selector = require('../map/selector');

  function isFocusable(element) {
    return element.matches(selector.focusable);
  }

  return isFocusable;
});