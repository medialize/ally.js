
// wrapper for HTMLElement.prototype.focus

import getFocusTarget from '../get/focus-target';
import isActiveElement from '../is/active-element';
import contextToElement from '../util/context-to-element';
import getWindow from '../util/get-window';

export default function(context) {
  const element = contextToElement({
    label: 'element/focus',
    context,
  });

  const target = getFocusTarget({
    context: element,
    except: {
      // exclude elements affected by the IE flexbox bug
      flexbox: true,
      // exclude overflowing elements that are not intentionally
      // made focusable by adding a tabindex attribute
      scrollable: true,
      // include elements that don't have a focus() method
      onlyTabbable: true,
    },
  });

  if (!target) {
    return null;
  }

  if (isActiveElement(target)) {
    return target;
  }

  if (target.focus) {
    target.focus();
    return isActiveElement(target) ? target : null;
  }

  const _window = getWindow(target);

  try {
    // The element itself does not have a focus method.
    // This is true for SVG elements in Firefox and IE,
    // as well as MathML elements in every browser.
    // IE9 - 11 will let us abuse HTMLElement's focus method,
    // Firefox and Edge will throw an error.
    _window.HTMLElement.prototype.focus.call(target);
    return target;
  } catch (e) {
    return null;
  }
}
