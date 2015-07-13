/*
  Clicking on form field does not necessarily assign it focus in Safari and Firefox on Mac OS X.
  While not a browser bug, it may be considered undesired behavior.

  https://bugs.webkit.org/show_bug.cgi?id=22261
  https://bugs.webkit.org/show_bug.cgi?id=118043

  Note: This behavior can be turned off in Firefox by changing the
  option `accessibility.mouse_focuses_formcontrol` in about:config
*/

import decorateContext from '../util/decorate-context';

let engage;
let disengage;
const userAgent = window.navigator.userAgent;
// This fix is only relevant to Safari and Firefox on OSX
const relevantToCurrentBrowser = userAgent.indexOf('Mac OS X') !== -1
  && (userAgent.indexOf('Version/') !== -1 || userAgent.indexOf('Firefox/') !== -1);

if (!relevantToCurrentBrowser) {
  engage = function() {};
} else {
  const inputPattern = /^(input|button)$/;

  const handleMouseDownEvent = function(event) {
    if (event.defaultPrevented || !event.target.nodeName.toLowerCase().match(inputPattern)) {
      // abort if the mousedown event was cancelled
      return;
    }

    // we need to set focus AFTER the mousedown finished, otherwise WebKit will ignore the call
    (window.setImmediate || window.setTimeout)(function() {
      event.target.focus();
    });
  };

  const handleMouseUpEvent = function(event) {
    if (event.defaultPrevented || event.target.nodeName.toLowerCase() !== 'label') {
      // abort if the mouseup event was cancelled
      return;
    }

    // <label> will redirect focus to the appropriate input element on its own
    event.target.focus();
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
