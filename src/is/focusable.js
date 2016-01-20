
// determine if an element can be focused

import rules from './focusable.rules';

export default function(element) {
  if (element === document) {
    element = document.documentElement;
  }

  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/focusable requires an argument of type Element');
  }

  return rules(element);
}
