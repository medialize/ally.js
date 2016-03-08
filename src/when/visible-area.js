
/*
  execute a callback once an element became fully visible in the viewport
*/

import '../prototype/window.requestanimationframe';
import isVisible from '../is/visible';
import visibleArea from '../util/visible-area';
import contextToElement from '../util/context-to-element';

export default function({context, callback, area} = {}) {
  if (typeof callback !== 'function') {
    throw new TypeError('when/visible-area requires options.callback to be a function');
  }

  if (typeof area !== 'number') {
    area = 1;
  }

  const element = contextToElement({
    label: 'when/visible-area',
    context,
  });

  if (isVisible(element) && visibleArea(element) >= area && callback(element) !== false) {
    // element is already visible, trivial escape
    return null;
  }

  let raf;
  const disengage = function() {
    raf && cancelAnimationFrame(raf);
  };

  const runWhenReady = function() {
    if (!isVisible(element) || visibleArea(element) < area || callback(element) === false) {
      raf = requestAnimationFrame(runWhenReady);
      return;
    }

    disengage();
  };

  runWhenReady();
  return { disengage };
}
