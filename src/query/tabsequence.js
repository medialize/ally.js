
// http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
// http://www.w3.org/WAI/PF/aria-practices/#keyboard

import platform from 'platform';
import queryTabbable from './tabbable';
import nodeArray from '../util/node-array';
import sortArea from './tabsequence.sort-area';
import sortShadowed from './tabsequence.sort-shadowed';
import sortTabindex from './tabsequence.sort-tabindex';
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

function sortElements(elements, _context) {
  elements = sortTabindex(elements);

  if (supports.tabsequenceSortsAreaAtImagePosition) {
    // Some browsers sort <area> in DOM order, some place the <area>s
    // where the <img> referecing them would've been in DOM order.
    elements = sortArea(elements, _context);
  }

  return elements;
}

export default function({context, includeContext, strategy} = {}) {
  if (!supports) {
    supports = _supports();
  }

  const _context = nodeArray(context)[0] || document.documentElement;
  let elements = queryTabbable({context: _context, includeContext, strategy});

  if (platform.name === 'Chrome' || platform.name === 'Chrome Mobile') {
    elements = sortShadowed(elements, _context, sortElements);
  } else {
    elements = sortElements(elements, _context);
  }

  if (includeContext) {
    // if we include the context itself, it has to be the first
    // element of the sequence
    elements = moveContextToBeginning(elements, _context);
  }

  return elements;
}
