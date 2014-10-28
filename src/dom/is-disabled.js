define(function defineDomIsDisabled(require) {
  'use strict';

  var detectFeatureFocus = require('./detect-feature-focus');

  // http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled
  var disabledElementsPattern = /^(input|select|textarea|button|fieldset)$/;

  var canFocusDisabledFieldset = detectFeatureFocus('fieldset', function(element) {
    element.setAttribute('tabindex', 0);
    element.setAttribute('disabled', 'disabled');
  });

  // fieldset[tabindex=0][disabled] should not be focusable, but Blink and WebKit disagree
  if (canFocusDisabledFieldset) {
    disabledElementsPattern = /^(input|select|textarea|button)$/;
  }

  function isDisabled(element) {
    var nodeName = element.nodeName.toLowerCase();
    return element.disabled && disabledElementsPattern.test(nodeName);
  }

  return isDisabled;
});