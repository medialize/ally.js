
import detectFocus from './detect-focus';
import mp3 from './media/mp3';

export default detectFocus({
  name: 'can-focus-audio-without-controls',
  element: 'audio',
  mutate: function(element) {
    // invalid media file can trigger warning in console, data-uri to prevent HTTP request
    element.setAttribute('src', mp3);
  },
});
