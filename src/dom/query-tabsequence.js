define(function defineDomQueryTabbable(require) {
  'use strict';

  // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  // http://www.w3.org/WAI/PF/aria-practices/#keyboard

  var queryTabbable = require('./query-tabbable');
  var sortTabindex = require('./sort-tabindex');

  function moveContextToBeginning(elements, context) {
    var pos = elements.indexOf(context);
    if (pos > 0) {
      var tmp = elements.splice(pos, 1);
      return tmp.concat(elements);
    }

    return elements;
  }

  function queryTabsequence(context, includeContext) {
    var elements = queryTabbable(context, includeContext);
    elements = sortTabindex(elements);

    if (includeContext) {
      // if we include the context itself, it has to be the first
      // element of the sequence
      elements = moveContextToBeginning(elements, context);
    }

    return elements;
  }

  return queryTabsequence;
});