
import {generate, validate} from './helper/svg';

export default {
  element: 'div',
  mutate: function(element) {
    element.innerHTML = generate('');
    return element.firstChild;
  },
  validate,
};
