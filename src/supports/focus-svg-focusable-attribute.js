
import {generate, validate} from './helper/svg';

export default {
  element: 'div',
  mutate: function(element) {
    element.innerHTML = generate('<text focusable="true">a</text>');
    return element.querySelector('text');
  },
  validate,
};
