
// determine if an element is the child of a ShadowRoot

import getShadowHost from '../get/shadow-host';

export default function(element) {
  return Boolean(getShadowHost({context: element}));
}
