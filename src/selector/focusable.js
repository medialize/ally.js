define(function defineSelectorFocusable(require) {
  'use strict';

  // NOTE: this selector MUST *never* be used directly,
  // always go through dom/query-focusable or dom/is-focusable.js
  // there are too many edge cases that they could be covered in
  // a simple CSS selector…

  require('../prototype/svgelement.prototype.focus');
  var detectFeatureFocus = require('../dom/detect-feature-focus');

  var canFocusAudioWithoutControls = detectFeatureFocus('audio', function(element) {
    // invalid media file can trigger warning in console, data-uri to prevent HTTP request
    element.setAttribute('src', 'data:audio/mp3;base64,' + 'audio-focus-test');
  });

  var canFocusVideoWithoutControls = detectFeatureFocus('video', function(element) {
    // invalid media file can trigger warning in console, data-uri to prevent HTTP request
    element.setAttribute('src', 'data:video/mp4;base64,' + 'video-focus-test');
  });

  var canFocusSvg = SVGElement.prototype.focus && detectFeatureFocus('div', function(element) {
    element.innerHTML = '<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="100" height="100">'
      + '<text x="20" y="20">hello</text></svg>';
    return element.firstElementChild;
  });

  var canFocusTable = detectFeatureFocus('table', function(element) {
    element.innerHTML = '<tr><td>cell</td></tr>';
  });

  // TODO: investigate SVG's focusable attribute
  //   https://bugzilla.mozilla.org/show_bug.cgi?id=409404
  //   SVG-Tiny 1.2 defines the focusable attribute: http://www.w3.org/TR/SVGTiny12/interact.html#focusable-attr
  //   SVG 2 does not mention the focusable attribute: https://svgwg.org/svg2-draft/interact.html#Focus
  //   waiting for feedback from Doug - https://twitter.com/shepazu/status/526800017516814337

  // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  var selector = 'body,'
    // ID11 can focus <table> and <td>
    + (canFocusTable ? 'table, td,' : '')
    // supporting <svg>
    + (canFocusSvg ? 'svg,' : '')
    // Namespace problems of [xlink:href] explained in http://stackoverflow.com/a/23047888/515124
    // Firefox cannot focus <svg> child elements from script
    + (SVGElement.prototype.focus ? 'svg a[*|href],' : '')
    // + 'svg, svg *,' in chrome as *every* svg element is focusable
    // navigational elements
    + 'a[href],'
    // validity determined by dom/is-valid-area.js
    + 'area[href],'
    // validity determined by dom/is-disabled.js
    + 'input, select, textarea, button,'
    // browsing context containers
    + 'iframe, object, embed,'
    // interactive content
    + 'keygen,'
    + (canFocusAudioWithoutControls ? 'audio,' : 'audio[controls],')
    + (canFocusVideoWithoutControls ? 'video,' : 'video[controls],')
    // validity determined by dom/is-valid-tabindex.js
    + '[tabindex],'
    // editing hosts
    + '[contenteditable]';

  return selector;
});