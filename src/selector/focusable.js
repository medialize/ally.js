// NOTE: this selector MUST *never* be used directly,
// always go through query/focusable or is/focusable.js
// there are too many edge cases that they could be covered in
// a simple CSS selector…

import '../prototype/svgelement.prototype.focus';

import canFocusAudioWithoutControls from '../supports/focus-audio-without-controls';
import canFocusVideoWithoutControls from '../supports/focus-video-without-controls';
import canFocusHtml from '../supports/focus-html';
import canFocusSvg from '../supports/focus-svg';
let canFocusSvgMethod = SVGElement.prototype.focus === HTMLElement.prototype.focus;
import canFocusTable from '../supports/focus-table';
import canFocusFieldset from '../supports/focus-fieldset';
import canFocusSummary from '../supports/focus-summary';
import cssShadowPiercingDeepCombinator from '../supports/css-shadow-piercing-deep-combinator';

// http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
let selector = 'body,'
  // Firefox, IE11 can focus <html>
  + (canFocusHtml ? 'html,' : '')
  // IE11 can focus <table> and <td>
  + (canFocusTable ? 'table, td,' : '')
  // IE11 can focus <fieldset>
  + (canFocusFieldset ? 'fieldset,' : '')
  // supporting <svg>
  + (canFocusSvgMethod && canFocusSvg ? 'svg,' : '')
  // Namespace problems of [xlink:href] explained in http://stackoverflow.com/a/23047888/515124
  // Firefox cannot focus <svg> child elements from script
  + (canFocusSvgMethod ? 'svg a[*|href],' : '')
  // may behave as 'svg, svg *,' in chrome as *every* svg element with a focus event listener is focusable
  // navigational elements
  + 'a[href],'
  // validity determined by is/valid-area.js
  + 'area[href],'
  // validity determined by is/disabled.js
  + 'input, select, textarea, button,'
  // browsing context containers
  + 'iframe, object, embed,'
  // interactive content
  + 'keygen,'
  + (canFocusAudioWithoutControls ? 'audio,' : 'audio[controls],')
  + (canFocusVideoWithoutControls ? 'video,' : 'video[controls],')
  + (canFocusSummary ? 'summary,' : '')
  // validity determined by is/valid-tabindex.js
  + '[tabindex],'
  // editing hosts
  + '[contenteditable]';

// where ShadowDOM is supported, we also want the shadowed focusable elements (via ">>>" or "/deep/")
if (cssShadowPiercingDeepCombinator) {
  selector += ', html ' + cssShadowPiercingDeepCombinator + ' '
    + selector.replace(/\s*,\s*/g, ',').split(',').join(', html ' + cssShadowPiercingDeepCombinator + ' ');
}

export default selector;
