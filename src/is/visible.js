
// determine if an element is rendered
// NOTE: that does not mean an element is visible in the viewport, see util/visible-area

import findIndex from '../util/array-find-index';
import getParents from '../get/parents';
import contextToElement from '../util/context-to-element';
import getFrameElement from '../util/get-frame-element';

// https://www.w3.org/TR/html5/rendering.html#being-rendered
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
  const hidden = findIndex(_path, function(element) {
    const visibility = computedStyle(element, 'visibility');
    return visibility === 'hidden' || visibility === 'collapse';
  });

  if (hidden === -1) {
    // there is no hidden element
    return false;
  }

  const visible = findIndex(_path, function(element) {
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

function collapsedParent(_path) {
  let offset = 1;
  if (_path[0].nodeName.toLowerCase() === 'summary') {
    offset = 2;
  }

  return _path.slice(offset).some(function(element) {
    // "content children" of a closed details element are not visible
    return element.nodeName.toLowerCase() === 'details' && element.open === false;
  });
}

function isVisibleRules({
  context,
  except = {
    notRendered: false,
    cssDisplay: false,
    cssVisibility: false,
    detailsElement: false,
    browsingContext: false,
  },
} = {}) {
  const element = contextToElement({
    label: 'is/visible',
    resolveDocument: true,
    context,
  });

  const nodeName = element.nodeName.toLowerCase();
  if (!except.notRendered && notRenderedElementsPattern.test(nodeName)) {
    return true;
  }

  const _path = getParents({context: element});

  // in Internet Explorer <audio> has a default display: none, where others have display: inline
  // but IE allows focusing <audio style="display:none">, but not <div display:none><audio>
  // this is irrelevant to other browsers, as the controls attribute is required to make <audio> focusable
  const isAudioWithoutControls = nodeName === 'audio' && !element.hasAttribute('controls');
  if (!except.cssDisplay && notDisplayed(isAudioWithoutControls ? _path.slice(1) : _path)) {
    return false;
  }

  if (!except.cssVisibility && notVisible(_path)) {
    return false;
  }

  if (!except.detailsElement && collapsedParent(_path)) {
    return false;
  }

  if (!except.browsingContext) {
    // elements within a browsing context are affected by the
    // browsing context host element's visibility and tabindex
    const frameElement = getFrameElement(element);
    const _isVisible = isVisibleRules.except(except);
    if (frameElement && !_isVisible(frameElement)) {
      return false;
    }
  }

  return true;
}

// bind exceptions to an iterator callback
isVisibleRules.except = function(except = {}) {
  const isVisible = function(context) {
    return isVisibleRules({
      context,
      except,
    });
  };

  isVisible.rules = isVisibleRules;
  return isVisible;
};

// provide isVisible(context) as default iterator callback
const isVisible = isVisibleRules.except({});
export default isVisible;
