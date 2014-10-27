define(function defineDomIsDisabled(require) {
  'use strict';

  // http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled
  var disabledElementsPattern = /^(input|select|textarea|button|fieldset)$/;

  var canFocusDisabledFieldset = (function() {
    // create dummy element to test focusability disabled fieldset
    var element = document.createElement('fieldset');
    element.setAttribute('tabindex', 0);
    element.setAttribute('disabled', 'disabled');
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
  })();

  // fieldset[tabindex=0][disabled] should not be focusable, but Blink and WebKit disagree
  if (canFocusDisabledFieldset) {
    disabledElementsPattern = /^(input|select|textarea|button)$/;
  }

  function isDisabled(element) {
    var nodeName = element.nodeName.toLowerCase();
    if (element.disabled && disabledElementsPattern.test(nodeName)) {
      return false;
    }
  }

  return isDisabled;
});