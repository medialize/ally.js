/*
 * Clicking on form field does not necessarily assign it focus in Safari and Firefox on Mac OS X.
 * While not a browser bug, it may be considered undesired behavior.
 */
/*jshint unused:vars */
define(function defineFixBrowserPointerFocusInput(require) {
  'use strict';

  // This fix is only relevant to Safari and Firefox on OSX
  var userAgent = window.navigator.userAgent;
  var engage = userAgent.indexOf('Mac OS X') !== -1 && (userAgent.indexOf('Version/') !== -1 || userAgent.indexOf('Firefox/') !== -1);
  if (!engage) {
    return function fixPointerFocusParentNotAppliccable() {
      return function undoFixPointerFocusParentNotAppliccable(){};
    };
  }

  var inputPattern = /^(input|button)$/;

  function handleMouseDownEvent(event) {
    if (event.defaultPrevented || !event.target.nodeName.toLowerCase().match(inputPattern)) {
      // abort if the mousedown event was cancelled
      return;
    }

    // we need to set focus AFTER the mousedown finished, otherwise WebKit will ignore the call
    (window.setImmediate || window.setTimeout)(function() {
      event.target.focus();
    });
  }

  function handleMouseUpEvent(event) {
    if (event.defaultPrevented || event.target.nodeName.toLowerCase() !== 'label') {
      // abort if the mouseup event was cancelled
      return;
    }

    // <label> will redirect focus to the appropriate input element on its own
    event.target.focus();
  }

  function fixPointerFocusInput(context) {
    context.addEventListener('mousedown', handleMouseDownEvent, false);
    // <label> elements redirect focus upon mouseup, not mousedown
    context.addEventListener('mouseup', handleMouseUpEvent, false);

    return function undoFixPointerFocusInput() {
      context.removeEventListener('mousedown', handleMouseDownEvent, false);
      context.removeEventListener('mouseup', handleMouseUpEvent, false);
    };
  }

  return fixPointerFocusInput;
});