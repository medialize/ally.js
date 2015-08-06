
import detectFocus from './detect-focus';

// https://github.com/medialize/ally.js/issues/20
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-ismap
export default detectFocus({
  name: 'can-focus-img-ismap',
  element: 'a',
  mutate: function(element) {
    element.href = '#void';
    element.innerHTML = '<img ismap src="data:image/png;base64,broken-image-test" alt="">';
    return element.querySelector('img');
  },
});
