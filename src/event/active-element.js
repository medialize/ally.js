
/*
  Debugging tool that observe changes to activeElement regardless of focus/blur events.
  This utility does *not* work with ShadowDOM.

  USAGE:
    engage();
    document.body.addEventListener('active-element', function(event) {
      // event.detail.focus: element that received focus
      // event.detail.blur: element that lost focus
    }, false);

  NOTE: You *can* use event-delegation on focus events by using the capture-phase:
    document.body.addEventListener('focus', function(event) {
      // event.target: element that received focus
      // event.relatedTarget: element that lost focus
    }, true);
*/

import '../prototype/window.requestanimationframe';
import CustomEvent from '../prototype/window.customevent';
import decorateService from '../util/decorate-service';

let previousActiveElement;
let raf;

function observeActiveElement() {
  if (!document.activeElement) {
    // IE10 does not redirect focus to <body> when the activeElement is removed
    document.body.focus();
  } else if (document.activeElement !== previousActiveElement) {
    // https://developer.mozilla.org/en/docs/Web/API/CustomEvent
    const activeElementEvent = new CustomEvent('active-element', {
      bubbles: false,
      cancelable: false,
      detail: {
        focus: document.activeElement,
        blur: previousActiveElement,
      },
    });

    document.dispatchEvent(activeElementEvent);
    previousActiveElement = document.activeElement;
  }

  if (raf === false) {
    return;
  }

  raf = requestAnimationFrame(observeActiveElement);
}

function engage() {
  raf = true;
  previousActiveElement = document.activeElement;
  observeActiveElement();
}

function disengage() {
  cancelAnimationFrame(raf);
  raf = false;
}

export default decorateService({ engage, disengage });
