
import getShadowHost from './shadow-host';
import contextToElement from '../util/context-to-element';

export default function({context}) {
  const list = [];
  let element = contextToElement({
    message: 'get/shadow-host-parents requires valid options.context',
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
