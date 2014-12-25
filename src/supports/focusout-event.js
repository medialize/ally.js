define(function defineSupportsFocusoutEvent(require) {
  'use strict';

  // Blink dispatches FocusEvent("focusout"), but it is not detectable through ("onfocusout" in document.body)

  var detectFocus = require('./detect-focus');
  var received = false;
  var canDispatchFocusout = detectFocus('can-dispatch-focusout', 'input', function(element, wrapper) {

    wrapper.appendChild(element);
    element.focus();

    var target = document.createElement('input');
    wrapper.appendChild(target);

    element.addEventListener('focusout', function() {
      received = true;
    });

    return target;
  }, function(element) {
    return 'onfocusout' in element || received;
  });

  return canDispatchFocusout;
});