define(function defineDomShadowHostAncestors(require) {
  'use strict';

  var shadowHost = require('./shadow-host');

  function shadowHostAncestors(element) {
    var list = [];
    while (element) {
      element = shadowHost(element);
      if (!element) {
        break;
      }

      list.push(element);
    }

    return list;
  }

  return shadowHostAncestors;
});