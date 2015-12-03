
import detectFocus from './detect-focus';

export default detectFocus({
  name: 'can-focus-table',
  element: 'table',
  mutate: function(element) {
    // IE9 has a problem replacing TBODY contents with innerHTML.
    // http://stackoverflow.com/a/8097055/515124
    // element.innerHTML = '<tr><td>cell</td></tr>';
    const fragment = document.createDocumentFragment();
    fragment.innerHTML = '<tr><td>cell</td></tr>';
    element.appendChild(fragment);
  },
});
