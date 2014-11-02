define(function defineDomQueryTabbable(require) {
  'use strict';

  // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  // http://www.w3.org/WAI/PF/aria-practices/#keyboard

  var queryFocusable = require('./query-focusable');
  var isTabbable = require('./is-tabbable');
  var sortTabindex = require('./sort-tabindex');

  function queryTabbable(context) {
    var elements = queryFocusable(context).filter(isTabbable);
    return sortTabindex(elements);
  };

  return queryTabbable;
});