define(function defineSupportsFocusSvg(require) {
  'use strict';

  var detectFocus = require('./detect-focus');

  var canFocusHtml = detectFocus('div', function(element) {
    return document.documentElement;
  });

  return canFocusHtml;
});