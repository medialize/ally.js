define(function defineDomIsValidTabindex(require) {
  'use strict';

  // http://www.w3.org/TR/html5/infrastructure.html#rules-for-parsing-integers
  // NOTE: all browsers agree to allow trailing spaces as well
  var validIntegerPattern = /^\s*(-|\+)?[0-9]+\s*$/;

  // Firefox allows *any* value and treats invalid values like tabindex="-1"
  var allowsInvalidValue = (function testAllowsInvalidValue() {
    // create dummy element to test focusability of invalid tabindex values
    var element = document.createElement('div');
    element.setAttribute('tabindex', 'invalid-value');
    // element needs to be part of the DOM to be focusable
    document.body.appendChild(element);
    // remember what had focus to restore after test
    var previousActiveElement = document.activeElement;
    // test if the element with invalid tabindex can be focused
    element.focus();
    var allowsInvalidValue = document.activeElement === element;
    // restore focus to what it was before test and cleanup
    previousActiveElement.focus();
    document.body.removeChild(element);
    return allowsInvalidValue;
  })();

  function isValidTabindex(element) {
    // an element matches the tabindex selector even if its value is invalid
    var tabindex = element.getAttribute('tabindex');
    return allowsInvalidValue || !(tabindex !== null && (tabindex === '' || !validIntegerPattern.test(tabindex)));
  }

  return isValidTabindex;

});