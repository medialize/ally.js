
// Determine if an element is disabled (i.e. not editable)

import contextToElement from '../util/context-to-element';
import getParents from '../get/parents';
import isNativeDisabledSupported from './native-disabled-supported';

import _supports from '../supports/supports';
let supports;

function isDisabledFieldset(element) {
  const nodeName = element.nodeName.toLowerCase();
  return nodeName === 'fieldset' && element.disabled;
}

function isDisabledForm(element) {
  const nodeName = element.nodeName.toLowerCase();
  return nodeName === 'form' && element.disabled;
}

export default function(context) {
  if (!supports) {
    supports = _supports();
  }

  const element = contextToElement({
    label: 'is/disabled',
    context,
  });

  if (element.hasAttribute('data-ally-disabled')) {
    // treat ally's element/disabled like the DOM native element.disabled
    return true;
  }

  if (!isNativeDisabledSupported(element)) {
    // non-form elements do not support the disabled attribute
    return false;
  }

  if (element.disabled) {
    // the element itself is disabled
    return true;
  }

  const parents = getParents({context: element});
  if (parents.some(isDisabledFieldset)) {
    // a parental <fieldset> is disabld and inherits the state onto this element
    return true;
  }

  if (!supports.focusFormDisabled && parents.some(isDisabledForm)) {
    // a parental <form> is disabld and inherits the state onto this element
    return true;
  }

  return false;
}
