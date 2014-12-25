define(function defineFocusContain(require) {
  'use strict';

  /*
      Contain focus within a given element, wrapping focus to first/last element when boundaries are hit.
      This is useful when making sure that you cannot escape a modal dialog.

      focusContain(context) returns a function to disengage containing the focus.
      This function is also exposed on context._unregisterContainFocusHandler;

      Having multiple (nested) contexts containing the focus is technically possible.

      Note: It is, unlike the native <dialog> implementation in Blink,
      not possible to tab to the browser chrome while focusContain() is active.
   */

  var queryTabbable = require('../dom/query-tabbable');
  var containByFocusEvent = require('./contain/contain-by-focusevent');
  var containByKeyEvent = require('./contain/contain-by-keyevent');
  var canDispatchFocusout = require('../supports/focusout-event');

  function contain(context, focusFirst) {
    var _handle = containByFocusEvent.bind(context);
    var _event = 'focusout';
    var _capture = true;

    // Gecko and Trident don't expose relatedTarget on blur events and it does not support focusout
    // so there is no way to react to a focus event before it actually happened. We cannot
    // focus another element in a focus handler, because that would emit two FocusEvents to
    // the Accessibility API and cause screen readers to alert two focus changes where only
    // one should've happened. That's why we intercept the KeyEvent and do things manually…
    //  Gecko: https://bugzilla.mozilla.org/show_bug.cgi?id=687787 (implement FocusEvent(focusout))
    //  Gecko: https://bugzilla.mozilla.org/show_bug.cgi?id=962251 (no FocusEvent(blur).relatedTarget)
    //  Trident: https://connect.microsoft.com/IE/Feedback/Details/814285 (no FocusEvent(blur).relatedTarget)
    //  Blink: https://code.google.com/p/chromium/issues/detail?id=378163 (about to remove FocusEvent(focusout)?)
    if (!context.compareDocumentPosition || !canDispatchFocusout) {
      _handle = containByKeyEvent.bind(context);
      _event = 'keydown';
      _capture = false;
    }

    var sequence = queryTabbable(context);
    if (!sequence.length) {
      // cannot contain focus in something without anything to focus
      return null;
    }

    context.addEventListener(_event, _handle, _capture);
    context._unregisterContainFocusHandler = function unregisterContainFocus() {
      context.removeEventListener(_event, _handle, _capture);
      delete context._unregisterContainFocusHandler;
    };

    if (focusFirst) {
      sequence[0].focus();
    }

    return context._unregisterContainFocusHandler;
  };

  return contain;
});