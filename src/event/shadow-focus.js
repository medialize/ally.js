
/*
  Utility to observe focus changes within Shadow DOMs.

  USAGE:
    engage();
    document.body.addEventListener('shadow-focus', function(event) {
      // event.detail.elements: complete focus ancestry (array of nodes)
      // event.detail.active: the actually focused element within the Shadow DOM
      // event.detail.hosts: the shadow host ancestry of the active element
    }, false);

  Alternate implementation: https://github.com/cdata/focus-observer
*/

import getActiveElements from '../get/active-elements';
import decorateSingleton from '../util/decorate-singleton';

let engage;
let disengage;

if (!document.body.createShadowRoot) {
  // no need to initialize any of this if we don't have Shadow DOM available
  engage = disengage = function() {};
} else {
  let blurTimer;
  let blurElement;
  let handleFocusChange;

  const handleElementBlurEvent = function() {
    blurElement = this;
    // once() - sometimes I miss jQuery's simplicity…
    this.removeEventListener('blur', handleElementBlurEvent, true);
    // abort any handlers that come from document blur handler
    (window.clearImmediate || window.clearTimeout)(blurTimer);
    blurTimer = (window.setImmediate || window.setTimeout)(function() {
      handleFocusChange();
    });
  };

  const observeElementBlurEvent = function(element) {
    // call us when we're leaving the element
    element.addEventListener('blur', handleElementBlurEvent, true);
  };

  handleFocusChange = function() {
    const _active = getActiveElements();
    if (_active.length === 1) {
      return;
    }

    // listen for blur so we know when to re-validate
    observeElementBlurEvent(_active[0]);
    const shadowFocusEvent = new CustomEvent('shadow-focus', {
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

  const handleDocumentFocusEvent = function() {
    (window.clearImmediate || window.clearTimeout)(blurTimer);
    handleFocusChange();
  };

  engage = function() {
    document.addEventListener('focus', handleDocumentFocusEvent, true);
  };

  disengage = function() {
    (window.clearImmediate || window.clearTimeout)(blurTimer);
    blurElement && blurElement.removeEventListener('blur', handleElementBlurEvent, true);
    document.removeEventListener('focus', handleDocumentFocusEvent, true);
  };
}

export default decorateSingleton({ engage, disengage });
