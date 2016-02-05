
import '../prototype/svgelement.prototype.focus';
import detectFocus from './detect-focus';
import memorizeResult from './memorize-result';

export default memorizeResult(() => detectFocus({
  name: 'can-focus-svg-focusable-attribute',
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
      + '<text focusable="true">a</text></svg>';
    return element.querySelector('text');
  },
}));
