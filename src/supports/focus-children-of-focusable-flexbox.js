
import detectFocus from './detect-focus';

// Children of focusable elements with display:flex are focusable in IE10-11
export default detectFocus({
  name: 'can-focus-children-of-focusable-flexbox',
  element: 'div',
  mutate: function(element) {
    element.setAttribute('tabindex', '-1');
    element.setAttribute('style', 'display: -ms-flexbox; display: flex;');
    element.innerHTML = '<span style="display: block;">hello</span>';
    return element.querySelector('span');
  },
});
