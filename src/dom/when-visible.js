define(function defineFocusWhenVisible(require) {
  'use strict';

  /*
    execute a callback once an element became fully visible in the viewport
  */

  var isFocusable = require('./is-focusable');
  var isVisible = require('./is-visible');
  var visibleQuotient = require('./visible-quotient');

  function runWhenVisible(callback, element, percentVisible) {
    if (!percentVisible) {
      // unless a specific percentage of visibility has been provided we
      // assume the element has to be fully visible before focus is given
      percentVisible = 1;
    }

    if (isFocusable(element) && isVisible(element) && visibleQuotient(element) >= percentVisible) {
      // element is already visible, trivial escape
      callback(element)
      return;
    }

    var raf;
    var abort = function() {
      document.body.removeEventListener('focus', abort, true);
      raf && cancelAnimationFrame(raf);
    };

    document.body.addEventListener('focus', abort, true);

    var runWhenReady = function() {
      if (!isFocusable(element) || !isVisible(element) || visibleQuotient(element) < percentVisible) {
        raf = requestAnimationFrame(runWhenReady);
        return;
      }

      abort();
      callback(element);
    };

    runWhenReady();
    return abort;
  }

  return runWhenVisible;
});