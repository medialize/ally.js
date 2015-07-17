
import captureBodyFocus from '.capture-body';

export default function handleTrapByFocusEvent({event, element, trappedSequence}) {
  const unrelated = event.relatedTarget === null || event.relatedTarget === element.ownerDocument;

  // if there is no related target, we're focusing <body>, which is ok,
  // but once <body> loses focus again, we need to retarget focus to context
  if (unrelated) {
    captureBodyFocus({
      eventName: 'focusin',
      trappedSequence,
    });
    return;
  }

  // Node.compareDocumentPosition is available since IE9
  if (element.compareDocumentPosition(event.relatedTarget) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
    // the focus target is within the context, all is fine, go back to sleep
    return;
  }

  const sequence = trappedSequence();
  if (!sequence) {
    return;
  }

  // true if relatedTarget follows target in the DOM, false if it preceeds it
  // true if there was no relatedTarget (forcing first element to be selected)
  const forward = unrelated || event.target.compareDocumentPosition(event.relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING;
  // jump to first or last element
  const target = sequence[forward ? 0 : (sequence.length - 1)];
  target.focus();
}
