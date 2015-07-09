
/*
  alternate implementation: https://github.com/cdata/focus-observer
*/

import activeElements from '../dom/active-elements';

// no need to initialize any of this if we don't have Shadow DOM available
if (document.body.createShadowRoot) {
  let blurTimer;
  let handleFocusChange;

  let handleElementBlurEvent = function() {
    /*jshint validthis:true */

    // once() - sometimes I miss jQuery's simplicity…
    this.removeEventListener('blur', handleElementBlurEvent, true);
    // abort any handlers that come from document blur handler
    (window.clearImmediate || window.clearTimeout)(blurTimer);
    blurTimer = (window.setImmediate || window.setTimeout)(function() {
      handleFocusChange();
    });
  };

  let observeElementBlurEvent = function(element) {
    // call us when we're leaving the element
    element.addEventListener('blur', handleElementBlurEvent, true);
  };

  handleFocusChange = function() {
    var _active = activeElements();
    if (_active.length === 1) {
      return;
    }

    // listen for blur so we know when to re-validate
    observeElementBlurEvent(_active[0]);
    var shadowFocusEvent = new CustomEvent('shadow-focus', {
      bubbles: false,
      cancelable: false,
      detail: {
        // complete focus ancestry
        elements: _active,
        // the actually focused element
        active: _active[0],
        // shadow host ancestry
        hosts: _active.slice(1),
      },
    });

    document.dispatchEvent(shadowFocusEvent);
  };

  let handleDocumentFocusEvent = function() {
    (window.clearImmediate || window.clearTimeout)(blurTimer);
    handleFocusChange();
  };

  let observeShadowFocus = function() {
    document.addEventListener('focus', handleDocumentFocusEvent, true);
  };

  observeShadowFocus();
}
