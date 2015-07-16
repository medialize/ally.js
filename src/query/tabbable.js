
// http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
// http://www.w3.org/WAI/PF/aria-practices/#keyboard

import queryFocusable from './focusable';
import isTabbable from '../is/tabbable';

export default function({context, includeContext}) {
  return queryFocusable({context, includeContext}).filter(isTabbable);
}
