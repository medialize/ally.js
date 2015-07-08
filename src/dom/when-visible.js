
/*
  execute a callback once an element became fully visible in the viewport
*/

import isVisible from './is-visible';
import visibleQuotient from './visible-quotient';

export default function runWhenVisible(callback, element, percentVisible) {
  if (!percentVisible) {
    // unless a specific percentage of visibility has been provided we
    // assume the element has to be fully visible before focus is given
    percentVisible = 1;
  }

  if (isVisible(element) && visibleQuotient(element) >= percentVisible && callback(element) !== false) {
    // element is already visible, trivial escape
    return;
  }

  var raf;
  var abort = function() {
    document.body.removeEventListener('focus', abort, true);
    raf && cancelAnimationFrame(raf);
  };

  document.body.addEventListener('focus', abort, true);

  var runWhenReady = function() {
    if (!isVisible(element) || visibleQuotient(element) < percentVisible || callback(element) === false) {
      raf = requestAnimationFrame(runWhenReady);
      return;
    }

    abort();
  };

  runWhenReady();
  return abort;
}
