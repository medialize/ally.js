
import detectFocus from './detect-focus';

export default detectFocus({
  name: 'can-focus-fieldset',
  element: 'fieldset',
  mutate: function(element) {
    element.innerHTML = '<legend>legend</legend><p>content</p>';
  },
});
