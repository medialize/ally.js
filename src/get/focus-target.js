
/*
  Identify the first focusable element in the element's ancestry, including itself
*/

import getFocusRedirectTarget from './focus-redirect-target';
import getParents from '../get/parents';
import isFocusable from '../is/focusable';
import contextToElement from '../util/context-to-element';

export default function({context} = {}) {
  const element = contextToElement({
    message: 'get/focus-target requires valid options.context',
    context,
  });

  let result = null;
  const getTarget = function(_element) {
    result = isFocusable(_element) && _element
      || getFocusRedirectTarget({ context: _element, skipFocusable: true });

    return Boolean(result);
  };

  if (getTarget(element)) {
    return result;
  }

  getParents({context: element}).slice(1).some(getTarget);
  return result;
}
