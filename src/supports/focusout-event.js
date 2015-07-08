// Blink dispatches FocusEvent("focusout"), but it is not detectable through ("onfocusout" in document.body)

import detectFocus from './detect-focus';

var received = false;
var canDispatchFocusout = detectFocus('can-dispatch-focusout', 'input', function(element, wrapper) {

  wrapper.appendChild(element);
  element.focus();

  var target = document.createElement('input');
  wrapper.appendChild(target);

  element.addEventListener('focusout', function() {
    received = true;
  }, true);

  return target;
}, function(element) {
  return 'onfocusout' in element || received;
});

export default canDispatchFocusout;
