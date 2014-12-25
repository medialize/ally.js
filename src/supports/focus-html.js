define(function defineSupportsFocusDocumentElement(/*require*/) {
  'use strict';

  var detectFocus = require('./detect-focus');

  var canFocusDocumentElement = detectFocus('can-focus-document-element', 'div', function(/*element*/) {
    return document.documentElement;
  });

  return canFocusDocumentElement;
});