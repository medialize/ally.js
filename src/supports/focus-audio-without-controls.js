
import detectFocus from './detect-focus';

export default detectFocus({
  name: 'can-focus-audio-without-controls',
  element: 'audio',
  mutate: function(element) {
    // invalid media file can trigger warning in console, data-uri to prevent HTTP request
    element.setAttribute('src', 'data:audio/mp3;base64,' + 'audio-focus-test');
  },
});
