// NOTE: this selector MUST *never* be used directly,
// always go through query/focusable or is/focusable.js
// there are too many edge cases that they could be covered in
// a simple CSS selector…

import '../prototype/svgelement.prototype.focus';

import _supports from './focusable.supports';
let supports;

let selector;

export default function() {
  if (!supports) {
    supports = _supports();
  }

  if (typeof selector === 'string') {
    return selector;
  }

  // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  selector = ''
    // IE11 supports.can focus <table> and <td>
    + (supports.canFocusTable ? 'table, td,' : '')
    // IE11 supports.can focus <fieldset>
    + (supports.canFocusFieldset ? 'fieldset,' : '')
    // Namespace problems of [xlink:href] explained in http://stackoverflow.com/a/23047888/515124
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
    + (supports.canFocusAudioWithoutControls ? 'audio,' : 'audio[controls],')
    + (supports.canFocusVideoWithoutControls ? 'video,' : 'video[controls],')
    + (supports.canFocusSummary ? 'summary,' : '')
    // validity determined by is/valid-tabindex.js
    + '[tabindex],'
    // editing hosts
    + '[contenteditable]';

  // where ShadowDOM is supported, we also want the shadowed focusable elements (via ">>>" or "/deep/")
  if (supports.cssShadowPiercingDeepCombinator) {
    selector += ', html ' + supports.cssShadowPiercingDeepCombinator + ' '
      + selector.replace(/\s*,\s*/g, ',').split(',').join(', html ' + supports.cssShadowPiercingDeepCombinator + ' ');
  }

  return selector;
}
