/*
  Get the shadow root host element if the node passed in is in the shadow root
  USAGE:
    var shadowParent = getShadowParent(someNode)
*/
export function getShadowParent(node) {
  for (; node; node = node.parentNode) {
    if (node.toString() === '[object ShadowRoot]') {
      return node.host;
    }
  }
  return null;
}
