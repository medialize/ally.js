
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
    return document.activeElement;
  } catch (e) {
    // we may want to try focusing <body> before giving up.
    // not sure how this works for an SVG document, though.
    return null;
  }
}
