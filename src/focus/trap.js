
/*
    Trap focus within a given element, wrapping focus to first/last element when boundaries are hit.
    This is useful when making sure that you cannot escape a modal dialog.

    trapFocus(context) returns a function to disengage containing the focus.
    This function is also exposed on context._untrapFocusHandler;

    Having multiple (nested) contexts containing the focus is technically not possible.

    Note: It is, unlike the native <dialog> implementation in Blink,
    not possible to tab to the browser chrome while focusContain() is active.

    see http://www.w3.org/WAI/PF/aria-practices/#trap_focus_div
 */

import queryTabbable from '../dom/query-tabbable';
import focusFirst from './first';
import trapByFocusEvent from './trap.focusevent';
import trapByKeyEvent from './trap.keyevent';
import observeBodyFocus from './trap.observe-body';
import canDispatchFocusout from '../supports/focusout-event';

export default function trapFocus(context, _focusFirst) {
  var _handle = trapByFocusEvent.bind(context);
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
    _handle = trapByKeyEvent.bind(context);
    _event = 'keydown';
    _capture = false;
    // unlike focusout the keyevents can't detect when context lost focus
    observeBodyFocus(context);
  }

  var sequence = queryTabbable(context);
  if (!sequence.length) {
    // cannot contain focus in something without anything to focus
    return null;
  }

  context.addEventListener(_event, _handle, _capture);
  context._untrapFocusHandler = function untrapFocus() {
    context.removeEventListener(_event, _handle, _capture);
    delete context._untrapFocusHandler;

    context._undoObserveBodyFocus && context._undoObserveBodyFocus();
    context._undoCaptureBodyFocus && context._undoCaptureBodyFocus();
  };

  if (_focusFirst) {
    focusFirst(sequence);
  }

  return context._untrapFocusHandler;
}
