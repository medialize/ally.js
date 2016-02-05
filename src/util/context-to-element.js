
import nodeArray from '../util/node-array';

export default function({context, message, resolveDocument}) {
  let element = nodeArray(context)[0];

  if (resolveDocument && element && element.nodeType === Node.DOCUMENT_NODE) {
    element = element.documentElement;
  }

  if (!element) {
    throw new TypeError(message || 'context-to-element requires valid options.context');
  }

  return element;
}
