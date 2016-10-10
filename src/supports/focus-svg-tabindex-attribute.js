
import {generate, validate} from './helper/svg';

export default {
  element: 'div',
  mutate: function(element) {
    element.innerHTML = generate('<text tabindex="0">a</text>');
    return element.querySelector('text');
  },
  validate,
};
