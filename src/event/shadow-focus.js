define(function defineEventShadowFocus(require) {
  'use strict';

  require('../prototype/window.customevent');
  var cssShadowPiercingDeepCombinator = require('../supports/css-shadow-piercing-deep-combinator');
  var activeElements = require('../dom/active-elements');

  var blurTimer;
  var blurElement;

  function handleElementBlurEvent() {
    /*jshint validthis:true */

    // once() - sometimes I miss jQuery's simplicity…
    this.removeEventListener('blur', handleElementBlurEvent, true);
    // abort any handlers that come from document blur handler
    (window.clearImmediate || window.clearTimeout)(blurTimer);
    blurTimer = (window.setImmediate || window.setTimeout)(function() {
      handleFocusChange()
    });
  }

  function observeElementBlurEvent(element) {
    // call us when we're leaving the element
    element.addEventListener('blur', handleElementBlurEvent, true);
    // remember the element so it can be covered by disengageFocusWithin
    blurElement = element;
  }

  function handleFocusChange() {
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
        elements: _active,
      }
    });

    document.dispatchEvent(shadowFocusEvent);
  }

  function handleDocumentFocusEvent() {
    (window.clearImmediate || window.clearTimeout)(blurTimer);
    handleFocusChange();
  }

  function observeShadowFocus() {
    document.addEventListener('focus', handleDocumentFocusEvent, true);
  }

  observeShadowFocus();
});