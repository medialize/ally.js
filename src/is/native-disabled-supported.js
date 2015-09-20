
// Determine if an element supports the disabled attribute

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

export default function(element) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/native-disabled-supported requires an argument of type Element');
  }

  const nodeName = element.nodeName.toLowerCase();
  return Boolean(disabledElementsPattern.test(nodeName));
}
