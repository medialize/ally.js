define(function defineDomIsFocusable(require) {
  'use strict';

  // http://www.w3.org/TR/html5/editing.html#focus-management

  require('CSS.escape');
  var selector = require('../map/selector');
  var isVisible = require('./is-visible');
  var isValidTabindex = require('./is-valid-tabindex');
  var path = require('./path');
  var matches = require('./matches');

  // http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled
  var disabledElementsPattern = /^(input|select|textarea|button|fieldset)$/;

  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
  // https://github.com/jquery/jquery-ui/blob/master/ui/core.js#L88-L107
  function validArea(element) {
    var map = element.parentElement;

    // an <area> matches the area[href] selector even if it is not applicable
    if (!map.name || !element.href || map.nodeName.toLowerCase() !== 'map') {
      return false;
    }

    var img = document.querySelector('img[usemap="#' + CSS.escape(map.name) + '"]');
    if (!img || !isVisible(img)) {
      return false;
    }

    var childOfInteractive = path(img).slice(1).some(function(element) {
      var name = element.nodeName.toLowerCase();
      return name === 'button' || name === 'a';
    });

    if (childOfInteractive) {
      return false;
    }

    return true;
  }

  function isFocusable(element) {
    var focusable = selector.focusable;
    var nodeName = element.nodeName.toLowerCase();

    // input[type="hidden"] cannot be focused
    if (nodeName === 'input' && element.type === 'hidden') {
      return false;
    }

    if (nodeName === 'area' && !validArea(element)) {
      return false;
    }

    // http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled
    if (element.disabled && disabledElementsPattern.test(nodeName)) {
      return false;
    }

    // elements that are not rendered, cannot be focused
    // (except for <area> which is never rendered directly)
    // http://www.w3.org/TR/html5/rendering.html#being-rendered
    if (nodeName !== 'area' && !isVisible(element)) {
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