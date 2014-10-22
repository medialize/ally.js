define(function defineFocusWrap(require) {
  'use strict';

  var tabbable = require('../dom/tabbable');

  function wrap(context, forward) {
    var sequence = tabbable(context);
    if (sequence[0] === event.target && !forward) {
      // is first element of sequence and we're going backwards
      sequence[sequence.length - 1].focus();
      return true;
    } else if (sequence[sequence.length - 1] === event.target && forward) {
      // is last element of sequence and we're going forward
      sequence[0].focus();
      return true;
    }

    // element is somewhere in the middle of the sequence, no need to interfere
    return false;
  }

  return wrap;
});