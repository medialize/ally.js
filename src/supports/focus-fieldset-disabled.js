
import detectFocus from './detect-focus';

// http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled
var canFocusDisabledFieldset = detectFocus('can-focus-disabled-fieldset', 'fieldset', function(element) {
  element.setAttribute('tabindex', 0);
  element.setAttribute('disabled', 'disabled');
});

export default canFocusDisabledFieldset;
