define(function defineFocusFirst(require) {
  'use strict';

  /*
      focusFirst() finds the first suitable element to receive context.
      If an element has [autofocus] focus that element, otherwise focus the first element
      in document order that does not have a positive tabIndex (e.g. as [tabindex="1"])

      Note: Chrome's <dialog> will focus the first tabbable element, even if it has
      [tabindex="1"]. To mimic that behavior when trapping focus, you'd have to not
      only handle out-of-bounds situation (like focus/trap does), but also handle
      <kbd>Tab</kbd> for intermediate elements. Since [tabindex="1"] is considered
      bad practice we'll ignore it until someone complains.
   */

  require('array.prototype.findindex');
  var queryTabbable = require('../dom/query-tabbable');

  function hasAutofocus(element) {
    // [autofocus] actually only works on form element, but who cares?
    return element.hasAttribute('autofocus');
  }

  function hasNoPositiveTabindex(element) {
    return element.tabIndex <= 0;
  }

  function focusFirst(element, ignoreAutofocus) {
    var index = -1;
    var sequence = Array.isArray(element) ? element : queryTabbable(element);
    if (!sequence.length) {
      return null;
    }

    if (!ignoreAutofocus) {
      // prefer [autofocus]
      index = sequence.findIndex(hasAutofocus);
    }

    if (index === -1) {
      // ignore positive [tabindex=1]
      index = sequence.findIndex(hasNoPositiveTabindex);
    }

    sequence[index].focus();
    return sequence[index];
  }

  return focusFirst;
});