
// Children of focusable elements with display:flex are focusable in IE10-11
export default {
  element: 'div',
  mutate: function(element) {
    element.setAttribute('tabindex', '-1');
    element.setAttribute('style', 'display: -webkit-flex; display: -ms-flexbox; display: flex;');
    element.innerHTML = '<span style="display: block;">hello</span>';
    return element.querySelector('span');
  },
};
