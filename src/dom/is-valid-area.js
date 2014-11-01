define(function defineDomIsValidArea(require) {
  'use strict';

  require('CSS.escape');
  var isVisible = require('./is-visible');
  var path = require('./path');
  var detectFeatureFocus = require('./detect-feature-focus');

  var canFocusBrokenImageMaps = detectFeatureFocus('div', function(element) {
    element.innerHTML = '<map name="broken-image-map-test"><area href="#void" shape="rect" coords="63,19,144,45"></map>'
      + '<img usemap="#broken-image-map-test" alt="" src="data:image/png;base64,broken-image-test">';
      return element.querySelector('area');
  });

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

    // HTML5 specifies HTMLMapElement.images to be an HTMLCollection of all
    // <img> and <object> referencing the <map> element, but no browser implements this
    //   http://www.w3.org/TR/html5/embedded-content-0.html#the-map-element
    //   https://developer.mozilla.org/en-US/docs/Web/API/HTMLMapElement
    var img = document.querySelector('img[usemap="#' + CSS.escape(map.name) + '"]');
    if (!img || !isVisible(img)) {
      return false;
    }

    // Firefox only allows fully loaded images to reference image maps
    // https://stereochro.me/ideas/detecting-broken-images-js
    if (!canFocusBrokenImageMaps && (!img.complete || !img.naturalHeight)) {
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