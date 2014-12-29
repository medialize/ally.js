define(function defineDomQueryTabbable(require) {
  'use strict';

  // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  // http://www.w3.org/WAI/PF/aria-practices/#keyboard

  var queryFocusable = require('./query-focusable');
  var isTabbable = require('./is-tabbable');

  function queryTabbable(context, includeContext) {
    return queryFocusable(context, includeContext).filter(isTabbable);
  }

  return queryTabbable;
});