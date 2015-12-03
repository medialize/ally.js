
import getDocument from './get-document';

export default function(node) {
  const _document = getDocument(node);
  return _document.defaultView || window;
}
