define(function defineFocusPreventPointer(require) {
  'use strict';

  var domPath = require('../dom/path');

  // FIXME: remove negative tabindex only of parent elements - should fix that chrome bug
  // without affecting pointer-focus when it's actually desired
  // TODO: test <div tabindex="-1"><a href="#foo">


  // WARNING: https://twitter.com/MarcoZehe/status/525063127013285888
  // possibly related: https://code.google.com/p/chromium/issues/detail?id=350738#c12
  // TODO: limit to given context rather than its entire sub-tree

  function preventFocus(context, entryEvent, exitEvent) {
    // remove [tabindex="-1"] from the element that is about to be clicked
    // so the element (and its parents) cannot be given focus after the 
    // entryEvent (mousedown, touchstart) is processed. Restore tabindex 
    // attributes (attributes, not properties!) on exitEvent 
    // (mouseup, touchstart) so programmatic focus remains possible
    function hideTabindex(event) {
      // remember the elements we hacked
      var revert = [];
      // obtain the DOM hierarchy path of the element about to be clicked on,
      // clean the negative tabindexes of every parental element as well, as
      // the click would otherwise simply focus a parent element
      domPath(event.target).forEach(function(node) {
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

      // if we didn't do anything, there's no need to wait for the exitEvent
      if (!revert.length) {
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
  function preventPointerFocus(context) {
    var allowMouse = preventFocus(context || document, 'mousedown', 'mouseup');
    var allowTouch = preventFocus(context || document, 'touchstart', 'touchend');
    // return callback to disengage the pointer-focus prevention
    return function allowPointerFocus() {
      allowMouse();
      allowTouch();
    };
  }

  return preventPointerFocus;
});