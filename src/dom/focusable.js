// http://www.w3.org/WAI/PF/aria-practices/#keyboard
define(function defineDomFocusable(require) {
  'use strict';

  var selector = require('../map/selector');

  function focusable(context) {
    var elements = context.querySelectorAll(selector.focusable);
    return [].slice.call(elements, 0);
  }

  return focusable;
});