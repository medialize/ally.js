
/*
  Identify the first focusable element in the element's ancestry, including itself
*/

import getFocusRedirectTarget from './focus-redirect-target';
import getParents from '../get/parents';
import isFocusable from '../is/focusable';
import contextToElement from '../util/context-to-element';

export default function({context, except} = {}) {
  const element = contextToElement({
    label: 'get/focus-target',
    context,
  });

  let result = null;
  const getTarget = function(_element) {
    const focusable = isFocusable.rules({
      context: _element,
      except,
    });

    if (focusable) {
      result = _element;
      return true;
    }

    result = getFocusRedirectTarget({
      context: _element,
      skipFocusable: true,
    });

    return Boolean(result);
  };

  if (getTarget(element)) {
    return result;
  }

  getParents({context: element}).slice(1).some(getTarget);
  return result;
}
