
// http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
// http://www.w3.org/WAI/PF/aria-practices/#keyboard

import queryTabbable from './tabbable';
import moveAreaToImagePosition from './tabsequence.move-area';
import nodeArray from '../util/node-array';
import sortTabindex from '../util/sort-elements-by-tabindex';

import _supports from './tabsequence.supports';
let supports;

function moveContextToBeginning(elements, context) {
  const pos = elements.indexOf(context);
  if (pos > 0) {
    const tmp = elements.splice(pos, 1);
    return tmp.concat(elements);
  }

  return elements;
}

export default function({context, includeContext, strategy} = {}) {
  if (!supports) {
    supports = _supports();
  }

  const _context = nodeArray(context)[0] || document.documentElement;
  let elements = queryTabbable({context: _context, includeContext, strategy});
  elements = sortTabindex(elements);

  if (includeContext) {
    // if we include the context itself, it has to be the first
    // element of the sequence
    elements = moveContextToBeginning(elements, _context);
  }

  if (supports.tabsequenceSortsAreaAtImagePosition) {
    // Some browsers sort <area> in DOM order, some place the <area>s
    // where the <img> referecing them would've been in DOM order.
    elements = moveAreaToImagePosition(elements, _context);
  }

  return elements;
}
