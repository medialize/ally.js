
import tabindexValue from '../util/tabindex-value';

export default function(elements) {
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.tabIndex
  // elements with tabIndex "0" (including tabbableElements without tabIndex) should be navigated in the order they appear.
  // elements with a positive tabIndex:
  //   Elements that have identical tabIndexes should be navigated in the order they appear.
  //   Navigation proceeds from the lowest tabIndex to the highest tabIndex.

  // NOTE: sort implementation may be unstable and thus mess up DOM order,
  // that's why we build a map that's being sorted instead. If we were able to rely
  // on a stable sorting algorithm, sortTabindex() could be as simple as
  // elements.sort(function(a, b) { return a.tabIndex - b.tabIndex; });
  // at this time Chrome does not use a stable sorting algorithm
  // see http://blog.rodneyrehm.de/archives/14-Sorting-Were-Doing-It-Wrong.html#stability

  // NOTE: compareDocumentPosition seemed like more overhead than just sorting this with buckets
  // https://developer.mozilla.org/en-US/docs/Web/API/Node.compareDocumentPosition

  const map = {};
  const indexes = [];
  const normal = elements.filter(function(element) {
    // in Trident and Gecko SVGElement does not know about the tabIndex property
    let tabIndex = element.tabIndex;
    if (tabIndex === undefined) {
      tabIndex = tabindexValue(element);
    }

    // extract elements that don't need sorting
    if (tabIndex <= 0 || tabIndex === null || tabIndex === undefined) {
      return true;
    }

    if (!map[tabIndex]) {
      // create sortable bucket for dom-order-preservation of elements with the same tabIndex
      map[tabIndex] = [];
      // maintain a list of unique tabIndexes
      indexes.push(tabIndex);
    }

    // sort element into the proper bucket
    map[tabIndex].push(element);
    // element moved to sorting map, so not "normal" anymore
    return false;
  });

  // sort the tabindex ascending,
  // then resolve them to their appropriate buckets,
  // then flatten the array of arrays to an array
  const _elements = indexes.sort().map(function(tabIndex) {
    return map[tabIndex];
  }).reduceRight(function(previous, current) {
    return current.concat(previous);
  }, normal);

  return _elements;
}
