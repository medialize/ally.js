
// sort a list of elements into another list of elements in DOM order

/*
  USAGE:
    mergeDomOrder({
      // DOM ordered array of elements to use as base of merge
      list: [],
      // unordered array of elements to merge into base list
      elements: [],
      // callback function to resolve an element
      resolveElement: function(element) {
        // return null to skip
        // return element to replace insertion
        // return [element1, element2, …] to replace insertion with multiple elements
        return element;
      },
    })
*/

import findIndex from '../util/array-find-index';
import nodeArray from './node-array';
import sortDomOrder from './sort-dom-order';

function getFirstSuccessorOffset(list, target) {
  // find the first element that comes AFTER the target element
  return findIndex(list, function(element) {
    return target.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING;
  });
}

function findInsertionOffsets(list, elements, resolveElement) {
  // instead of mutating the elements list directly, remember position and map
  // to inject later, when we can do this more efficiently
  const insertions = [];
  elements.forEach(function(element) {
    let replace = true;
    let offset = list.indexOf(element);

    if (offset === -1) {
      // element is not in target list
      offset = getFirstSuccessorOffset(list, element);
      replace = false;
    }

    if (offset === -1) {
      // there is no successor in the tabsequence,
      // meaning the image must be the last element
      offset = list.length;
    }

    // allow the consumer to replace the injected element
    const injections = nodeArray(resolveElement ? resolveElement(element) : element);
    if (!injections.length) {
      // we can't inject zero elements
      return;
    }

    insertions.push({
      offset,
      replace,
      elements: injections,
    });
  });

  return insertions;
}

function insertElementsAtOffsets(list, insertions) {
  // remember the number of elements we have already injected
  // so we account for the caused index offset
  let inserted = 0;
  // make sure that we insert the elements in sequence,
  // otherwise the offset compensation won't work
  insertions.sort((a, b) => a.offset - b.offset);
  insertions.forEach(function(insertion) {
    // array.splice has an annoying function signature :(
    const remove = insertion.replace ? 1 : 0;
    const args = [insertion.offset + inserted, remove].concat(insertion.elements);
    list.splice.apply(list, args);
    inserted += insertion.elements.length - remove;
  });
}

export default function({list, elements, resolveElement} = {}) {
  // operate on a copy so we don't mutate the original array
  const _list = list.slice(0);
  // make sure the elements we're injecting are provided in DOM order
  const _elements = nodeArray(elements).slice(0);
  sortDomOrder(_elements);
  // find the offsets within the target array (list) at which to inject
  // each individual element (from elements)
  const insertions = findInsertionOffsets(_list, _elements, resolveElement);
  // actually inject the elements into the target array at the identified positions
  insertElementsAtOffsets(_list, insertions);
  return _list;
}
