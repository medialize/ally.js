
/*
  trigger a callback once the context element is focusable and is fully visible in the viewport
*/

import whenVisibleArea from './visible-area';
import isFocusable from '../is/focusable';

export default function({context, callback, area} = {}) {
  if (typeof callback !== 'function') {
    throw new TypeError('when/focusable requires options.callback to be a function');
  }

  const filterCallback = function(element) {
    if (!isFocusable(element)) {
      return false;
    }

    return callback(element);
  };

  const handle = whenVisibleArea({ context, callback: filterCallback, area });
  const disengage = function() {
    document.body.removeEventListener('focus', disengage, true);
    handle && handle.disengage();
  };

  document.body.addEventListener('focus', disengage, true);

  return { disengage };
}
