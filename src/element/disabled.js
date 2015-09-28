
/*
  Utility to make any element inert (disabled). Inert means the elements cannot be interacted
  with and they cannot be focused via script, pointer or keyboard - and thus not receive focus.

  Elements made inert (disabled) by this utility are given the attribute [data-ally-disabled="true"].

  ---------------

  inert attribute was [removed](https://html5.org/r/8536) [tweet by steve](https://twitter.com/stevefaulkner/status/443075900201259008)
  but definition of [inert subtrees](http://www.w3.org/html/wg/drafts/html/master/editing.html#inert-subtrees) remains.

  [implementation idea by Vasilis](http://codepen.io/vasilisvg/pen/scowI)
  [inert attribute polyfill by GoogleChrome](https://github.com/GoogleChrome/inert-polyfill)

  [Gecko Bug: Inert Attribute](https://bugzilla.mozilla.org/show_bug.cgi?id=921504)
  [Chromium Bug: Inert Attribute](https://code.google.com/p/chromium/issues/detail?id=269846)
  [Chromium Bug: Inert Subtree](https://code.google.com/p/chromium/issues/detail?id=241699)
  [WebKit Bug: Inert Subtree](https://bugs.webkit.org/show_bug.cgi?id=110952)
*/

import tabindexValue from '../util/tabindex-value';
import isNativeDisabledSupported from '../is/native-disabled-supported';

function disabledFocus() {
  /*eslint-disable no-console */
  console.warn('trying to focus inert element', this);
  /*eslint-enable no-console */
}

function restoreAttributeValue(element, sourceAttribute, targetAttribute) {
  const value = element.getAttribute(sourceAttribute);
  element.removeAttribute(sourceAttribute);
  if (value === '') {
    element.removeAttribute(targetAttribute);
  } else {
    element.setAttribute(targetAttribute, value);
  }
}

function toggleAttributeValue(element, attribute, value) {
  const temporaryAttribute = 'data-inert-' + attribute;
  if (value !== null) {
    const _value = element.getAttribute(attribute);
    element.setAttribute(temporaryAttribute, _value || '');
    element.setAttribute(attribute, value);
  } else {
    restoreAttributeValue(element, temporaryAttribute, attribute);
  }
}

function disableTabindex(element, disabledState) {
  if (disabledState) {
    const tabIndex = tabindexValue(element);
    element.setAttribute('data-inert-tabindex', tabIndex !== null ? tabIndex : '');
    // remove element from sequential focus navigation order
    element.setAttribute('tabindex', '-1');
  } else {
    restoreAttributeValue(element, 'data-inert-tabindex', 'tabindex');
  }
}

function disableVideoControls(element, disabledState) {
  // Chrome leaves <video controls tabindex="-1"> in document focus navigation sequence
  const nodeName = element.nodeName.toLowerCase();
  if (nodeName !== 'video' && nodeName !== 'audio') {
    return;
  }

  if (disabledState) {
    if (element.hasAttribute('controls')) {
      element.setAttribute('data-inert-controls', '');
      element.removeAttribute('controls');
    }
  } else {
    const restoreControls = element.hasAttribute('data-inert-controls');
    if (restoreControls) {
      element.removeAttribute('data-inert-controls');
      element.setAttribute('controls', '');
    }
  }
}

function disableSvgFocusable(element, disabledState) {
  const nodeName = element.nodeName.toLowerCase();
  if (nodeName !== 'svg' && !element.ownerSVGElement) {
    return;
  }

  toggleAttributeValue(element, 'focusable', disabledState ? 'false' : null);
}

function setAriaDisabled(element, disabledState) {
  toggleAttributeValue(element, 'aria-disabled', disabledState ? 'true' : null);
}

function disableScriptFocus(element, disabledState) {
  if (disabledState) {
    // make sure no script can focus the element
    element.focus = disabledFocus;
  } else {
    // restore original focus function from prototype
    delete element.focus;
  }
}

function disablePointerEvents(element, disabledState) {
  if (disabledState) {
    // remember previous pointer events status so we can restore it
    const pointerEvents = element.style.pointerEvents || '';
    element.setAttribute('data-inert-pointer-events', pointerEvents);
    // make sure no pointer interaction can access the element
    element.style.pointerEvents = 'none';
  } else {
    // restore to previous pointer interaction status
    const pointerEvents = element.getAttribute('data-inert-pointer-events');
    element.removeAttribute('data-inert-pointer-events');
    element.style.pointerEvents = pointerEvents;
  }
}

function setElementDisabled(element, disabledState) {
  setAriaDisabled(element, disabledState);
  disableTabindex(element, disabledState);
  disableScriptFocus(element, disabledState);
  disablePointerEvents(element, disabledState);
  disableVideoControls(element, disabledState);
  disableSvgFocusable(element, disabledState);

  if (disabledState) {
    element.setAttribute('data-ally-disabled', 'true');
  } else {
    element.removeAttribute('data-ally-disabled');
  }
}

export default function(element, disabledState) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('element/disabled requires an argument of type Element');
  }

  // accept truthy/falsy values
  disabledState = Boolean(disabledState);
  const currentState = element.hasAttribute('data-ally-disabled');
  // if there's no value to set, we're running as a getter
  const runningAsGetter = arguments.length === 1;

  if (isNativeDisabledSupported(element)) {
    if (runningAsGetter) {
      return element.disabled;
    }

    // form elements know the disabled attribute, which we shall use instead of our poor man's copy of it
    element.disabled = disabledState;
    return element;
  }

  if (runningAsGetter) {
    return currentState;
  }

  if (currentState === disabledState) {
    // no update necessary
    return element;
  }

  setElementDisabled(element, disabledState);
  return element;
}
