
/*
  add data-focus-source attribute to html element containing "key", "pointer" or "script"
  depending on the input method used to change focus.

  USAGE:
    style/focus-source()

    body :focus {
      outline: 1px solid grey;
    }

    html[data-focus-source="key"] body :focus {
      outline: 5px solid red;
    }

    html[data-focus-source="key"] body :focus {
      outline: 1px solid blue;
    }

  NOTE: I don't have a GamePad to test, if you do and you want to
  implement an observer for https://w3c.github.io/gamepad/ - send a PR!
*/

import shadowFocus from '../event/shadow-focus';
import engageInteractionTypeObserver from '../observe/interaction-type';
import decorateService from '../util/decorate-service';

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
  current = lock = next = null;
  Object.keys(used).forEach(function(key) {
    document.documentElement.classList.remove('focus-source-' + key);
    used[key] = false;
  });
  // kill interaction type identification listener
  interactionTypeHandler.disengage();
  // kill shadow-focus event dispatcher
  shadowHandle && shadowHandle.disengage();
  document.removeEventListener('shadow-focus', handleFocusEvent, true);
  document.documentElement.removeEventListener('focus', handleFocusEvent, true);
  document.documentElement.removeEventListener('blur', handleFocusEvent, true);
  document.documentElement.removeAttribute('data-focus-source');
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

export default decorateService({ engage, disengage });
