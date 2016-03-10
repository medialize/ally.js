
// Node.compareDocumentPosition is available since IE9
// see https://developer.mozilla.org/en-US/docs/Web/API/Node.compareDocumentPosition

// callback returns true when element is contained by parent or is the parent suited for use with Array.some()
/*
  USAGE:
    var isChildOf = getParentComparator({parent: someNode});
    listOfElements.some(isChildOf)
*/

export function getParentComparator({parent, element, includeSelf} = {}) {
  if (parent) {
    return function isChildOf(node) {
      return Boolean(
        includeSelf && node === parent
        || parent.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY
      );
    };
  } else if (element) {
    return function isParentOf(node) {
      return Boolean(
        includeSelf && element === node
        || node.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_CONTAINED_BY
      );
    };
  }

  throw new TypeError('util/compare-position#getParentComparator required either options.parent or options.element');
}
