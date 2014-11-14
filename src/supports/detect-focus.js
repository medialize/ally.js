define(function defineSupportsDetectFocus(require) {
  'use strict';

  // nodeName:
  //  {string} element name
  //  {function} callback that returns a DOMElement
  // callback: (optional)
  //  {function} callback(element) to manipulate element prior to focus-test.
  //             Can return DOMElement to define focus target (default: element)
  function detectFocus(nodeName, callback) {
    // wrap tests in an element hidden from screen readers to prevent them
    // from announcing focus, which can be quite irritating to the user
    var wrapper = document.createElement('div');
    wrapper.setAttribute('aria-live', 'off');
    wrapper.setAttribute('aria-busy', 'true');
    wrapper.setAttribute('aria-hidden', 'true');
    // create dummy element to test focusability of
    var element = typeof nodeName === 'string' ? document.createElement(nodeName) : nodeName();
    // allow callback to further specify dummy element
    var focus = callback && callback(element) || element;
    // element needs to be part of the DOM to be focusable
    wrapper.appendChild(element);
    document.body.appendChild(wrapper);
    // remember what had focus to restore after test
    var previousActiveElement = document.activeElement;
    // test if the element with invalid tabindex can be focused
    focus.focus && focus.focus();
    var allowsFocus = document.activeElement === focus;
    // restore focus to what it was before test and cleanup
    previousActiveElement.focus();
    document.body.removeChild(element);
    return allowsFocus;
  }

  return detectFocus;
});