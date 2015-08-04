
// determine if an element is the child of a ShadowRoot

import getShadowHost from '../get/shadow-host';

export default function(element) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/shadowed requires an argument of type Element');
  }

  return Boolean(getShadowHost({context: element}));
}
