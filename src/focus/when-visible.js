define(function defineFocusWhenVisible(require) {
  'use strict';

  /*
    focus an element once it became fully visible in the viewport
  */

  var whenVisible = require('../dom/when-visible');
  var isFocusable = require('../dom/is-focusable');

  function focus(element) {
    if (!isFocusable(element)) {
      return false;
    }

    element.focus();
    return true;
  }

  return function(element, percentVisible) {
    return whenVisible(focus, element, percentVisible);
  };

});