
// determine if an element is the child of a ShadowRoot

import contextToElement from '../util/context-to-element';
import getShadowHost from '../get/shadow-host';

export default function(context) {
  const element = contextToElement({
    label: 'is/shadowed',
    resolveDocument: true,
    context,
  });

  return Boolean(getShadowHost({context: element}));
}
