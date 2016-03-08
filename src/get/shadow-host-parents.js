
import getShadowHost from './shadow-host';
import contextToElement from '../util/context-to-element';

export default function({context} = {}) {
  const list = [];
  let element = contextToElement({
    label: 'get/shadow-host-parents',
    context,
  });

  while (element) {
    element = getShadowHost({context: element});
    if (!element) {
      break;
    }

    list.push(element);
  }

  return list;
}
