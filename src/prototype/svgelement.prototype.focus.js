
// Firefox and IE11 do not "properly" inherit the focus() method.
// That may be because SVGElement inherits from Element and focus() is defined on HTMLElement.
// WebKit and Blink - probably by accident - defined focus() on Element, which is why focusing SVGElements works fine.

// Firefox' focus() implementation validates the execution context, it demands being called on instances of HTMLElement,
// which is why simply copying HTMLElement's focus over to SVGElement ends in the following exception:
// TypeError: 'focus' called on an object that does not implement interface HTMLElement.
// this works fine in IE11, though.

if (!SVGElement.prototype.focus) {
  // remember what had focus to restore after test
  var previousActiveElement = document.activeElement;
  try {
    // create a dummy <svg> so we can check if HTMLElement's focus() can deal with it
    var d = document.createElement('div');
    d.innerHTML = '<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"></svg>';
    var s =  d.firstElementChild;
    document.body.focus.call(s);
    // HTMLElement's focus() can also deal with SVGElement, so go crazy!
    SVGElement.prototype.focus = HTMLElement.prototype.focus;
    SVGElement.prototype.blur = HTMLElement.prototype.blur;
  } catch(e) {
    SVGElement.prototype.focus = function() {
      // at least make apparent what is going wrong
      window.console && window.console.warn && window.console.warn('SVGElement.focus() not possible');
    };
    SVGElement.prototype.blur = function() {
      // at least make apparent what is going wrong
      window.console && window.console.warn && window.console.warn('SVGElement.blur() not possible');
    };
  }

  // restore focus to what it was before test and cleanup
  previousActiveElement.focus();
}