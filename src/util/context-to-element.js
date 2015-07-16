
import nodeArray from '../dom/node-array';

export default function({context, message}) {
  let element = nodeArray(context)[0];
  if (!element) {
    throw new TypeError(message || 'context-to-element requires valid options.context');
  }

  return element;
}
