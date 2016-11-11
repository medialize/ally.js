
import platform from '../util/platform';

export default {
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>';
    return element.firstChild;
  },
  validate: function(element, _document) {
    const focus = element.firstChild;
    if (platform.is.TRIDENT || platform.is.EDGE) {
      // Edge 13 does not allow polyfilling the missing SVGElement.prototype.focus anymore
      return true;
    }

    return _document.activeElement === focus;
  },
};
