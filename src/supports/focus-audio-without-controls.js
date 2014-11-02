define(function defineSupportsFocusAudioWithoutControls(require) {
  'use strict';

  var detectFocus = require('./detect-focus');

  var canFocusAudioWithoutControls = detectFocus('audio', function(element) {
    // invalid media file can trigger warning in console, data-uri to prevent HTTP request
    element.setAttribute('src', 'data:audio/mp3;base64,' + 'audio-focus-test');
  });

  return canFocusAudioWithoutControls;
});