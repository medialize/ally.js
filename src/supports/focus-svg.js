
import detectFocus from './detect-focus';

var canFocusSvg = SVGElement.prototype.focus && detectFocus('can-focus-svg', 'div', function(element) {
  /*jshint laxbreak: true */
  element.innerHTML = '<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="100" height="100">'
    + '<text x="20" y="20">hello</text></svg>';
  /*jshint laxbreak: false */
  return element.firstElementChild;
});

export default canFocusSvg;
