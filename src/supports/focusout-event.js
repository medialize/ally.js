// Blink dispatches FocusEvent("focusout"), but it is not detectable through ("onfocusout" in document.body)

import detectFocus from './detect-focus';

let received = false;
export default detectFocus({
  name: 'can-dispatch-focusout',
  element: 'input',
  mutate: function(element, wrapper) {
    wrapper.appendChild(element);
    element.focus();

    let target = document.createElement('input');
    wrapper.appendChild(target);

    element.addEventListener('focusout', function() {
      received = true;
    }, true);

    return target;
  },
  validate: function(element) {
    return 'onfocusout' in element || received;
  },
});
