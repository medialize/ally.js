define(function defineDomQueryFocusable(require) {
  'use strict';

  // TODO: verify focusable defined by http://www.w3.org/TR/html5/editing.html#focusable

  // http://www.w3.org/TR/html5/editing.html#focusable
  // http://www.w3.org/WAI/PF/aria-practices/#keyboard

  var selector = require('../map/selector');
  var isFocusable = require('../dom/is-focusable');

  function queryFocusable(context) {
    var elements = context.querySelectorAll(selector.focusable);
    // the selector potentially matches more than really is focusable
    return [].filter.call(elements, isFocusable);
  }

  return queryFocusable;
});