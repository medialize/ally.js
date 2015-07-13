
import detectFocus from './detect-focus';

export default detectFocus({
  name: 'can-focus-summary',
  element: 'details',
  mutate: function(element) {
    element.innerHTML = '<summary>foo</summary><p>content</p>';
    return element.firstElementChild;
  },
});
