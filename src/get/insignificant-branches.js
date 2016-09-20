
// find all highest elements within context that do not contain any of the filter elements.
// (basically the tree minus the parent paths of each filtered element reduced to the top most nodes)
// originally inspired by Marcy Sutton's Material Dialog Component:
// https://github.com/angular/material/blob/v0.11.1/src/components/dialog/dialog.js#L748-L783
// to avoid this behavior: https://marcysutton.com/slides/mobile-a11y-seattlejs/#/36

import contextToElement from '../util/context-to-element';
import nodeArray from '../util/node-array';
import {getParentComparator} from '../util/compare-position';
import getDocument from '../util/get-document';

function queryInsignificantBranches({context, filter}) {
  const containsFilteredElement = function(node) {
    const containsNode = getParentComparator({parent: node});
    return filter.some(containsNode);
  };

  // We'd use a Set() for this, if we could
  const insiginificantBranches = [];

  // see https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
  const CollectInsignificantBranchesFilter = function(node) {
    if (filter.some(element => node === element)) {
      // we've hit a filtered element and can ignore its children
      return NodeFilter.FILTER_REJECT;
    }

    if (containsFilteredElement(node)) {
      // we've hit a significant tree, so we'll have to keep investigating
      return NodeFilter.FILTER_ACCEPT;
    }

    // we've found an insignificant tree
    insiginificantBranches.push(node);
    return NodeFilter.FILTER_REJECT;
  };
  // IE requires a function, Browsers require {acceptNode: function}
  // see https://www.bennadel.com/blog/2607-finding-html-comment-nodes-in-the-dom-using-treewalker.htm
  CollectInsignificantBranchesFilter.acceptNode = CollectInsignificantBranchesFilter;

  const _document = getDocument(context);
  // see https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker
  const walker = _document.createTreeWalker(
    // root element to start search in
    context,
    // element type filter
    NodeFilter.SHOW_ELEMENT,
    // custom NodeFilter filter
    CollectInsignificantBranchesFilter,
    // deprecated, but IE requires it
    false
  );

  while (walker.nextNode()) {
    // collection things is happening through the filter method
  }

  return insiginificantBranches;
}

export default function({context, filter} = {}) {
  context = contextToElement({
    label: 'get/insignificant-branches',
    defaultToDocument: true,
    context,
  });

  filter = nodeArray(filter);
  if (!filter.length) {
    throw new TypeError('get/insignificant-branches requires valid options.filter');
  }

  return queryInsignificantBranches({
    context,
    filter,
  });
}
