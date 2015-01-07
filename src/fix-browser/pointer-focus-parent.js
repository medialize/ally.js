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

  var focusTarget = require('../dom/focus-target');
  var isValidTabIndex = require('../dom/is-valid-tabindex');

  // add [tabindex="0"] to the (focusable) element that is about to be clicked
  // if it does not already have an explicit tabindex (attribute).
  // By applying an explicit tabindex, WebKit will not go look for
  // the first valid tabindex in the element's parents.
  function handleBeforeFocusEvent(event) {
    // find the element that would receive focus
    var target = focusTarget(event.target);
    if (!target || target.hasAttribute('tabindex') && isValidTabIndex(target)) {
      // there's nothing to focus, or the element already has tabindex, we're good
      return;
    }

    // assign explicit tabindex, as implicit tabindex is the problem
    target.setAttribute('tabindex', 0);

    // add cleanup to the RunLoop
    (window.setImmediate || window.setTimeout)(function() {
      target.removeAttribute('tabindex');
    }, 0);
  }

  // export convenience wrapper to engage pointer-focus prevention
  function fixPointerFocusParent(context) {
    if (!context) {
      context = document;
    }

    context.addEventListener('mousedown', handleBeforeFocusEvent, true);
    context.addEventListener('touchstart', handleBeforeFocusEvent, true);

    // return callback to disengage the pointer-focus prevention
    return function undoFixPointerFocusParent() {
      context.removeEventListener('mousedown', handleBeforeFocusEvent, true);
      context.removeEventListener('touchstart', handleBeforeFocusEvent, true);
    };
  }

  return fixPointerFocusParent;
});