
// redirect the first focusin/focus event to the first tabbable element in context
export default function({eventName, trappedSequence}) {
  let disengage;

  const handleFocusEvent = function(event) {
    disengage();

    const sequence = trappedSequence();
    if (!sequence) {
      return;
    }

    if (sequence.indexOf(event.target) !== -1) {
      // we're focusing something in context, go back to sleep
      return;
    }

    // we blindly go for the first element, mostly because we don't
    // have any indication of direction at this point.
    sequence[0].focus();
  };

  // redirect the first focus (away from <body>) back to context
  document.addEventListener(eventName, handleFocusEvent, true);

  disengage = function() {
    document.removeEventListener(eventName, handleFocusEvent, true);
  };

  return { disengage };
}
