
import detectFocus from './detect-focus';

export default detectFocus({
  name: 'can-focus-embed-tabindex',
  // <embed type="video/mp4" src="data:video/mp4;base64,embed-focus-test" width="640" height="480">
  element: 'embed',
});
