
import detectFocus from './detect-focus';
import memorizeResult from './memorize-result';

// elements with display:flex are focusable in IE10-11
export default memorizeResult(() => detectFocus({
  name: 'can-focus-flexbox-container',
  element: 'span',
  mutate: function(element) {
    element.setAttribute('style', 'display: -webkit-flex; display: -ms-flexbox; display: flex;');
    element.innerHTML = '<span style="display: block;">hello</span>';
  },
}));
