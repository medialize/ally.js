
/*
  add .ally-focus-within class to parents of document.activeElement,
  to provide the functionality of :focus-within where it's not available
  see http://dev.w3.org/csswg/selectors-4/#the-focus-within-pseudo

  USAGE:
    style/focus-within()
*/

import shadowFocus from '../event/shadow-focus';
import cssShadowPiercingDeepCombinator from '../supports/css-shadow-piercing-deep-combinator';
import getActiveElements from '../get/active-elements';
import getParents from '../get/parents';
import decorateSingleton from '../util/decorate-singleton';

// NOTE: require classList polyfill may be necessary (not available on SVGElement)
// http://caniuse.com/#feat=classlist available since IE10
// https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills#classlist
// https://developer.mozilla.org/en-US/docs/Web/API/Element.classList

const className = 'ally-focus-within';
let blurTimer;
let shadowHandle;

function applyFocusWithinClass(active) {
  let _active = active || getActiveElements();
  let selector = '.' + className;
  if (cssShadowPiercingDeepCombinator) {
    // select elements in shadow dom as well
    selector += ', html ' + cssShadowPiercingDeepCombinator + ' ' + selector;
  } else {
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

    element.classList.remove(className);
  });

  // apply the class only to elements that do not yet have it (minimize dom action)
  elements.forEach(function(element) {
    if (_current.indexOf(element) !== -1) {
      return;
    }

    element.classList.add(className);
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
  shadowHandle.disengage();
  (window.clearImmediate || window.clearTimeout)(blurTimer);
  document.removeEventListener('blur', handleDocumentBlurEvent, true);
  document.removeEventListener('focus', handleDocumentFocusEvent, true);
  document.removeEventListener('shadow-focus', handleShadowFocusEvent, true);

  var selector = '.' + className;
  if (cssShadowPiercingDeepCombinator) {
    // select elements in shadow dom as well
    selector += ', html ' + cssShadowPiercingDeepCombinator + ' ' + selector;
  }

  // remove any remaining ally-within-focus occurrences
  [].forEach.call(document.querySelectorAll(selector), function(element) {
    element.classList.remove(className);
  });
}

function engage() {
  shadowHandle = shadowFocus();
  document.addEventListener('blur', handleDocumentBlurEvent, true);
  document.addEventListener('focus', handleDocumentFocusEvent, true);
  document.addEventListener('shadow-focus', handleShadowFocusEvent, true);
  applyFocusWithinClass();
}

export default decorateSingleton({ engage, disengage });
