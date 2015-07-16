
import getParents from '../get/parents';
import canFocusDisabledFieldset from '../supports/focus-fieldset-disabled';

// http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled
var disabledElementsPattern = /^(input|select|textarea|button|fieldset)$/;

// fieldset[tabindex=0][disabled] should not be focusable, but Blink and WebKit disagree
if (canFocusDisabledFieldset) {
  disabledElementsPattern = /^(input|select|textarea|button)$/;
}

function isDisabledFieldset(element) {
  var nodeName = element.nodeName.toLowerCase();
  return nodeName === 'fieldset' && element.disabled;
}

function isDisabled(element) {
  var nodeName = element.nodeName.toLowerCase();
  return disabledElementsPattern.test(nodeName)
    && (element.disabled || getParents({context: element}).some(isDisabledFieldset));
}

export default isDisabled;
