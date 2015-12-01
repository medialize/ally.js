
import detectFocus from './detect-focus';

// only Trident and Edge are able to focus a <label tabindex="-1">,
// as all other browsers seem hardwired to forward focus to the target input, if possible
export default detectFocus({
  name: 'can-focus-label-tabindex',
  element: 'label',
  mutate: function(element) {
    element.setAttribute('tabindex', '-1');
  },
  validate: function(element) {
    // force layout in Chrome 49, otherwise the element won't be focusable
    /* eslint-disable no-unused-vars */
    const variableToPreventDeadCodeElimination = element.offsetHeight;
    /* eslint-enable no-unused-vars */
    element.focus();
    return document.activeElement === element;
  },
});
