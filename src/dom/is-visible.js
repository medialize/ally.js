define(function defineDomIsVisible(require) {
  'use strict';

  require('array.prototype.findindex');
  var path = require('./path');

  function notDisplayed(_path) {
    return _path.some(function(element) {
      // display:none is not visible (optimized away at layout)
      return element.style.display === 'none';
    });
  }

  function notVisible(_path) {
    // https://github.com/jquery/jquery-ui/blob/master/ui/core.js#L109-L114
    // NOTE: a nested element can reverse visibility:hidden|collapse by explicitly setting visibility:visible
    // NOTE: visibility can be ["", "visible", "hidden", "collapse"]
    var hidden = _path.findIndex(function(element) {
      var visibility = element.style.visibility;
      return visibility === 'hidden' || visibility === 'collapse';
    });

    if (hidden === -1) {
      // there is no hidden element
      return false;
    }

    var visible = _path.findIndex(function(element) {
      return element.style.visibility === 'visible';
    });

    if (visible === -1) {
      // there is no visible element (but a hidden element)
      return true;
    }

    if (hidden < visible) {
      // there is a hidden element and it's closer than the first visible element
      return true;
    }

    // there may be a hidden element, but the closest element is visible
    return false;
  }

  // <audio src="#unknown"> has no height in Firefox but is focusable
  // <area> is not rendered
  // <object> may have no dimension but is still focusable
  var notRenderedElementsPattern = /^(area|audio|object)$/;

  function noDimension(element) {
    var nodeName = element.nodeName.toLowerCase();
    if (notRenderedElementsPattern.test(nodeName)) {
      return false;
    }

    // [contenteditable]:empty has no height in Firefox
    var emptyContenteditableFirefoxBug = element.hasAttribute('contenteditable') && element.childNodes.length === 0;
    var _minHeight;
    if (emptyContenteditableFirefoxBug) {
      _minHeight = element.style.minHeight;
      element.style.minHeight = '10px';
    }

    // https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js#L6-L15
    var result = element.offsetWidth <= 0 || element.offsetHeight <= 0;

    if (emptyContenteditableFirefoxBug) {
      element.style.minHeight = _minHeight;
    }

    return result;
  }

  function isVisible(element) {
    var _path = path(element);
    return !Boolean(notDisplayed(_path) || notVisible(_path) || noDimension(element));
  }

  return isVisible;
});