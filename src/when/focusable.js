
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

  if (context === undefined) {
    throw new TypeError('when/focusable requires valid options.context');
  }

  const element = nodeArray(context)[0];
  const _document = getDocument(element);
  if (!element) {
    throw new TypeError('when/focusable requires valid options.context');
  }

  const filterCallback = function(target) {
    if (!isFocusable(target)) {
      return false;
    }

    return callback(target);
  };

  const handle = whenVisibleArea({ context: element, callback: filterCallback, area });
  const disengage = function() {
    _document.removeEventListener('focus', disengage, true);
    handle && handle.disengage();
  };

  _document.addEventListener('focus', disengage, true);

  return { disengage };
}
