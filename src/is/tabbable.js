
// determine if an element can be focused by keyboard (i.e. is part of the document's sequential focus navigation order)

import rules from './tabbable.rules';

export default function(element) {
  if (element === document) {
    element = document.documentElement;
  }

  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/tabbable requires an argument of type Element');
  }

  return rules(element);
}
