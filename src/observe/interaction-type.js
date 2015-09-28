
/*
  Observe keyboard-, pointer-, mouse- and touch-events so that a query for
  the current interaction type can be made at any time. For pointer interaction
  this observer is limited to pointer button down/up - move is not observed!

  USAGE:
    var listener = engage();
    listener.get() === {pointer: Boolean, key: Boolean}
*/

import decorateService from '../util/decorate-service';

// counters to track primary input
let _activePointers = 0;
let _activeKeys = 0;

const pointerStartEvents = [
  'touchstart',
  'pointerdown',
  'MSPointerDown',
  'mousedown',
];
const pointerEndEvents = [
  'touchend',
  'touchcancel',
  'pointerup',
  'MSPointerUp',
  'pointercancel',
  'MSPointerCancel',
  'mouseup',
];

function handleWindowBlurEvent() {
  // reset internal counters when window loses focus
  _activePointers = 0;
  _activeKeys = 0;
}

function handlePointerStartEvent(event) {
  if (event.isPrimary === false) {
    // ignore non-primary pointer events
    // https://w3c.github.io/pointerevents/#widl-PointerEvent-isPrimary
    return;
  }

  // mousedown without following mouseup
  // (likely not possible in Chrome)
  _activePointers++;
}

function handlePointerEndEvent(event) {
  if (event.isPrimary === false) {
    // ignore non-primary pointer events
    // https://w3c.github.io/pointerevents/#widl-PointerEvent-isPrimary
    return;
  } else if (event.touches) {
    _activePointers = event.touches.length;
    return;
  }

  // delay reset to when the current handlers are executed
  (window.setImmediate || window.setTimeout)(function() {
    // mouseup without prior mousedown
    // (drag something out of the window)
    _activePointers = Math.max(_activePointers - 1, 0);
  });
}

function handleKeyStartEvent(event) {
  // ignore modifier keys
  switch (event.keyCode || event.which) {
    case 16: // space
    case 17: // control
    case 18: // alt
    case 91: // command left
    case 93: // command right
      return;
  }

  // keydown without a following keyup
  // (may happen on CMD+TAB)
  _activeKeys++;
}

function handleKeyEndEvent(event) {
  // ignore modifier keys
  switch (event.keyCode || event.which) {
    case 16: // space
    case 17: // control
    case 18: // alt
    case 91: // command left
    case 93: // command right
      return;
  }

  // delay reset to when the current handlers are executed
  (window.setImmediate || window.setTimeout)(function() {
    // keyup without prior keydown
    // (may happen on CMD+R)
    _activeKeys = Math.max(_activeKeys - 1, 0);
  });
}

function getInteractionType() {
  return {
    pointer: Boolean(_activePointers),
    key: Boolean(_activeKeys),
  };
}

function disengage() {
  _activePointers = _activeKeys = 0;
  window.removeEventListener('blur', handleWindowBlurEvent, false);
  document.documentElement.removeEventListener('keydown', handleKeyStartEvent, true);
  document.documentElement.removeEventListener('keyup', handleKeyEndEvent, true);
  pointerStartEvents.forEach(function(event) {
    document.documentElement.removeEventListener(event, handlePointerStartEvent, true);
  });
  pointerEndEvents.forEach(function(event) {
    document.documentElement.removeEventListener(event, handlePointerEndEvent, true);
  });
}

function engage() {
  // window blur must be in bubble phase so it won't capture regular blurs
  window.addEventListener('blur', handleWindowBlurEvent, false);
  // handlers to identify the method of focus change
  document.documentElement.addEventListener('keydown', handleKeyStartEvent, true);
  document.documentElement.addEventListener('keyup', handleKeyEndEvent, true);
  pointerStartEvents.forEach(function(event) {
    document.documentElement.addEventListener(event, handlePointerStartEvent, true);
  });
  pointerEndEvents.forEach(function(event) {
    document.documentElement.addEventListener(event, handlePointerEndEvent, true);
  });

  return {
    get: getInteractionType,
  };
}

export default decorateService({ engage, disengage });
