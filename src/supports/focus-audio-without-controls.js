
import detectFocus from './detect-focus';

var canFocusAudioWithoutControls = detectFocus('can-focus-audio-without-controls', 'audio', function(element) {
  // invalid media file can trigger warning in console, data-uri to prevent HTTP request
  element.setAttribute('src', 'data:audio/mp3;base64,' + 'audio-focus-test');
});

export default canFocusAudioWithoutControls;
