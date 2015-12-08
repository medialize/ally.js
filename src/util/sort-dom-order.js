
// sorts a list of elements according to their order in the DOM

function compareDomPosition(a, b) {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}

export default function(elements) {
  return elements.sort(compareDomPosition);
}
