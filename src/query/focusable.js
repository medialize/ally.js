
// https://www.w3.org/TR/html5/editing.html#focusable
// https://www.w3.org/WAI/PF/aria-practices/#keyboard

import contextToElement from '../util/context-to-element';
import queryFocusableStrict from './focusable.strict';
import queryFocusableQuick from './focusable.quick';

export default function({
  context,
  includeContext,
  includeOnlyTabbable,
  strategy = 'quick',
} = {}) {
  const element = contextToElement({
    label: 'query/focusable',
    resolveDocument: true,
    defaultToDocument: true,
    context,
  });

  const options = {
    context: element,
    includeContext,
    includeOnlyTabbable,
    strategy,
  };

  if (strategy === 'quick') {
    return queryFocusableQuick(options);
  } else if (strategy === 'strict' || strategy === 'all') {
    return queryFocusableStrict(options);
  }

  throw new TypeError('query/focusable requires option.strategy to be one of ["quick", "strict", "all"]');
}
