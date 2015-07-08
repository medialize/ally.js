
import detectFocus from './detect-focus';

var canFocusSummary = detectFocus('can-focus-summary', 'details', function(element) {
  element.innerHTML = '<summary>foo</summary><p>content</p>';
  return element.firstElementChild;
});

export default canFocusSummary;
