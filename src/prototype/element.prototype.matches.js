define(function definePrototypeElementPrototypeMatches(/*require*/) {
  'use strict';

  // Element.prototype.matches may not be available under that name

  if (Element.prototype.matches) {
    // great, browser already supports matches()
    return;
  }

  var prefixed = 'webkitMatchesSelector mozMatchesSelector msMatchesSelector'.split(' ').some(function(key) {
    if (!Element.prototype[key]) {
      return false;
    }

    Element.prototype.matches = Element.prototype[key];
    return true;
  });

  if (prefixed) {
    // ok, browser supports matches() under a different name
    return;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Element.matches#Polyfill
  Element.prototype.matches = function matchesSelectorPolyfill(selector) {
    var element = this;
    var matches = (element.document || element.ownerDocument).querySelectorAll(selector);
    var i = 0;

    while (matches[i] && matches[i] !== element) {
      i++;
    }

    return matches[i] ? true : false;
  };
});