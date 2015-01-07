/*
 * Children of focusable elements with display:flex are focusable.
 * Because focus can be given to focusable (not tabbable) elements
 * by mouse, we have to counter this behavior, so the correct element
 * becomes the activeElement (i.e. receives focus).
 * 
 * Example:
 *   <div tabindex="-1" style="display:flex">
 *     <span>I would receive focus</span>
 *   </div>
 *
 * This (wrong) behavior was observed in Internet Explorer 10 and 11.
 * It is fixed in IE12 (Win10 IE Tec Preview)
 */
define(function defineFixBrowserPointerFocusParent(require) {
  'use strict';

  var focusTarget = require('../dom/focus-target');

  function handleBeforeFocusEvent(event) {
    // find the element that would receive focus
    var target = focusTarget(event.target);
    if (!target || target === event.target) {
      // there's nothing to focus, or we're focusing the element clicked on
      return;
    }

    // if the focus target does not have display:flex we're good
    var display = window.getComputedStyle(target, null).getPropertyValue('display');
    // flex, flexbox, -ms-flex, inline-flexbox (yeah, whatever…)
    if (display.indexOf('flex') === -1) {
      return;
    }

    // hide all children, because hidden elements can't get focus
    // remember previous element style (not necessarily computed style)
    // to undo hiding later
    var reverse = [].map.call(target.children, function(element) {
      var visibility = element.style.visibility || '';
      element.style.visibility = 'hidden';
      return [element, visibility];
    });

    // add cleanup (undo hide) to the RunLoop
    window.setImmediate(function() {
      reverse.forEach(function(item) {
        item[0].style.visibility = item[1];
      });
    });
  }

  function fixPointerFocusChildren(context) {
    if (!context) {
      context = document;
    }

    // IE10 requires prefix, IE11 does not
    var eventName = "onpointerdown" in document ? 'pointerdown' : 'MSPointerDown';
    context.addEventListener(eventName, handleBeforeFocusEvent, true);

    // return callback to disengage pointer-focus hack
    return function undoFixPointerFocusChildren() {
      context.removeEventListener(eventName, handleBeforeFocusEvent, true);
    };
  }

  return fixPointerFocusChildren;
});