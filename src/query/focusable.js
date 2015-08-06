
// http://www.w3.org/TR/html5/editing.html#focusable
// http://www.w3.org/WAI/PF/aria-practices/#keyboard

import nodeArray from '../util/node-array';
import queryFocusableStrict from './focusable.strict';
import queryFocusableQuick from './focusable.quick';

export default function({context, includeContext, strategy = 'quick'} = {}) {
  context = nodeArray(context)[0];
  // alias document to document.documentElement for convenience
  if (!context || context.nodeType === 9) {
    context = document.documentElement;
  }

  if (strategy === 'quick') {
    return queryFocusableQuick({context, includeContext});
  } else if (strategy === 'strict') {
    return queryFocusableStrict({context, includeContext});
  }

  throw new TypeError('query/focusable requires option.strategy to be one of ["quick", "strict"]');
}
