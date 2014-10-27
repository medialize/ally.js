define(function defineDomIsValidArea(require) {
  'use strict';

  require('CSS.escape');
  var isVisible = require('./is-visible');
  var path = require('./path');

  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
  // https://github.com/jquery/jquery-ui/blob/master/ui/core.js#L88-L107
  function isValidArea(element) {
    var nodeName = element.nodeName.toLowerCase();
    if (nodeName !== 'area') {
      return true;
    }

    var map = element.parentElement;

    // an <area> matches the area[href] selector even if it is not applicable
    if (!map.name || !element.href || map.nodeName.toLowerCase() !== 'map') {
      return false;
    }

    var img = document.querySelector('img[usemap="#' + CSS.escape(map.name) + '"]');
    if (!img || !isVisible(img)) {
      return false;
    }

    var childOfInteractive = path(img).slice(1).some(function(element) {
      var name = element.nodeName.toLowerCase();
      return name === 'button' || name === 'a';
    });

    if (childOfInteractive) {
      return false;
    }

    return true;
  }

  return isValidArea;
});