
/*
  Utility to make any element inert (disabled). Inert means the elements cannot be interacted
  with and they cannot be focused via script, pointer or keyboard - and thus not receive focus.

  Elements made inert (disabled) by this utility are given the attribute [data-ally-disabled="true"].

  ---------------

  inert attribute was [removed](https://html5.org/r/8536) [tweet by steve](https://twitter.com/stevefaulkner/status/443075900201259008)
  but definition of [inert subtrees](https://www.w3.org/html/wg/drafts/html/master/editing.html#inert-subtrees) remains.

  [implementation idea by Vasilis](https://codepen.io/vasilisvg/pen/scowI)
  [inert attribute polyfill by GoogleChrome](https://github.com/GoogleChrome/inert-polyfill)

  [Gecko Bug: Inert Attribute](https://bugzilla.mozilla.org/show_bug.cgi?id=921504)
  [Chromium Bug: Inert Attribute](https://code.google.com/p/chromium/issues/detail?id=269846)
  [Chromium Bug: Inert Subtree](https://code.google.com/p/chromium/issues/detail?id=241699)
  [WebKit Bug: Inert Subtree](https://bugs.webkit.org/show_bug.cgi?id=110952)
*/

import contextToElement from '../util/context-to-element';
import tabindexValue from '../util/tabindex-value';
import isNativeDisabledSupported from '../is/native-disabled-supported';
import toggleAttribute from '../util/toggle-attribute';
import toggleAttributeValue from '../util/toggle-attribute-value';
import logger from '../util/logger';

import _supports from '../supports/supports';
let supports;

function disabledFocus() {
  logger.warn('trying to focus inert element', this);
}

function disableTabindex(element, disabledState) {
  if (disabledState) {
    const tabIndex = tabindexValue(element);
    toggleAttributeValue({
      element,
      attribute: 'tabindex',
      temporaryValue: '-1',
      saveValue: tabIndex !== null ? tabIndex : '',
    });
  } else {
    toggleAttributeValue({
      element,
      attribute: 'tabindex',
    });
  }
}

function disableVideoControls(element, disabledState) {
  toggleAttribute({
    element,
    attribute: 'controls',
    remove: disabledState,
  });
}

function disableSvgFocusable(element, disabledState) {
  toggleAttributeValue({
    element,
    attribute: 'focusable',
    temporaryValue: disabledState ? 'false' : undefined,
  });
}

function disableSvgLink(element, disabledState) {
  toggleAttribute({
    element,
    attribute: 'xlink:href',
    remove: disabledState,
  });
}

function setAriaDisabled(element, disabledState) {
  toggleAttributeValue({
    element,
    attribute: 'aria-disabled',
    temporaryValue: disabledState ? 'true' : undefined,
  });
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

  const nodeName = element.nodeName.toLowerCase();
  if (nodeName === 'video' || nodeName === 'audio') {
    // Blink and Gecko leave <video controls tabindex="-1"> in document focus navigation sequence
    // Blink leaves <audio controls tabindex="-1"> in document focus navigation sequence
    disableVideoControls(element, disabledState);
  }

  if (nodeName === 'svg' || element.ownerSVGElement) {
    if (supports.focusSvgFocusableAttribute) {
      // Internet Explorer knows focusable="false" instead of tabindex="-1"
      disableSvgFocusable(element, disabledState);
    } else if (!supports.focusSvgTabindexAttribute && nodeName === 'a') {
      // Firefox neither knows focusable="false" nor tabindex="-1"
      disableSvgLink(element, disabledState);
    }
  }

  if (disabledState) {
    element.setAttribute('data-ally-disabled', 'true');
  } else {
    element.removeAttribute('data-ally-disabled');
  }
}

export default function(context, disabledState) {
  if (!supports) {
    supports = _supports();
  }

  const element = contextToElement({
    label: 'element/disabled',
    context,
  });

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
