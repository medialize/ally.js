
// Firefox and IE11 do not "properly" inherit the focus() method.
// That may be because SVGElement inherits from Element and focus() is defined on HTMLElement.
// WebKit and Blink - probably by accident - defined focus() on Element, which is why focusing SVGElements works fine.

// Firefox' focus() implementation validates the execution context, it demands being called on instances of HTMLElement,
// which is why simply copying HTMLElement's focus over to SVGElement ends in the following exception:
// TypeError: 'focus' called on an object that does not implement interface HTMLElement.
// this works fine in IE11, though.

export default function polyfill(root) {
  if (root.SVGElement.prototype.focus) {
    return;
  }

  // remember what had focus to restore after test
  const previousActiveElement = root.document.activeElement;

  try {
    // create a dummy <svg> so we can check if HTMLElement's focus() can deal with it
    const d = root.document.createElement('div');
    d.innerHTML = '<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"></svg>';
    const s = d.firstElementChild;
    root.document.body.focus.call(s);
    // HTMLElement's focus() can also deal with SVGElement, so go crazy!
    root.SVGElement.prototype.focus = root.HTMLElement.prototype.focus;
    root.SVGElement.prototype.blur = root.HTMLElement.prototype.blur;
  } catch(e) {
    root.SVGElement.prototype.focus = function focusPolyfill() {
      // at least make apparent what is going wrong
      root.window.console && window.console.warn && window.console.warn('SVGElement.focus() not possible');
    };
    root.SVGElement.prototype.blur = function blurPolyfill() {
      // at least make apparent what is going wrong
      window.console && window.console.warn && window.console.warn('SVGElement.blur() not possible');
    };
  }

  // restore focus to what it was before test and cleanup
  root.document.activeElement && root.document.activeElement.blur();
  previousActiveElement && previousActiveElement.focus();
}

polyfill(window);
