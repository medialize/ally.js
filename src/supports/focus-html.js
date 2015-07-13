
import detectFocus from './detect-focus';

export default detectFocus({
  name: 'can-focus-document-element',
  element: 'div',
  mutate: function(/*element*/) {
    return document.documentElement;
  },
});
