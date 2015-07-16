
/*
    Intercept <kbd>Tab</kbd> and <kbd>Shift Tab</kbd> to change focus target when required.
    This is a sub-optimal implementation that should only be used if either FocusEvent.relatedTarget
    or Node.compareDocumentPosition are not supported properly.
    If they are, go with contain-by-focusevent instead!
 */

import queryTabbable from '../query/tabbable';
import keycode from '../map/keycode';

function wrap(sequence, element, forward) {
  if (sequence[0] === element && !forward) {
    // is first element of sequence and we're going backwards
    sequence[sequence.length - 1].focus();
    return true;
  } else if (sequence[sequence.length - 1] === element && forward) {
    // is last element of sequence and we're going forward
    sequence[0].focus();
    return true;
  } else if (sequence.indexOf(element) === -1) {
    // target is not part of the sequence, go to first
    sequence[0].focus();
    return true;
  }

  // element is somewhere in the middle of the sequence, no need to interfere
  return false;
}

export default function handleTrapByKeyEvent(event) {
  var code = event.which || event.keyCode;
  if (code !== keycode.tab) {
    return;
  }

  var sequence = queryTabbable({context: this});
  if (!sequence.length) {
    // the context might've become void meanwhile
    this._untrapFocusHandler && this._untrapFocusHandler();
    return;
  }

  if (wrap(sequence, event.target, !event.shiftKey)) {
    event.preventDefault();
  }
}
