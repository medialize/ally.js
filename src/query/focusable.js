
// http://www.w3.org/TR/html5/editing.html#focusable
// http://www.w3.org/WAI/PF/aria-practices/#keyboard

import nodeArray from '../util/node-array';
import queryFocusableStrict from './focusable.strict';
import queryFocusableQuick from './focusable.quick';

export default function({
  context,
  includeContext,
  includeOnlyTabbable,
  strategy = 'quick',
} = {}) {
  context = nodeArray(context)[0];
  // alias document to document.documentElement for convenience
  if (!context || context.nodeType === Node.DOCUMENT_NODE) {
    context = document.documentElement;
  }

  if (context.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('query/focusable requires an argument of type Element');
  }

  const options = {
    context,
    includeContext,
    includeOnlyTabbable,
    strategy,
  };

  if (strategy === 'quick') {
    return queryFocusableQuick(options);
  } else if (strategy === 'strict' || strategy === 'all') {
    return queryFocusableStrict(options);
  }

  throw new TypeError('query/focusable requires option.strategy to be one of ["quick", "strict"]');
}
