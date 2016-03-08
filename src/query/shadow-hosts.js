
import contextToElement from '../util/context-to-element';
import getDocument from '../util/get-document';

// see https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
const filter = function(node) {
  if (node.shadowRoot) {
    return NodeFilter.FILTER_ACCEPT;
  }

  return NodeFilter.FILTER_SKIP;
};
// IE requires a function, Browsers require {acceptNode: function}
// see http://www.bennadel.com/blog/2607-finding-html-comment-nodes-in-the-dom-using-treewalker.htm
filter.acceptNode = filter;

export default function queryShadowHosts({ context } = {}) {
  const element = contextToElement({
    label: 'query/shadow-hosts',
    resolveDocument: true,
    defaultToDocument: true,
    context,
  });

  const _document = getDocument(context);
  // see https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker
  const walker = _document.createTreeWalker(
    // root element to start search in
    element,
    // element type filter
    NodeFilter.SHOW_ELEMENT,
    // custom NodeFilter filter
    filter,
    // deprecated, but IE requires it
    false
  );

  let list = [];

  if (element.shadowRoot) {
    // TreeWalker does not run the filter on the context element
    list.push(element);
    list = list.concat(queryShadowHosts({
      context: element.shadowRoot,
    }));
  }

  while (walker.nextNode()) {
    list.push(walker.currentNode);
    list = list.concat(queryShadowHosts({
      context: walker.currentNode.shadowRoot,
    }));
  }

  return list;
}
