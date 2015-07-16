
// http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
// http://www.w3.org/WAI/PF/aria-practices/#keyboard

import queryTabbable from './tabbable';
import sortTabindex from '../dom/sort-tabindex';

function moveContextToBeginning(elements, context) {
  const pos = elements.indexOf(context);
  if (pos > 0) {
    const tmp = elements.splice(pos, 1);
    return tmp.concat(elements);
  }

  return elements;
}

export default function({context, includeContext}) {
  let elements = queryTabbable({context, includeContext});
  elements = sortTabindex(elements);

  if (includeContext) {
    // if we include the context itself, it has to be the first
    // element of the sequence
    elements = moveContextToBeginning(elements, context);
  }

  return elements;
}
