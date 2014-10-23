define(function defineDomTabbable(require) {
  'use strict';

  // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  // http://www.w3.org/WAI/PF/aria-practices/#keyboard

  /*
    TODO: test edge-case tabbables
      <a disabled> possible?
      <link href> wtf?
      <input type="hidden"> focusable?
      <input tabindex="-1">
  */

  var focusable = require('./focusable');
  var visible = require('./visible');
  var sortTabindex = require('./sort-tabindex');

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

  function tabbable(context) {
    var elements = focusable(context).filter(filter);
    return sortTabindex(elements);
  };

  return tabbable;
});