define(function defineSupportsFocusTable(require) {
  'use strict';

  var detectFocus = require('./detect-focus');

  var canFocusTable = detectFocus('table', function(element) {
    element.innerHTML = '<tr><td>cell</td></tr>';
  });

  return canFocusTable;
});