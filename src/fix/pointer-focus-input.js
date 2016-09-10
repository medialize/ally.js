/*
  Clicking on form field does not necessarily assign it focus in Safari and Firefox on Mac OS X.
  While not a browser bug, it may be considered undesired behavior.

  https://bugs.webkit.org/show_bug.cgi?id=22261
  https://bugs.webkit.org/show_bug.cgi?id=118043

  Note: This behavior can be turned off in Firefox by changing the
  option `accessibility.mouse_focuses_formcontrol` in about:config
*/

import getFocusTarget from '../get/focus-target';
import decorateContext from '../util/decorate-context';
import elementMatches from '../util/element-matches';
import platform from '../util/platform';

let engage;
let disengage;
// This fix is only relevant to Safari and Firefox on OSX
const relevantToCurrentBrowser = platform.is.OSX && (platform.is.GECKO || platform.is.WEBKIT);

if (!relevantToCurrentBrowser) {
  engage = function() {};
} else {
  const handleMouseDownEvent = function(event) {
    if (event.defaultPrevented || !elementMatches(event.target, 'input, button, button *')) {
      // abort if the mousedown event was cancelled,
      // or we're not dealing with an affected form control
      return;
    }

    const target = getFocusTarget({
      context: event.target,
    });

    // we need to set focus AFTER the mousedown finished, otherwise WebKit will ignore the call
    (window.setImmediate || window.setTimeout)(function() {
      target.focus();
    });
  };

  const handleMouseUpEvent = function(event) {
    if (event.defaultPrevented || !elementMatches(event.target, 'label, label *')) {
      // abort if the mouseup event was cancelled,
      // or we're not dealing with a <label>
      return;
    }

    const target = getFocusTarget({
      context: event.target,
    });

    if (!target) {
      return;
    }

    target.focus();
  };

  engage = function(element) {
    element.addEventListener('mousedown', handleMouseDownEvent, false);
    // <label> elements redirect focus upon mouseup, not mousedown
    element.addEventListener('mouseup', handleMouseUpEvent, false);
  };

  disengage = function(element) {
    element.removeEventListener('mousedown', handleMouseDownEvent, false);
    element.removeEventListener('mouseup', handleMouseUpEvent, false);
  };
}

export default decorateContext({ engage, disengage });
