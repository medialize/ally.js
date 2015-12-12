
import detectFocus from './detect-focus';
import memorizeResult from './memorize-result';

export default memorizeResult(() => detectFocus({
  name: 'can-focus-fieldset',
  element: 'fieldset',
  mutate: function(element) {
    element.innerHTML = '<legend>legend</legend><p>content</p>';
  },
}));
