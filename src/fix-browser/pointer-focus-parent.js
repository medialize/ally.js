/*
 * Clicking on a link that has a focusable element in its ancestry [tabindex="-1"],
 * can lead to that parental element gaining focus, instead of the link.
 * 
 * Example:
 *   <div tabindex="-1">
 *     <a href="#foo">click me</a>
 *   </div>
 *
 * This (wrong) behavior was observed in Chrome 38, iOS8, Safari 6.2, WebKit r175131
 * It is not a problem in Firefox 33, Internet Explorer 11, Chrome 39.
 */
define(function defineFixBrowserPointerFocusParent(require) {
  'use strict';

  require('array.prototype.findindex');

  var path = require('../dom/path');
  var isFocusable = require('../dom/is-focusable');
  var isValidTabIndex = require('../dom/is-valid-tabindex');

  function preventFocusParent(context, entryEvent, exitEvents) {
    // add [tabindex="0"] to the element that is about to be clicked
    // if it does not already have an explicit tabindex (attribute).
    // By applying an explicit tabindex, WebKit will not go look for
    // the first valid tabindex in the element's parents.
    function hideTabindex(event) {
      // // obtain the DOM hierarchy path of the element about to be clicked on,
      var _path = path(event.target);
      // find the first element that is actually focusable
      var _firstFocusableIndex = _path.findIndex(isFocusable);
      if (_firstFocusableIndex === -1 || _firstFocusableIndex + 1 >= _path.length) {
        // there's nothing to focus
        return;
      }

      var _focusableElement = _path[_firstFocusableIndex];
      if (_focusableElement.hasAttribute('tabindex') && isValidTabIndex(_focusableElement)) {
        // if it already has tabindex, we're good
        return;
      }

      // assign explicit tabindex, as implicit tabindex is the problem
      _focusableElement.setAttribute('tabindex', 0);

      // add cleanup to the RunLoop
      (window.setImmediate || window.setTimeout)(function() {
        console.log("caught", event.type, "reverting");
        _focusableElement.removeAttribute('tabindex');
      }, 0);
    }

    // engage pointer-focus hack
    context.addEventListener(entryEvent, hideTabindex, true);

    // return callback to disengage pointer-focus hack
    return function allowFocus() {
      context.removeEventListener(entryEvent, hideTabindex, true);
    };
  }

  // export convenience wrapper to engage pointer-focus prevention
  function fixPointerFocusParent(context) {
    var allowMouse = preventFocusParent(context || document, 'mousedown');
    var allowTouch = preventFocusParent(context || document, 'touchstart');
    // return callback to disengage the pointer-focus prevention
    return function undoFixPointerFocusParent() {
      allowMouse();
      allowTouch();
    };
  }

  return fixPointerFocusParent;
});