
// Determines if an element is the activeElement within its context, i.e. its document iFrame or ShadowHost

import contextToElement from '../util/context-to-element';
import getShadowHost from '../get/shadow-host';
import getDocument from '../util/get-document';

export default function(context) {
  const element = contextToElement({
    label: 'is/active-element',
    resolveDocument: true,
    context,
  });

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
