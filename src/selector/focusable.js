define(function defineSelectorFocusable(require) {
  'use strict';

  // NOTE: this selector MUST *never* be used directly,
  // always go through dom/query-focusable or dom/is-focusable.js
  // there are too many edge cases that they could be covered in
  // a simple CSS selector…

  require('../prototype/svgelement.prototype.focus');
  var canFocusAudioWithoutControls = require('../supports/focus-audio-without-controls');
  var canFocusVideoWithoutControls =  require('../supports/focus-video-without-controls');
  var canFocusHtml = require('../supports/focus-html');
  var canFocusSvg = require('../supports/focus-svg');
  var canFocusSvgMethod = SVGElement.prototype.focus === HTMLElement.prototype.focus;
  var canFocusTable = require('../supports/focus-table');
  var canFocusSummary = require('../supports/focus-summary');

  // TODO: investigate SVG's focusable attribute
  //   https://bugzilla.mozilla.org/show_bug.cgi?id=409404
  //   SVG-Tiny 1.2 defines the focusable attribute: http://www.w3.org/TR/SVGTiny12/interact.html#focusable-attr
  //   SVG 2 does not mention the focusable attribute: https://svgwg.org/svg2-draft/interact.html#Focus
  //   waiting for feedback from Doug - https://twitter.com/shepazu/status/526800017516814337

  // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  var selector = 'body,'
    // Firefox, IE11 can focus <html>
    + (canFocusHtml ? 'html,' : '')
    // IE11 can focus <table> and <td>
    + (canFocusTable ? 'table, td,' : '')
    // supporting <svg>
    + (canFocusSvgMethod && canFocusSvg ? 'svg,' : '')
    // Namespace problems of [xlink:href] explained in http://stackoverflow.com/a/23047888/515124
    // Firefox cannot focus <svg> child elements from script
    + (canFocusSvgMethod ? 'svg a[*|href],' : '')
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
    + (canFocusSummary ? 'summary,' : '')
    // validity determined by dom/is-valid-tabindex.js
    + '[tabindex],'
    // editing hosts
    + '[contenteditable]';

  return selector;
});