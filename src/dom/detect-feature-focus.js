define(function defineDomDetectFeatureFocus(require) {
  'use strict';

  function detectFeatureFocus(nodeName, callback) {
    // create dummy element to test focusability of
    var element = document.createElement(nodeName);
    // allow callback to further specify dummy element
    callback && callback(element);
    // element needs to be part of the DOM to be focusable
    document.body.appendChild(element);
    // remember what had focus to restore after test
    var previousActiveElement = document.activeElement;
    // test if the element with invalid tabindex can be focused
    element.focus();
    var allowsFocus = document.activeElement === element;
    // restore focus to what it was before test and cleanup
    previousActiveElement.focus();
    document.body.removeChild(element);
    return allowsFocus;
  }

  return detectFeatureFocus;
});