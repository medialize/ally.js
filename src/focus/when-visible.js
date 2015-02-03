define(function defineFocusWhenVisible(require) {
  'use strict';

  /*
    focus an element once it became fully visible in the viewport
  */

  var isVisible = require('../dom/is-visible');
  var visibleQuotient = require('../dom/visible-quotient');

  function focusWhenVisible(element, percentVisible) {
    if (!percentVisible) {
      // unless a specific percentage of visibility has been provided we
      // assume the element has to be fully visible before focus is given
      percentVisible = 1;
    }

    if (isVisible(element) && visibleQuotient(element) >= percentVisible) {
      // element is already visible, trivial escape
      element.focus();
      return;
    }

    var raf;
    var abort = function() {
      document.body.removeEventListener('focus', abort, true);
      raf && cancelAnimationFrame(raf);
    };

    document.body.addEventListener('focus', abort, true);

    var focusWhenReady = function() {
      if (!isVisible(element) || visibleQuotient(element) < percentVisible) {
        raf = requestAnimationFrame(focusWhenReady);
        return;
      }

      abort();
      element.focus();
    };

    focusWhenReady();
    return abort;
  }

  return focusWhenVisible;
});