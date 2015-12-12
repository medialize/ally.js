
import detectFocus from './detect-focus';
import memorizeResult from './memorize-result';

export default memorizeResult(() => detectFocus({
  name: 'can-focus-summary',
  element: 'details',
  mutate: function(element) {
    element.innerHTML = '<summary>foo</summary><p>content</p>';
    return element.firstElementChild;
  },
}));
