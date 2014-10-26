define(function defineDomMatches(require) {
  'use strict';

  var _matchesMethodName = null;
  var div = document.createElement('div');
  'matches webkitMatchesSelector mozMatchesSelector msMatchesSelector'.split(' ').some(function(key) {
    if (!div[key]) {
      return false;
    }

    _matchesMethodName = key;
    return true;
  });

  // https://developer.mozilla.org/en-US/docs/Web/API/Element.matches#Polyfill
  function matchesSelector(selector) {
    var element = this;
    var matches = (element.document || element.ownerDocument).querySelectorAll(selector);
    var i = 0;

    while (matches[i] && matches[i] !== element) {
      i++;
    }

    return matches[i] ? true : false;
  }

  function matches(element, selector) {
    if (_matchesMethodName) {
      return element[_matchesMethodName](selector);
    } else {
      return matchesSelector.call(element, selector);
    }
  }

  return matches;
});