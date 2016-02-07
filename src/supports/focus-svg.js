
import detectFocus from './detect-focus';
import memorizeResult from './memorize-result';
import platform from '../util/platform';

export default memorizeResult(() => detectFocus({
  name: 'can-focus-svg',
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>';
    return element.firstChild;
  },
  validate: function(element) {
    const focus = element.firstChild;
    if (platform.is.TRIDENT && (!focus.focus || focus.focus._polyfill === 'noop')) {
      // Edge 13 does not allow polyfilling the missing SVGElement.prototype.focus anymore
      return true;
    }

    return document.activeElement === focus;
  },
}));
