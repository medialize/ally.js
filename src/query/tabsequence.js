
// https://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
// https://www.w3.org/WAI/PF/aria-practices/#keyboard

import queryTabbable from './tabbable';
import nodeArray from '../util/node-array';
import platform from '../util/platform';
import sortArea from './tabsequence.sort-area';
import sortShadowed from './tabsequence.sort-shadowed';
import sortTabindex from './tabsequence.sort-tabindex';
import _supports from '../supports/supports';
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
  if (supports.tabsequenceAreaAtImgPosition) {
    // Some browsers sort <area> in DOM order, some place the <area>s
    // where the <img> referecing them would've been in DOM order.
    // https://github.com/medialize/ally.js/issues/5
    elements = sortArea(elements, _context);
  }

  elements = sortTabindex(elements);
  return elements;
}

export default function({
  context,
  includeContext,
  includeOnlyTabbable,
  strategy,
} = {}) {
  if (!supports) {
    supports = _supports();
  }

  const _context = nodeArray(context)[0] || document.documentElement;
  let elements = queryTabbable({
    context: _context,
    includeContext,
    includeOnlyTabbable,
    strategy,
  });

  if (document.body.createShadowRoot && platform.is.BLINK) {
    // sort tabindex localized to shadow dom
    // see https://github.com/medialize/ally.js/issues/6
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
