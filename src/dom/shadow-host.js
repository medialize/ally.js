
export default function shadowHost(element) {
  // walk up to the root
  var container = null;
  while (element) {
    container = element;
    element = element.parentNode;
  }

  if (!container) {
    return null;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Node.nodeType
  // NOTE: Firefox 34 does not expose ShadowRoot.host (but 37 does)
  if (container.nodeType === container.DOCUMENT_FRAGMENT_NODE && container.host) {
    // the root is attached to a fragment node that has a host
    return container.host;
  }

  return null;
}
