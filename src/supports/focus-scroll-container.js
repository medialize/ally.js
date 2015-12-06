
import detectFocus from './detect-focus';
import memorizeResult from './memorize-result';

// https://github.com/medialize/ally.js/issues/21
export default memorizeResult(() => detectFocus({
  name: 'can-focus-scroll-container',
  element: 'div',
  mutate: function(element) {
    element.setAttribute('style', 'width: 100px; height: 50px; overflow: auto;');
    element.innerHTML = '<div style="width: 500px; height: 40px;">scrollable content</div>';
  },
}));
