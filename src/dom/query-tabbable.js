define(function defineDomQueryTabbable(require) {
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

  require('CSS.escape');
  var queryFocusable = require('./query-focusable');
  var isVisible = require('./is-visible');
  var path = require('./path');
  var sortTabindex = require('./sort-tabindex');

  var interactiveElement = /input|select|textarea|button|object/;

  function validArea(element) {
    // https://github.com/jquery/jquery-ui/blob/master/ui/core.js#L88-L107
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
    if (!element.name || !element.href || element.parentElement.nodeName.toLowerCase() !== 'map') {
      return false;
    }

    var img = document.querySelector('img[usemap="#' + CSS.escape(element.name) + '"]')[0];
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

  // http://www.w3.org/WAI/PF/aria-practices/#focus_tabindex
  function filter(element) {
    var nodeName = element.nodeName.toLowerCase();

    // negative tabindex is focusable, but not tabbable
    if (element.tabIndex < 0) {
      return false;
    }

    // disabled form elements are focusable, but not tabbable
    if (element.disabled && (interactiveElement.test(nodeName)) {
      return false;
    }

    if (nodeName === 'area' && !validArea(element)) {
      return false;
    }

    return true;
  };

  function queryTabbable(context) {
    var elements = queryFocusable(context).filter(filter);
    return sortTabindex(elements);
  };

  return queryTabbable;
});