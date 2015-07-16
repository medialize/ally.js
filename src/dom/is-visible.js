
import 'array.prototype.findindex';
import getParents from '../get/parents';

// http://www.w3.org/TR/html5/rendering.html#being-rendered
// <area> is not rendered
var notRenderedElementsPattern = /^(area)$/;
// <audio src="#unknown"> has no height in Firefox but is focusable
// <object> may have no dimension but is still focusable
var notDimensionBoundElementsPattern = /^(audio|object)$/;

function computedStyle(element, property) {
  return window.getComputedStyle(element, null)
    .getPropertyValue(property);
}

function notDisplayed(_path) {
  return _path.some(function(element) {
    // display:none is not visible (optimized away at layout)
    return computedStyle(element, 'display') === 'none';
  });
}

function notVisible(_path) {
  // https://github.com/jquery/jquery-ui/blob/master/ui/core.js#L109-L114
  // NOTE: a nested element can reverse visibility:hidden|collapse by explicitly setting visibility:visible
  // NOTE: visibility can be ["", "visible", "hidden", "collapse"]
  var hidden = _path.findIndex(function(element) {
    var visibility = computedStyle(element, 'visibility');
    return visibility === 'hidden' || visibility === 'collapse';
  });

  if (hidden === -1) {
    // there is no hidden element
    return false;
  }

  var visible = _path.findIndex(function(element) {
    return computedStyle(element, 'visibility') === 'visible';
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

function noDimension(element) {
  var nodeName = element.nodeName.toLowerCase();
  if (notDimensionBoundElementsPattern.test(nodeName)) {
    return false;
  }

  // an <a> in <svg> does not necessarily have intrinsic dimensions, but its focusable anyways
  if (element.ownerSVGElement && nodeName === 'a') {
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
  var nodeName = element.nodeName.toLowerCase();
  if (notRenderedElementsPattern.test(nodeName)) {
    return true;
  }

  var _path = getParents({context: element});
  return !Boolean(notDisplayed(_path) || notVisible(_path) || noDimension(element));
}

export default isVisible;
