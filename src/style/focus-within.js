
/*
  add .ally-focus-within class to parents of document.activeElement,
  to provide the functionality of :focus-within where it's not available
  see https://dev.w3.org/csswg/selectors-4/#the-focus-within-pseudo

  USAGE:
    style/focus-within()
*/

import { addClass, removeClass } from '../util/toggle-class';
import shadowFocus from '../event/shadow-focus';
import getActiveElements from '../get/active-elements';
import getParents from '../get/parents';
import decorateService from '../util/decorate-service';
import selectInShadows from '../util/select-in-shadows';

import _supports from '../supports/supports';
let supports;

// preferring focusin/out because they are synchronous in IE10+11
const supportsFocusIn = typeof document !== 'undefined' && 'onfocusin' in document;
const focusEventName = supportsFocusIn ? 'focusin' : 'focus';
const blurEventName = supportsFocusIn ? 'focusout' : 'blur';

const className = 'ally-focus-within';
// defined in engage();
let selector;
let blurTimer;
let shadowHandle;

function applyFocusWithinClass(active) {
  let _active = active || getActiveElements();
  if (!supports.cssShadowPiercingDeepCombinator) {
    // no shadow-piercing descendant selector, no joy
    _active = _active.slice(-1);
  }

  // identify the elements that currently have :focus-within
  const _current = [].slice.call(document.querySelectorAll(selector), 0);
  // get the path (ancestry) of each ShadowRoot and merge them into a flat list
  const elements = _active.map((context) => getParents({context})).reduce(function(previous, current) {
    return current.concat(previous);
  }, []);

  // remove the class only from elements that would not receive it again (minimize dom action)
  _current.forEach(function(element) {
    if (elements.indexOf(element) !== -1) {
      return;
    }

    removeClass(element, className);
  });

  // apply the class only to elements that do not yet have it (minimize dom action)
  elements.forEach(function(element) {
    if (_current.indexOf(element) !== -1) {
      return;
    }

    addClass(element, className);
  });
}

function handleDocumentBlurEvent() {
  // we won't get a focus for <body>, but a delayed blur handler will achieve
  // the same thing listening for focus would've done, unless we get a focus, of course
  blurTimer = (window.setImmediate || window.setTimeout)(function() {
    applyFocusWithinClass();
  });
}

function handleDocumentFocusEvent() {
  // abort any handlers that come from document or element blur handlers
  (window.clearImmediate || window.clearTimeout)(blurTimer);
  // NOTE: we could overcome Firefox 34 issue of not supporting ShadowRoot.host by
  // passing event.target (which references the first-level ShadowHost), but that
  // would require applyFocusWithinClass() to distinguish between the argument and
  // getActiveElements().
  applyFocusWithinClass();
}

function handleShadowFocusEvent(event) {
  applyFocusWithinClass(event.detail.elements);
}

function disengage() {
  shadowHandle && shadowHandle.disengage();
  (window.clearImmediate || window.clearTimeout)(blurTimer);
  document.removeEventListener(blurEventName, handleDocumentBlurEvent, true);
  document.removeEventListener(focusEventName, handleDocumentFocusEvent, true);
  document.removeEventListener('shadow-focus', handleShadowFocusEvent, true);

  // remove any remaining ally-within-focus occurrences
  [].forEach.call(document.querySelectorAll(selector), function(element) {
    removeClass(element, className);
  });
}

function engage() {
  if (!supports) {
    supports = _supports();
    selector = selectInShadows('.' + className);
  }

  shadowHandle = shadowFocus();
  document.addEventListener(blurEventName, handleDocumentBlurEvent, true);
  document.addEventListener(focusEventName, handleDocumentFocusEvent, true);
  document.addEventListener('shadow-focus', handleShadowFocusEvent, true);
  applyFocusWithinClass();
}

export default decorateService({ engage, disengage });
