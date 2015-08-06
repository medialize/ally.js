
import detectFocus from './detect-focus';

// https://github.com/medialize/ally.js/issues/21
export default detectFocus({
  name: 'can-focus-scroll-container-without-overflow',
  element: 'div',
  mutate: function(element) {
    element.setAttribute('style', 'width: 100px; height: 50px;');
    element.innerHTML = '<div style="width: 500px; height: 40px;">scrollable content</div>';
  },
});
