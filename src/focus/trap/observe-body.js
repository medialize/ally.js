
import captureBodyFocus from '.capture-body';

// as FocusEvent.relatedTarget is not reliable, we'll engage focus capturing via a timeout
// that is aborted by focus - that way, only a blur that causes the <body> to receive focus
// will trigger the focus capture
// this is only necessary for KeyEvent handling, as focusout already covers this case
export default function({element, trappedSequence}) {
  let timer;
  let bodyFocusHandle;

  // after events are handled and <body> has focus, make any focus redirect to the context
  function handleElementBlur() {
    timer = (window.setImmediate || window.setTimeout)(function() {
      // this would allow focusing elements outside of context,
      // but that should have been prevented by a non-click-through-backdrop anyway
      // if (document.activeElement !== document.body) {
      //   return;
      // }

      if (element.compareDocumentPosition) {
        if (element.compareDocumentPosition(document.activeElement) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
          // the focus target is within the context, all is fine, go back to sleep
          return;
        }
      }

      if (document.activeElement !== document.body) {
        // we have focused something we were not supposed to be able to focus
        // instead of forcing focus right back into context, we'll allow focus on <body>
        document.activeElement.blur();
      }

      bodyFocusHandle = captureBodyFocus({
        eventName: 'focus',
        trappedSequence,
      });
    });
  }

  // disengage focus redirection registration initiated by the blur event
  function handleElementFocus() {
    (window.clearImmediate || window.clearTimeout)(timer);
  }

  element.addEventListener('blur', handleElementBlur, true);
  element.addEventListener('focus', handleElementFocus, true);

  const disengage = function() {
    element.removeEventListener('blur', handleElementBlur, true);
    element.removeEventListener('focus', handleElementFocus, true);
    bodyFocusHandle && bodyFocusHandle.disengage();
  };

  return { disengage };
}
