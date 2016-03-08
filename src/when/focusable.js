
/*
  trigger a callback once the context element is focusable and is fully visible in the viewport
*/

import whenVisibleArea from './visible-area';
import isFocusable from '../is/focusable';
import contextToElement from '../util/context-to-element';
import getDocument from '../util/get-document';

export default function({context, callback, area} = {}) {
  if (typeof callback !== 'function') {
    throw new TypeError('when/focusable requires options.callback to be a function');
  }

  const element = contextToElement({
    label: 'when/focusable',
    context,
  });

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
