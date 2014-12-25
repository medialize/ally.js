define(function defineDomQueryTabbable(require) {
  'use strict';

  // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  // http://www.w3.org/WAI/PF/aria-practices/#keyboard

  var queryFocusable = require('./query-focusable');
  var isTabbable = require('./is-tabbable');
  var sortTabindex = require('./sort-tabindex');

  function queryTabbable(context) {

    // TODO: [tabbing-order] filter out <area> and inject them where <img usemap> occurs (like trident does it)

    var elements = queryFocusable(context).filter(isTabbable);
    return sortTabindex(elements);
  }

  return queryTabbable;
});