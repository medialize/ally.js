define(function defineFocusWhenVisible(require) {
  'use strict';

  /*
    focus an element once it became fully visible in the viewport
  */

  var whenVisible = require('../dom/when-visible');

  function focus(element) {
    element.focus();
  }

  return function(element, percentVisible) {
    return whenVisible(focus, element, percentVisible);
  };

});