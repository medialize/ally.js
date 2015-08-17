
import detectFocus from './detect-focus';

export default detectFocus({
  name: 'can-focus-embed-tabindex',
  // <embed type="video/mp4" src="data:video/mp4;base64,embed-tabindex-focus-test" width="640" height="480" tabindex="-1">
  element: 'embed',
  mutate: function(element) {
    element.setAttribute('tabindex', '-1');
  },
});
