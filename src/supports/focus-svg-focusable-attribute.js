
import platform from '../util/platform';

export default {
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<svg xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink">'
      + '<text focusable="true">a</text></svg>';
    return element.querySelector('text');
  },
  validate: function(element, _document) {
    const focus = element.querySelector('text');
    if (platform.is.TRIDENT) {
      // Edge 13 does not allow polyfilling the missing SVGElement.prototype.focus anymore
      return true;
    }

    return _document.activeElement === focus;
  },
};
