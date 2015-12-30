
// determine if an element can be focused

// http://www.w3.org/TR/html5/editing.html#focus-management

// NOTE: The following known issues exist:
//   Gecko: `svg a[xlink|href]` is not identified as focusable (because SVGElement.prototype.focus is missing)
//   Blink, WebKit: SVGElements that have been made focusable by adding a focus event listener are not identified as focusable

import isFocusRelevant from './focus-relevant';
import isVisible from './visible';
import isDisabled from './disabled';
import isOnlyTabbable from './only-tabbable';
import tabindexValue from '../util/tabindex-value';

function isOnlyFocusRelevant(element) {
  const nodeName = element.nodeName.toLowerCase();
  if (nodeName === 'embed' || nodeName === 'keygen') {
    // embed is considered focus-relevant but not focusable
    // see https://github.com/medialize/ally.js/issues/82
    return true;
  }

  const _tabindex = tabindexValue(element);
  if (element.shadowRoot && _tabindex === null) {
    // Shadow DOM host elements *may* receive focus
    // even though they are not considered focuable
    return true;
  }

  return false;
}

export default function(element) {
  if (element === document) {
    element = document.documentElement;
  }

  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/focusable requires an argument of type Element');
  }

  if (!isFocusRelevant(element) || isOnlyFocusRelevant(element)) {
    return false;
  }

  if (isDisabled(element)) {
    return false;
  }

  if (isOnlyTabbable(element)) {
    // some elements may be keyboard focusable, but not script focusable
    return false;
  }

  // elements that are not rendered, cannot be focused
  if (!isVisible(element)) {
    return false;
  }

  return true;
}
