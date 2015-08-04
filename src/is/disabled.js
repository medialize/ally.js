
// Determine if an element is disabled (i.e. not editable)

import getParents from '../get/parents';
import canFocusDisabledFieldset from '../supports/focus-fieldset-disabled';

// http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled
let disabledElementsPattern = /^(input|select|textarea|button|fieldset)$/;

// fieldset[tabindex=0][disabled] should not be focusable, but Blink and WebKit disagree
// @specification http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled
// @browser-issue Chromium https://crbug.com/453847
// @browser-issue WebKit https://bugs.webkit.org/show_bug.cgi?id=141086
if (canFocusDisabledFieldset) {
  disabledElementsPattern = /^(input|select|textarea|button)$/;
}

function isDisabledFieldset(element) {
  const nodeName = element.nodeName.toLowerCase();
  return nodeName === 'fieldset' && element.disabled;
}

export default function(element) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/disabled requires an argument of type Element');
  }

  const nodeName = element.nodeName.toLowerCase();
  return Boolean(disabledElementsPattern.test(nodeName)
    && (element.disabled || getParents({context: element}).some(isDisabledFieldset)));
}
