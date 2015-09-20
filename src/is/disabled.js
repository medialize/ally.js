
// Determine if an element is disabled (i.e. not editable)

import getParents from '../get/parents';
import isNativeDisabledSupported from './native-disabled-supported';

function isDisabledFieldset(element) {
  const nodeName = element.nodeName.toLowerCase();
  return nodeName === 'fieldset' && element.disabled;
}

export default function(element) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/disabled requires an argument of type Element');
  }

  if (!isNativeDisabledSupported(element)) {
    // non-form elements do not support the disabled attribute
    return false;
  }

  if (element.disabled) {
    // the element itself is disabled
    return true;
  }

  if (getParents({context: element}).some(isDisabledFieldset)) {
    // a parental <fieldset> is disabld and inherits the state onto this element
    return true;
  }

  return false;
}
