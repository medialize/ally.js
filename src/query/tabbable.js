
// https://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
// https://www.w3.org/WAI/PF/aria-practices/#keyboard

import queryFocusable from './focusable';
import isTabbable from '../is/tabbable';

export default function({
  context,
  includeContext,
  includeOnlyTabbable,
  strategy,
} = {}) {
  const _isTabbable = isTabbable.rules.except({
    onlyTabbable: includeOnlyTabbable,
  });

  return queryFocusable({
    context,
    includeContext,
    includeOnlyTabbable,
    strategy,
  }).filter(_isTabbable);
}
