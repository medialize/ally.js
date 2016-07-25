
import mp3 from './media/mp3';

export default {
  name: 'can-focus-audio-without-controls',
  element: 'audio',
  mutate: function(element) {
    try {
      // invalid media file can trigger warning in console, data-uri to prevent HTTP request
      element.setAttribute('src', mp3);
    } catch (e) {
      // IE9 may throw "Error: Not implemented"
    }
  },
};
