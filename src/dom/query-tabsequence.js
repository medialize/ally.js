
// http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
// http://www.w3.org/WAI/PF/aria-practices/#keyboard

import queryTabbable from './query-tabbable';
import sortTabindex from './sort-tabindex';

function moveContextToBeginning(elements, context) {
  var pos = elements.indexOf(context);
  if (pos > 0) {
    var tmp = elements.splice(pos, 1);
    return tmp.concat(elements);
  }

  return elements;
}

export default function queryTabsequence(context, includeContext) {
  var elements = queryTabbable(context, includeContext);
  elements = sortTabindex(elements);

  if (includeContext) {
    // if we include the context itself, it has to be the first
    // element of the sequence
    elements = moveContextToBeginning(elements, context);
  }

  return elements;
}
