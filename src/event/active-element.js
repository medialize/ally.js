define(function defineEventActiveElement(require) {
  'use strict';

  /*
    USAGE:

      document.documentElement.addEventListener('active-element', function(event) {
        // event.detail.focus: element that received focus
        // event.detail.blur: element that lost focus
      }, false);

   */

  require('../prototype/window.customevent');

  var previousActiveElement = document.activeElement;

  function observeActiveElement() {
    if (document.activeElement !== previousActiveElement) {
      // https://developer.mozilla.org/en/docs/Web/API/CustomEvent
      var activeElementEvent = new CustomEvent('active-element', {
        bubbles: false,
        cancelable: false,
        detail: {
          focus: document.activeElement,
          blur: previousActiveElement,
        }
      });

      document.documentElement.dispatchEvent(activeElementEvent);
      previousActiveElement = document.activeElement;
    }

    requestAnimationFrame(observeActiveElement);
  }

  observeActiveElement();
});