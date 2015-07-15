
/*
  execute a callback once an element became fully visible in the viewport
*/

import isVisible from '../dom/is-visible';
import visibleQuotient from '../dom/visible-quotient';
import nodeArray from '../dom/node-array';

export default function({context, callback, area}) {
  if (context === undefined) {
    throw new TypeError('when/visible requires options.context');
  }

  if (typeof area !== 'number') {
    area = 1;
  }

  let element = nodeArray(context)[0];
  if (!element) {
    throw new TypeError('when/visible requires valid options.context');
  }

  if (isVisible(element) && visibleQuotient(element) >= area && callback(element) !== false) {
    // element is already visible, trivial escape
    return null;
  }

  let raf;
  let disengage = function() {
    raf && cancelAnimationFrame(raf);
  };

  var runWhenReady = function() {
    if (!isVisible(element) || visibleQuotient(element) < area || callback(element) === false) {
      raf = requestAnimationFrame(runWhenReady);
      return;
    }

    disengage();
  };

  runWhenReady();
  return { disengage };
}
