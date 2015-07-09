
import captureBodyFocus from './trap.capture-body';

// as FocusEvent.relatedTarget is not reliable, we'll engage focus capturing via a timeout
// that is aborted by focus - that way, only a blur that causes the <body> to receive focus
// will trigger the focus capture
// this is only necessary for KeyEvent handling, as focusout already covers this case
export default function observeBodyFocus(context) {
  var timer;

  // after events are handled and <body> has focus, make any focus redirect to the context
  function handleContextBlur() {
    timer = (window.setImmediate || window.setTimeout)(function() {
      // this would allow focusing elements outside of context,
      // but that should have been prevented by a non-click-through-backdrop anyway
      // if (document.activeElement !== document.body) {
      //   return;
      // }

      if (context.compareDocumentPosition) {
        if (context.compareDocumentPosition(document.activeElement) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
          // the focus target is within the context, all is fine, go back to sleep
          return;
        }
      }

      if (document.activeElement !== document.body) {
        // we have focused something we were not supposed to be able to focus
        // instead of forcing focus right back into context, we'll allow focus on <body>
        document.activeElement.blur();
      }

      captureBodyFocus(context, 'focus');
    });
  }

  // disengage focus redirection registration initiated by the blur event
  function handleContextFocus() {
    (window.clearImmediate || window.clearTimeout)(timer);
  }

  context.addEventListener('blur', handleContextBlur, true);
  context.addEventListener('focus', handleContextFocus, true);

  context._undoObserveBodyFocus = function undoObserveBodyFocus() {
    context.removeEventListener('blur', handleContextBlur, true);
    context.removeEventListener('focus', handleContextFocus, true);
    delete context._undoObserveBodyFocus;
  };
}
