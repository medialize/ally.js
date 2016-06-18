
import gif from './media/gif';

// NOTE: https://github.com/medialize/ally.js/issues/35
// fixes https://github.com/medialize/ally.js/issues/20
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-ismap
export default {
  element: 'a',
  mutate: function(element) {
    element.href = '#void';
    element.innerHTML = '<img ismap src="' + gif + '" alt="">';
    return element.querySelector('img');
  },
};
