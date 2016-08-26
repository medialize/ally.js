
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

  let raf;
  let evaluate = null;
  const disengage = function() {
    raf && cancelAnimationFrame(raf);
  };

  const predicate = function() {
    return !isVisible(element) || visibleArea(element) < area || callback(element) === false;
  };

  const checkPredicate = function() {
    if (predicate()) {
      evaluate();
      return;
    }

    disengage();
  };

  evaluate = function() {
    raf = requestAnimationFrame(checkPredicate);
  };

  evaluate();
  return { disengage };
}
