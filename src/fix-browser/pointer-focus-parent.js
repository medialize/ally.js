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
 * It is not a problem in Firefox 33, Internet Explorer 11, Chrome 40.
 */
define(function defineFixBrowserPointerFocusParent(require) {
  'use strict';

  require('array.prototype.findindex');

  var path = require('../dom/path');
  var isFocusable = require('../dom/is-focusable');

  function preventFocusParent(context, entryEvent, exitEvent) {
    // remove [tabindex="-1"] from the element that is about to be clicked
    // so the element (and its parents) cannot be given focus after the 
    // entryEvent (mousedown, touchstart) is processed. Restore tabindex 
    // attributes (attributes, not properties!) on exitEvent 
    // (mouseup, touchstart) so programmatic focus remains possible
    function hideTabindex(event) {
      // remember the elements we hacked
      var revert = [];
      // obtain the DOM hierarchy path of the element about to be clicked on,
      var _path = path(event.target);
      // find the first element that is actually focusable
      var _firstFocusableIndex = _path.findIndex(isFocusable);
      if (_firstFocusableIndex === -1 || _firstFocusableIndex + 1 >= _path.length) {
        // there's nothing to focus
        return;
      }

      // clean the negative tabindexes of every parent of the focusable element, 
      // as the click would otherwise simply focus a parent element in Chrome
      // related bug: https://code.google.com/p/chromium/issues/detail?id=350738#c12
      _path.slice(_firstFocusableIndex + 1).forEach(function(node) {
        // need to use the attribute, not the property, because
        // node.tabIndex === -1 - even if the tabindex attribute was not set,
        // where getAttribute('tabindex') === null if it is not present.
        var tabindex = node.getAttribute('tabindex');
        if (!tabindex || parseInt(tabindex, 10) >= 0) {
          // [tabindex="0"] can be tabbed to, so we'll allow focus by mouse/touch
          return;
        }

        // hide the tabindex from the browser, this is where we disengage browser's
        node.setAttribute('data-disabled-tabindex', tabindex);
        node.removeAttribute('tabindex');
        revert.push(node);
      });

      if (!revert.length) {
        // there's nothing to revert, so skip that
        return;
      }

      function restoreTabindex() {
        while (revert.length) {
          var node = revert.pop();
          // restore the tabindex we previously hid from the browser
          var tabindex = node.getAttribute('data-disabled-tabindex');
          node.setAttribute('tabindex', tabindex);
          node.removeAttribute('data-disabled-tabindex');
        }

        // we only needed to listen to this event once, so kill it.
        document.removeEventListener(exitEvent, restoreTabindex, false);
      }

      // engage pointer-focus hack undo
      document.addEventListener(exitEvent, restoreTabindex, false);
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
    var allowMouse = preventFocusParent(context || document, 'mousedown', 'mouseup');
    var allowTouch = preventFocusParent(context || document, 'touchstart', 'touchend');
    // return callback to disengage the pointer-focus prevention
    return function undoFixPointerFocusParent() {
      allowMouse();
      allowTouch();
    };
  }

  return fixPointerFocusParent;
});