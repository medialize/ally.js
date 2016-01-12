
// Determine if an element supports the disabled attribute

import _supports from './native-disabled-supported.supports';
let supports;

// http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled
let disabledElementsPattern;
const disabledElements = {
  input: true,
  select: true,
  textarea: true,
  button: true,
  fieldset: true,
  form: true,
};

export default function(element) {
  if (!supports) {
    supports = _supports();

    if (supports.canFocusDisabledFieldset) {
      delete disabledElements.fieldset;
    }

    if (supports.canFocusDisabledForm) {
      delete disabledElements.form;
    }

    disabledElementsPattern = new RegExp('^(' + Object.keys(disabledElements).join('|') + ')$');
  }

  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/native-disabled-supported requires an argument of type Element');
  }

  const nodeName = element.nodeName.toLowerCase();
  return Boolean(disabledElementsPattern.test(nodeName));
}
