
// determine if an element can be focused

// http://www.w3.org/TR/html5/editing.html#focus-management

// NOTE: The following known issues exist:
//   Trident: `a > img[ismap]` is not identified as focusable
//   Trident: `table tr{visibility:collapse} td a{visibility:visible}` is not identified as focusable (because !element.offsetHeight)
//   Gecko: `svg a[xlink|href]` is not identified as focusable (because SVGElement.prototype.focus is missing)
//   Blink, WebKit: SVGElements that have been made focusable by adding a focus event listener are not identified as focusable
//   ShadowDOM is ignored completely

import '../prototype/element.prototype.matches';
import selector from '../selector/focusable';
import isVisible from './visible';
import isDisabled from './disabled';
import isValidTabindex from './valid-tabindex';
import isValidArea from './valid-area';

export default function(element) {
  var focusable = selector;
  var nodeName = element.nodeName.toLowerCase();

  // input[type="hidden"] cannot be focused
  if (nodeName === 'input' && element.type === 'hidden') {
    return false;
  }

  // object[usemap] is not focusable in any browser
  if (nodeName === 'object' && element.hasAttribute('usemap')) {
    return false;
  }

  if (!isValidArea(element)) {
    return false;
  }

  if (isDisabled(element)) {
    return false;
  }

  // elements that are not rendered, cannot be focused
  if (!isVisible(element)) {
    return false;
  }

  // NOTE: elements marked as inert are not focusable,
  // but I have no idea what would make an element inert
  // http://www.w3.org/TR/html5/editing.html#inert

  // for invalid tabindex values, simply ignore the tabindex,
  // that means that any "naturally" focusable elements still return true.
  // That's the behavior encountered in browsers and supported by the vague specificiation quote:
  //   The user agent should follow platform conventions to determine if the element's tabindex focus
  //   flag is set and, if so, whether the element can be reached using sequential focus navigation,
  //   and if so, what its relative order should be.
  //   - http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  if (!isValidTabindex(element)) {
    focusable = focusable.replace('[tabindex],', '');
  }

  return element.matches(focusable);
}
