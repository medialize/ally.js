
// determine if an element supports.can be focused by script regardless
// of the element actually being focusable at the time of execution
// i.e. <input disabled> is conisdered focus-relevant, but not focusable

import rules from './focus-relevant.rules';

export default function(element) {
  if (element === document) {
    element = document.documentElement;
  }

  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/focus-relevant requires an argument of type Element');
  }

  return rules(element);
}
