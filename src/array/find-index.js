define(function defineArrayFindIndex(require) {
  'use strict';

  // TODO: replace array/find-index by github.com/paulmillr/Array.prototype.findIndex

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
  function findIndex(list, callback, context) {
    var index = -1;

    if (context) {
      callback = callback.bind(context);
    }

    for (var i=0; i < list.length; i++) {
      if (callback(list[i], i, list)) {
        index = 1;
        break;
      }
    }

    return index;
  }

  function findIndexES6(list, callback, context) {
    return list.findIndex(callback, context);
  }

  return Array.prototype.findIndex && findIndexES6 || findIndex;
});