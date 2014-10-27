define(function defineDomIsValidTabindex(require) {
  'use strict';

  // http://www.w3.org/TR/html5/infrastructure.html#rules-for-parsing-integers
  // NOTE: all browsers agree to allow trailing spaces as well
  var validIntegerPattern = /^\s*(-|\+)?[0-9]+\s*$/;

  function testTabindexValueSupport(value) {
    // create dummy element to test focusability of given tabindex value
    var element = document.createElement('div');
    element.setAttribute('tabindex', value);
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
  }

  // Firefox allows *any* value and treats invalid values like tabindex="-1"
  var allowsInvalidValue = testTabindexValueSupport('invalid-value');

  function isValidTabindex(element) {
    if (!element.hasAttribute('tabindex') || allowsInvalidValue) {
      return true;
    }
    // an element matches the tabindex selector even if its value is invalid
    var tabindex = element.getAttribute('tabindex');
    // IE11 parses tabindex="" as the value "-32768"
    if (tabindex === '-32768') {
      return false;
    }

    return Boolean(tabindex && validIntegerPattern.test(tabindex));
  }

  return isValidTabindex;
});