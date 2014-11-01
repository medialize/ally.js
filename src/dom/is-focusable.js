define(function defineDomIsFocusable(require) {
  'use strict';

  // http://www.w3.org/TR/html5/editing.html#focus-management

  var selector = require('../selector/focusable');
  var isVisible = require('./is-visible');
  var isDisabled = require('./is-disabled');
  var isValidTabindex = require('./is-valid-tabindex');
  var isValidArea = require('./is-valid-area');
  var matches = require('./matches');

  function isFocusable(element) {
    var focusable = selector;
    var nodeName = element.nodeName.toLowerCase();

    // input[type="hidden"] cannot be focused
    if (nodeName === 'input' && element.type === 'hidden') {
      return false;
    }

    if (!isValidArea(element)) {
      return false;
    }

    if (isDisabled(element)) {
      return false;
    }

    // elements that are not rendered, cannot be focused
    if (!isVisible(element)) {
      return false;
    }

    // NOTE: elements marked as inert are not focusable,
    // but I have no idea what would make an element inert
    // http://www.w3.org/TR/html5/editing.html#inert

    // for invalid tabindex values, simply ignore the tabindex,
    // that means that any "naturally" focusable elements still return true.
    // That's the behavior encountered in browsers and supported by the vague specificiation quote:
    //   The user agent should follow platform conventions to determine if the element's tabindex focus
    //   flag is set and, if so, whether the element can be reached using sequential focus navigation,
    //   and if so, what its relative order should be.
    //   - http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
    if (!isValidTabindex(element)) {
      focusable = focusable.replace('[tabindex],', '');
    }

    return matches(element, focusable);
  }

  return isFocusable;
});