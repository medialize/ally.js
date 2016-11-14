
import {generate, validate} from './helper/svg';

export default {
  element: 'div',
  mutate: function(element) {
    element.innerHTML = generate([
      '<g id="ally-test-target"><a xlink:href="#void"><text>link</text></a></g>',
      '<use xlink:href="#ally-test-target" x="0" y="0" tabindex="-1" />',
    ].join(''));

    return element.querySelector('use');
  },
  validate,
};
