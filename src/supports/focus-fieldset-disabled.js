
import detectFocus from './detect-focus';

// http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled
export default detectFocus({
  name: 'can-focus-disabled-fieldset',
  element: 'fieldset',
  mutate: function(element) {
    element.setAttribute('tabindex', 0);
    element.setAttribute('disabled', 'disabled');
  },
});
