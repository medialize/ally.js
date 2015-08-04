
// determine if an element is rendered
// NOTE: that does not mean an element is visible in the viewport, see util/visible-area

import 'array.prototype.findindex';
import getParents from '../get/parents';

// http://www.w3.org/TR/html5/rendering.html#being-rendered
// <area> is not rendered, but we *consider* it visible to simplfiy this function's usage
const notRenderedElementsPattern = /^(area)$/;

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
  const hidden = _path.findIndex(function(element) {
    const visibility = computedStyle(element, 'visibility');
    return visibility === 'hidden' || visibility === 'collapse';
  });

  if (hidden === -1) {
    // there is no hidden element
    return false;
  }

  const visible = _path.findIndex(function(element) {
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

export default function(element) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/visible requires an argument of type Element');
  }

  const nodeName = element.nodeName.toLowerCase();
  if (notRenderedElementsPattern.test(nodeName)) {
    return true;
  }

  const _path = getParents({context: element});
  return !Boolean(notDisplayed(_path) || notVisible(_path));
}
