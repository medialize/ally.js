define(function defineSupportsFocusTable(require) {
  'use strict';

  var detectFocus = require('./detect-focus');

  var canFocusTable = detectFocus('fieldset', function(element) {
    element.innerHTML = '<legend>legend</legend><p>content</p>';
  });

  return canFocusTable;
});