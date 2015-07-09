
import queryTabbable from '../dom/query-tabbable';

// redirect the first focusin/focus event to the first tabbable element in context
export default function captureBodyFocus(context, eventName) {
  function handleFocusEvent(event) {
    context._undoCaptureBodyFocus && context._undoCaptureBodyFocus();
    var sequence = queryTabbable(context);
    if (!sequence.length) {
      // the context might've become void meanwhile
      context._untrapFocusHandler && context._untrapFocusHandler();
      return;
    }

    if (sequence.indexOf(event.target) !== -1) {
      // we're focusing something in context, go back to sleep
      return;
    }

    // we blindly go for the first element, mostly because we don't
    // have any indication of direction at this point.
    sequence[0].focus();
  }

  // redirect the first focus (away from <body>) back to context
  document.addEventListener(eventName, handleFocusEvent, true);

  context._undoCaptureBodyFocus = function undoCaptureBodyFocus() {
    document.removeEventListener(eventName, handleFocusEvent, true);
    delete context._undoCaptureBodyFocus;
  };
}
