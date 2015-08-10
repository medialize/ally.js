
import detectFocus from './detect-focus';

// only Trident and Edge are able to focus a <label tabindex="-1">,
// as all other browsers seem hardwired to forward focus to the target input, if possible
export default detectFocus({
  name: 'can-focus-label-tabindex',
  element: 'label',
  mutate: function(element) {
    element.setAttribute('tabindex', '-1');
  },
});
