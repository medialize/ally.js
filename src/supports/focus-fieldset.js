
import detectFocus from './detect-focus';

var canFocusFieldset = detectFocus('can-focus-fieldset', 'fieldset', function(element) {
  element.innerHTML = '<legend>legend</legend><p>content</p>';
});

export default canFocusFieldset;
