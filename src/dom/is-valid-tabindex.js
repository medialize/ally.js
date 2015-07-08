
import allowsInvalidValue from '../supports/focus-invalid-tabindex';

// http://www.w3.org/TR/html5/infrastructure.html#rules-for-parsing-integers
// NOTE: all browsers agree to allow trailing spaces as well
var validIntegerPattern = /^\s*(-|\+)?[0-9]+\s*$/;

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

export default isValidTabindex;
