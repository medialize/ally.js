
import detectFocus from './detect-focus';

var canFocusTable = detectFocus('can-focus-table', 'table', function(element) {
  element.innerHTML = '<tr><td>cell</td></tr>';
});

export default canFocusTable;
