define(function defineSupportsFocusSummary(require) {
  'use strict';

  var detectFocus = require('./detect-focus');

  var canFocusSummary = detectFocus('can-focus-summary', 'details', function(element) {
    element.innerHTML = '<summary>foo</summary><p>content</p>';
    return element.firstElementChild
  });

  return canFocusSummary;
});