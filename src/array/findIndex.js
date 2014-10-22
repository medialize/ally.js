define(function defineArrayFindIndex(require) {
  'use strict';

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
  function findIndex(list, callback, context) {
    if (context) {
      callback = callback.bind(context);
    }

    var position = list.reduce(function(previous, element, index, array) {
      return previous === null && callback(element, index, array) ? index : previous;
    }, null);

    return position === null ? -1 : position;
  }

  function findIndexES6(list, callback, context) {
    return list.findIndex(callback, context);
  }

  return Array.prototype.findIndex && findIndexES6 || findIndex;
});