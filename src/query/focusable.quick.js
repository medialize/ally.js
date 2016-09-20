
// https://www.w3.org/TR/html5/editing.html#focusable
// https://www.w3.org/WAI/PF/aria-practices/#keyboard

import selector from '../selector/focusable';
import isFocusable from '../is/focusable';

export default function queryFocusableQuick({
  context,
  includeContext,
  includeOnlyTabbable,
} = {}) {
  const _selector = selector();
  const elements = context.querySelectorAll(_selector);
  // the selector potentially matches more than really is focusable

  const _isFocusable = isFocusable.rules.except({
    onlyTabbable: includeOnlyTabbable,
  });

  const result = [].filter.call(elements, _isFocusable);

  // add context if requested and focusable
  if (includeContext && _isFocusable(context)) {
    result.unshift(context);
  }

  return result;
}
