
/*
  what is this?
*/

// TODO: touches detection in interaction-type-listener line 55

import shadowFocus from '../event/shadow-focus';
import engageInteractionTypeObserver from '../observe/interaction-type';
import decorateSingleton from '../util/decorate-singleton';

// interface to read interaction-type-listener state
let interactionTypeHandler;
let shadowHandle;
// keep track of last focus source
let current = null;
// overwrite focus source for use with the every upcoming focus event
let lock = null;
// overwrite focus source for use with the next focus event
let next = null;
// keep track of ever having used a particular input method to change focus
let used = {
  pointer: false,
  key: false,
  script: false,
  initial: false,
};

function handleFocusEvent(event) {
  let source = '';
  if (event.type === 'focus' || event.type === 'shadow-focus') {
    const interactionType = interactionTypeHandler.get();
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

function disengage() {
  // clear dom state
  handleFocusEvent({type: 'blur'});
  // kill interaction type identification listener
  interactionTypeHandler.disengage();
  // kill shadow-focus event dispatcher
  shadowHandle.disengage();
  document.removeEventListener('shadow-focus', handleFocusEvent, true);
  document.documentElement.removeEventListener('focus', handleFocusEvent, true);
  document.documentElement.removeEventListener('blur', handleFocusEvent, true);
}

function engage() {
  // enable the shadow-focus event dispatcher
  shadowHandle = shadowFocus();
  // handlers to modify the focused element
  document.addEventListener('shadow-focus', handleFocusEvent, true);
  // enable the interaction type identification observer
  interactionTypeHandler = engageInteractionTypeObserver();
  // set up initial dom state
  handleFocusEvent({type: 'initial'});
  document.documentElement.addEventListener('focus', handleFocusEvent, true);
  document.documentElement.addEventListener('blur', handleFocusEvent, true);

  return {
    used: getUsedFocusSource,
    current: getCurrentFocusSource,
    next: setNextFocusSource,
    lock: lockFocusSource,
    repeat: repeatFocusSource,
  };
}

export default decorateSingleton({ engage, disengage });
