// http://www.w3.org/WAI/PF/aria-practices/#keyboard
define(function defineDomTabbable(require) {
  var focusable = require('./focusable');
  var visible = require('./visible');

  // http://www.w3.org/WAI/PF/aria-practices/#focus_tabindex
  function filter(element) {

    // disabled form elements are focusable, but not tabbable
    if (element.disabled) {
      return false;
    }

    // negative tabindex is focusable, but not tabbable
    if (element.tabIndex < 0) {
      return false;
    }

    // TODO: <area> https://github.com/jquery/jquery-ui/blob/master/ui/core.js#L88-L107

    return true;
  };

  function compare(a, b) {
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.tabIndex

    // elements with a positive tabIndex: 
    // Elements that have identical tabIndexes should be navigated in the order they appear.
    // Navigation proceeds from the lowest tabIndex to the highest tabIndex.

    // elements with tabIndex "0" (including tabbableElements without tabIndex) should be navigated in the order they appear.


    return 0;
  };

  function tabbable(context) {
    var elements = focusable(context).filter(filter);
    elements.sort(compare);
    return elements;
  };

  return tabbable;
});