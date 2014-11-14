define(function defineSupportsFocusTable(require) {
  'use strict';

  var detectFocus = require('./detect-focus');

  var canFocusFieldset = detectFocus('can-focus-fieldset', 'fieldset', function(element) {
    element.innerHTML = '<legend>legend</legend><p>content</p>';
  });

  return canFocusFieldset;
});