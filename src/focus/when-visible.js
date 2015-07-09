
/*
  focus an element once it became fully visible in the viewport
*/

import whenVisible from '../dom/when-visible';
import isFocusable from '../dom/is-focusable';

function focus(element) {
  if (!isFocusable(element)) {
    return false;
  }

  element.focus();
  return true;
}

export default function(element, percentVisible) {
  return whenVisible(focus, element, percentVisible);
}
