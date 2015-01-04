/*jshint unused:vars */
define(function defineDomPath(require) {
  'use strict';

  // [elem, elem.parent, elem.parent.parent, …, html]
  // will not contain the shadowRoot (DOCUMENT_FRAGMENT_NODE) and shadowHost
  function path(element) {
    var _path = [];
    while (element) {
      _path.push(element);
      element = element.parentElement;
    }
    return _path;
  }

  return path;
});