// NOTE: this selector MUST *never* be used directly,
// always go through query/focusable or is/focusable.js
// there are too many edge cases that they could be covered in
// a simple CSS selector…

import selectInShadows from '../util/select-in-shadows';

import _supports from '../supports/supports';
let supports;

let selector;

export default function() {
  if (!supports) {
    supports = _supports();
  }

  if (typeof selector === 'string') {
    return selector;
  }

  // https://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  selector = ''
    // IE11 supports.can focus <table> and <td>
    + (supports.focusTable ? 'table, td,' : '')
    // IE11 supports.can focus <fieldset>
    + (supports.focusFieldset ? 'fieldset,' : '')
    // Namespace problems of [xlink:href] explained in https://stackoverflow.com/a/23047888/515124
    // svg a[*|href] does not match in IE9, but since we're filtering
    // through is/focusable we can include all <a> from SVG
    + 'svg a,'
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
    + (supports.focusAudioWithoutControls ? 'audio,' : 'audio[controls],')
    + (supports.focusVideoWithoutControls ? 'video,' : 'video[controls],')
    + (supports.focusSummary ? 'summary,' : '')
    // validity determined by is/valid-tabindex.js
    + '[tabindex],'
    // editing hosts
    + '[contenteditable]';

  // where ShadowDOM is supported, we also want the shadowed focusable elements (via ">>>" or "/deep/")
  selector = selectInShadows(selector);

  return selector;
}
