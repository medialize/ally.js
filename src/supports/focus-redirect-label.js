
import detectFocus from './detect-focus';
import memorizeResult from './memorize-result';

export default memorizeResult(() => detectFocus({
  name: 'can-focus-redirect-label',
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<label for="focus-redirect-label">label</label><input id="focus-redirect-label">';
  },
  validate: function(element) {
    const focus = element.querySelector('label');
    const target = element.querySelector('input');

    focus.focus();
    return document.activeElement === target;
  },
}));
