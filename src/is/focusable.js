
// determine if an element can be focused

// http://www.w3.org/TR/html5/editing.html#focus-management

// NOTE: The following known issues exist:
//   Gecko: `svg a[xlink|href]` is not identified as focusable (because SVGElement.prototype.focus is missing)
//   Blink, WebKit: SVGElements that have been made focusable by adding a focus event listener are not identified as focusable

import isFocusRelevant from './focus-relevant';
import isVisible from './visible';
import isDisabled from './disabled';
import isOnlyTabbable from './only-tabbable';

export default function(element) {
  if (element === document) {
    element = document.documentElement;
  }

  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/focusable requires an argument of type Element');
  }

  if (!isFocusRelevant(element)) {
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
