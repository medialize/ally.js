define(function defineSupportsFocusSvg(require) {
  'use strict';

  var detectFocus = require('./detect-focus');

  var canFocusSvg = SVGElement.prototype.focus && detectFocus('can-focus-svg', 'div', function(element) {
    element.innerHTML = '<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="100" height="100">'
      + '<text x="20" y="20">hello</text></svg>';
    return element.firstElementChild;
  });

  return canFocusSvg;
});