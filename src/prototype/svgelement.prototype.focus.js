
// Firefox and IE11 do not "properly" inherit the focus() method.
// That may be because SVGElement inherits from Element and focus() is defined on HTMLElement.
// WebKit and Blink - probably by accident - defined focus() on Element, which is why focusing SVGElements works fine.

// The focus() implementations in Microsoft Edge and Firefox validate the execution context, they demand being
// called on instances of HTMLElement, which is why simply copying HTMLElement's focus over to
// SVGElement ends in the following exception:
// TypeError: 'focus' called on an object that does not implement interface HTMLElement.
// SCRIPT65535: Invalid calling object
// this works fine in IE9 - IE11 and MS Edge 12, though.

import logger from '../util/logger';

export default function polyfill(root) {
  if (root.SVGElement.prototype.focus) {
    return;
  }

  // remember what had focus to restore after test
  const previousActiveElement = root.document.activeElement;

  try {
    // create a dummy <svg> so we can check if HTMLElement's focus() can deal with it
    const d = root.document.createElement('div');
    d.innerHTML = '<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">'
      + '<rect x="0" y="0" width="1" height="1"></svg>';
    const s = d.firstElementChild.firstElementChild;
    root.document.body.focus.call(s);
    // HTMLElement's focus() can also deal with SVGElement, so go crazy!
    root.SVGElement.prototype.focus = root.HTMLElement.prototype.focus;
    root.SVGElement.prototype.blur = root.HTMLElement.prototype.blur;
    // make it easy to find these duds
    root.SVGElement.prototype.focus._polyfill = 'reassigned';
    root.SVGElement.prototype.blur._polyfill = 'reassigned';
  } catch(e) {
    // developers expect the focus method to simply be there
    root.SVGElement.prototype.focus = function focusPolyfill() {
      // at least make apparent what is going wrong
      logger.warn('SVGElement.focus() not possible');
    };
    root.SVGElement.prototype.blur = function blurPolyfill() {
      // at least make apparent what is going wrong
      logger.warn('SVGElement.blur() not possible');
    };
    // make it easy to find these duds
    root.SVGElement.prototype.focus._polyfill = 'noop';
    root.SVGElement.prototype.blur._polyfill = 'noop';
  }

  // restore focus to what it was before test and cleanup
  root.document.activeElement && root.document.activeElement.blur();
  previousActiveElement && previousActiveElement.focus();
}

typeof window !== 'undefined' && polyfill(window);
