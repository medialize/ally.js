
/*
  Identify the first focusable element in the element's ancestry, including itself
*/

import 'array.prototype.findindex';
import getParents from '../get/parents';
import isFocusable from '../is/focusable';
import contextToElement from '../util/context-to-element';

export default function({context}) {
  const element = contextToElement({
    message: 'get/focus-target requires valid options.context',
    context,
  });

  // trivial ejection check
  if (isFocusable(element)) {
    return element;
  }

  // obtain the element's ancestry
  var _path = getParents({context: element}).slice(1);
  // find the first element that is actually focusable
  var _firstFocusableIndex = _path.findIndex(isFocusable);
  return _path[_firstFocusableIndex] || null;
}
