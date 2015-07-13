
import detectFocus from './detect-focus';

// Firefox allows *any* value and treats invalid values like tabindex="-1"
export default detectFocus({
  name: 'allows-invalid-tabindex-value',
  element: 'div',
  mutate: function(element) {
    element.setAttribute('tabindex', 'invalid-value');
  },
});
