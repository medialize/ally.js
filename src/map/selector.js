define(function defineMapSelector(require) {
  'use strict';

  var detectFeatureFocus = require('../dom/detect-feature-focus');

  var canFocusAudioWithoutControls = detectFeatureFocus('audio', function(element) {
    // invalid media file can trigger warning in console, data-uri to prevent HTTP request
    element.setAttribute('src', 'data:audio/mp3;base64,' + 'audio-focus-test');
  });

  var canFocusVideoWithoutControls = detectFeatureFocus('video', function(element) {
    // invalid media file can trigger warning in console, data-uri to prevent HTTP request
    element.setAttribute('src', 'data:video/mp4;base64,' + 'video-focus-test');
  });

  var map = {
    // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
    focusable: 'body,'
      // navigational elements
      // Namespace problems of [xlink:href] explained in http://stackoverflow.com/a/23047888/515124
      + 'a[href], svg a[*|href],'
      // TODO: investigate SVG's focusable attribute
      //   https://bugzilla.mozilla.org/show_bug.cgi?id=409404
      //   SVG-Tiny 1.2 defines the focusable attribute: http://www.w3.org/TR/SVGTiny12/interact.html#focusable-attr
      //   SVG 2 does not mention the focusable attribute: https://svgwg.org/svg2-draft/interact.html#Focus
      //   waiting for feedback from Doug - https://twitter.com/shepazu/status/526800017516814337
      // validity determined by dom/is-focusable.js
      // TODO: figure out why no browser makes area[href] focusable
      + 'area[href],'
      // validity determined by dom/is-focusable.js
      + 'input, select, textarea, button,'
      // browsing context containers
      + 'iframe, object, embed,'
      // interactive content
      + 'keygen,'
      + (canFocusAudioWithoutControls ? 'audio,' : 'audio[controls],')
      + (canFocusVideoWithoutControls ? 'video,' : 'video[controls],')
      // validity determined by dom/is-focusable.js
      + '[tabindex],'
      // editing hosts
      + '[contenteditable]',
  };

  return map;
});