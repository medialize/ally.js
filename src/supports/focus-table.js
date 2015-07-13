
import detectFocus from './detect-focus';

export default detectFocus({
  name: 'can-focus-table',
  element: 'table',
  mutate: function(element) {
    element.innerHTML = '<tr><td>cell</td></tr>';
  },
});
