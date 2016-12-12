
// wrapper for HTMLElement.prototype.blur

import isActiveElement from '../is/active-element';
import contextToElement from '../util/context-to-element';
import getWindow from '../util/get-window';

export default function(context) {
  const element = contextToElement({
    label: 'element/blur',
    context,
  });

  if (!isActiveElement(element)) {
    return null;
  }

  const nodeName = element.nodeName.toLowerCase();
  if (nodeName === 'body') {
    // prevent the browser window from losing focus in IE9
    // according to https://bugs.jqueryui.com/ticket/9420
    return null;
  }

  if (element.blur) {
    element.blur();
    return document.activeElement;
  }

  const _window = getWindow(element);

  try {
    // The element itself does not have a blur method.
    // This is true for SVG elements in Firefox and IE,
    // as well as MathML elements in every browser.
    // IE9 - 11 will let us abuse HTMLElement's blur method,
    // Firefox and Edge will throw an error.
    _window.HTMLElement.prototype.blur.call(element);
  } catch (e) {
    // if we're not in an HTML document, we don't have access to document.body
    const body = _window.document && _window.document.body;
    if (!body) {
      return null;
    }

    // we can't simply call document.body.focus() unless
    // we make sure the element actually is focusable
    const tabindex = body.getAttribute('tabindex');
    body.setAttribute('tabindex', '-1');
    body.focus();
    if (tabindex) {
      body.setAttribute('tabindex', tabindex);
    } else {
      body.removeAttribute('tabindex');
    }
  }

  return _window.document.activeElement;
}
