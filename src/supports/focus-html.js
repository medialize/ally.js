
import detectFocus from './detect-focus';

var canFocusDocumentElement = detectFocus('can-focus-document-element', 'div', function(/*element*/) {
  return document.documentElement;
});

export default canFocusDocumentElement;
