define(function defineDomQueryTabbable(require) {
  'use strict';

  // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  // http://www.w3.org/WAI/PF/aria-practices/#keyboard

  var queryFocusable = require('./query-focusable');
  var sortTabindex = require('./sort-tabindex');

  // http://www.w3.org/WAI/PF/aria-practices/#focus_tabindex
  function positiveTabindex(element) {
    return element.tabIndex >= 0;
  };

  function queryTabbable(context) {
    var elements = queryFocusable(context).filter(positiveTabindex);
    return sortTabindex(elements);
  };

  return queryTabbable;
});