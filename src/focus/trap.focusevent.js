define(function defineFocusTrapByFocusEvent(require) {
  'use strict';

  var queryTabbable = require('../dom/query-tabbable');
  var captureBodyFocus = require('./trap.capture-body');

  function handleTrapByFocusEvent(event) {
    /*jshint validthis:true */
    var unrelated = event.relatedTarget === null || event.relatedTarget === this.ownerDocument;

    // if there is no related target, we're focusing <body>, which is ok,
    // but once <body> loses focus again, we need to retarget focus to context
    if (unrelated) {
      captureBodyFocus(this, 'focusin');
      return;
    }

    // Node.compareDocumentPosition is available since IE9
    if (this.compareDocumentPosition(event.relatedTarget) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      // the focus target is within the context, all is fine, go back to sleep
      return;
    }

    var sequence = queryTabbable(this);
    if (!sequence.length) {
      // the context might've become void meanwhile
      this._untrapFocusHandler && this._untrapFocusHandler();
      return;
    }

    // true if relatedTarget follows target in the DOM, false if it preceeds it
    // true if there was no relatedTarget (forcing first element to be selected)
    var forward = unrelated || event.target.compareDocumentPosition(event.relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING;
    // jump to first or last element
    var target = sequence[forward ? 0 : (sequence.length -1)];
    target.focus();
  }

  return handleTrapByFocusEvent;
});