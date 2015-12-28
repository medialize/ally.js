
import detectFocus from './detect-focus';
import memorizeResult from './memorize-result';

export default memorizeResult(() => detectFocus({
  name: 'can-focus-redirect-legend',
  element: 'fieldset',
  mutate: function(element) {
    element.innerHTML = '<legend>legend</legend><input tabindex="-1"><input tabindex="0">';
  },
  validate: function(element) {
    const focus = element.querySelector('legend');
    const focusable = element.querySelector('input[tabindex="-1"]');
    const tabbable = element.querySelector('input[tabindex="0"]');

    focus.focus();
    return document.activeElement === focusable && 'focusable'
      || document.activeElement === tabbable && 'tabbable'
      || '';
  },
}));
