
import detectFocus from './detect-focus';

export default SVGElement.prototype.focus && detectFocus({
  name: 'can-focus-svg',
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<svg width="100" height="100"'
      + ' xmlns:xlink="http://www.w3.org/1999/xlink"'
      + ' xmlns="http://www.w3.org/2000/svg">'
      + '<text x="20" y="20">hello</text></svg>';

    return element.firstElementChild;
  },
});
