
/*
  trigger a callback once the context element is focusable and is fully visible in the viewport
*/

import whenVisibleArea from './visible-area';
import isFocusable from '../is/focusable';
import getDocument from '../util/get-document';
import nodeArray from '../util/node-array';

export default function({context, callback, area} = {}) {
  if (typeof callback !== 'function') {
    throw new TypeError('when/focusable requires options.callback to be a function');
  }

  const element = nodeArray(context)[0];
  if (!element) {
    throw new TypeError('when/focusable requires valid options.context');
  }

  const filterCallback = function(target) {
    if (!isFocusable(target)) {
      return false;
    }

    return callback(target);
  };

  const _document = getDocument(element);
  const handle = whenVisibleArea({ context: element, callback: filterCallback, area });
  const disengage = function() {
    _document.removeEventListener('focus', disengage, true);
    handle && handle.disengage();
  };

  _document.addEventListener('focus', disengage, true);

  return { disengage };
}
