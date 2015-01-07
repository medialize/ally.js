define(function defineDomFocusTarget(require) {
  'use strict';

  /*
    Identify the first focusable element in the element's ancestry, including itself
   */

  require('array.prototype.findindex');
  var path = require('../dom/path');
  var isFocusable = require('../dom/is-focusable');

  function focusTarget(element) {
    // trivial ejection check
    if (isFocusable(element)) {
      return element;
    }

    // obtain the element's ancestry
    var _path = path(element).slice(1);
    // find the first element that is actually focusable
    var _firstFocusableIndex = _path.findIndex(isFocusable);
    return _path[_firstFocusableIndex] || null;
  }

  return focusTarget;
});