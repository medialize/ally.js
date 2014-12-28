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

    // TODO: [tabbing-order] in Firefox and IE filter out <area>s and inject them where the associated <img usemap> occurs in DOM sequence
    // TODO: figure out what impact shadow dom has with ::shadow [tabindex="123"]

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