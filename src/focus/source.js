
/*
  what is this?
*/

// TODO: touches detection in interaction-type-listener line 55

import '../event/shadow-focus';
import engageInteractionTypeListener from '../event/interaction-type-listener';

// interface to read interaction-type-listener state
var listener;
// prevent multiple "phyiscal" instances but act like you could have multiple
var _engaged = 0;
// keep track of last focus source
var current = null;
// overwrite focus source for use with the every upcoming focus event
var lock = null;
// overwrite focus source for use with the next focus event
var next = null;
// keep track of ever having used a particular input method to change focus
var used = {
  pointer: false,
  key: false,
  script: false,
  initial: false,
};

function handleFocusEvent(event) {
  var source = '';
  if (event.type === 'focus' || event.type === 'shadow-focus') {
    var interactionType = listener.get();
    source = lock || next
      || interactionType.pointer && 'pointer'
      || interactionType.key && 'key'
      || 'script';

    // next focus source is set only once
    next = null;
  } else if (event.type === 'initial') {
    source = 'initial';
  }

  document.documentElement.setAttribute('data-focus-source', source);

  if (event.type !== 'blur') {
    if (!used[source]) {
      document.documentElement.classList.add('focus-source-' + source);
    }

    used[source] = true;
    current = source;
  }
}

function getCurrentFocusSource() {
  return current;
}

function getUsedFocusSource(source) {
  return used[source];
}

function repeatFocusSource(source) {
  next = source === false ? null : current;
}

function setNextFocusSource(source) {
  next = source;
}

function lockFocusSource(source) {
  lock = source;
}

function disengageFocusSourceListener(force) {
  _engaged--;
  if (_engaged && force !== true) {
    // someone is still using the listener, so don't kill it just yet
    return;
  }

  // reset to former state
  handleFocusEvent({type: 'blur'});
  listener.disengage();
  document.removeEventListener('shadow-focus', handleFocusEvent, true);
  document.documentElement.removeEventListener('focus', handleFocusEvent, true);
  document.documentElement.removeEventListener('blur', handleFocusEvent, true);
}

export default function engageFocusSourceListener() {
  if (!_engaged) {
    listener = engageInteractionTypeListener();
    handleFocusEvent({type: 'initial'});
    // handlers to modify the focused element
    document.addEventListener('shadow-focus', handleFocusEvent, true);
    document.documentElement.addEventListener('focus', handleFocusEvent, true);
    document.documentElement.addEventListener('blur', handleFocusEvent, true);
  }

  _engaged++;
  return {
    used: getUsedFocusSource,
    current: getCurrentFocusSource,
    next: setNextFocusSource,
    lock: lockFocusSource,
    repeat: repeatFocusSource,
    disengage: disengageFocusSourceListener,
  };
}
