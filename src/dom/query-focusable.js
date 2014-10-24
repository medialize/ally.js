define(function defineDomQueryFocusable(require) {
  'use strict';

  // TODO: verify focusable defined by http://www.w3.org/TR/html5/editing.html#focusable

  // http://www.w3.org/TR/html5/editing.html#focusable
  // http://www.w3.org/WAI/PF/aria-practices/#keyboard

  var selector = require('../map/selector');

  function queryFocusable(context) {
    var elements = context.querySelectorAll(selector.focusable);
    return [].slice.call(elements, 0);
  }

  return queryFocusable;
});