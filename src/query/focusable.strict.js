
// http://www.w3.org/TR/html5/editing.html#focusable
// http://www.w3.org/WAI/PF/aria-practices/#keyboard

import isFocusable from '../is/focusable';

// see https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
const FocusableFilter = function(node) {
  if (node.shadowRoot) {
    // return ShadowRoot elements regardless of them being focusable,
    // so they can be walked recursively later
    return NodeFilter.FILTER_ACCEPT;
  }

  if (isFocusable(node)) {
    // finds elements that could have been found by document.querySelectorAll()
    return NodeFilter.FILTER_ACCEPT;
  }

  return NodeFilter.FILTER_SKIP;
};
// IE requires a function, Browsers require {acceptNode: function}
// see http://www.bennadel.com/blog/2607-finding-html-comment-nodes-in-the-dom-using-treewalker.htm
FocusableFilter.acceptNode = FocusableFilter;

export default function queryFocusableStrict({context, includeContext} = {}) {
  // see https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker
  const walker = document.createTreeWalker(
    // root element to start search in
    context || document.documentElement,
    // element type filter
    NodeFilter.SHOW_ELEMENT,
    // custom NodeFilter filter
    FocusableFilter,
    // deprecated, but IE requires it
    false
  );

  let list = [];

  while (walker.nextNode()) {
    if (walker.currentNode.shadowRoot) {
      if (isFocusable(walker.currentNode)) {
        list.push(walker.currentNode);
      }

      list = list.concat(queryFocusableStrict({
        context: walker.currentNode.shadowRoot,
      }));
    } else {
      list.push(walker.currentNode);
    }
  }

  // add context if requested and focusable
  if (includeContext && isFocusable(context)) {
    list.unshift(context);
  }

  return list;
}
