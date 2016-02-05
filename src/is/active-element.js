
// Determines if an element is the activeElement within its context, i.e. its document iFrame or ShadowHost

import getShadowHost from '../get/shadow-host';
import getDocument from '../util/get-document';

export default function(element) {
  if (element === document) {
    element = document.documentElement;
  }

  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/active-element requires an argument of type Element');
  }

  const _document = getDocument(element);
  if (_document.activeElement === element) {
    return true;
  }

  const shadowHost = getShadowHost({ context: element });
  if (shadowHost && shadowHost.shadowRoot.activeElement === element) {
    return true;
  }

  return false;
}
