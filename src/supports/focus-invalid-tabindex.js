
import detectFocus from './detect-focus';

// Firefox allows *any* value and treats invalid values like tabindex="-1"
var allowsInvalidValue = detectFocus('allows-invalid-tabindex-value', 'div', function(element) {
  element.setAttribute('tabindex', 'invalid-value');
});

export default allowsInvalidValue;
