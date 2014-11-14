define(function defineSupportsFocusVideoWithoutControls(require) {
  'use strict';

  var detectFocus = require('./detect-focus');

  var canFocusVideoWithoutControls = detectFocus('can-focus-video-without-controls', 'video', function(element) {
    // invalid media file can trigger warning in console, data-uri to prevent HTTP request
    element.setAttribute('src', 'data:video/mp4;base64,' + 'video-focus-test');
  });

  return canFocusVideoWithoutControls;
});