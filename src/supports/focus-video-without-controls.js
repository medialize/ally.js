
import detectFocus from './detect-focus';

export default detectFocus({
  name: 'can-focus-video-without-controls',
  element: 'video',
  mutate: function(element) {
    // invalid media file can trigger warning in console, data-uri to prevent HTTP request
    element.setAttribute('src', 'data:video/mp4;base64,' + 'video-focus-test');
  },
});
