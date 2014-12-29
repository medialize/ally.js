define(function defineSupportsDetectFocus(require) {
  'use strict';

  var cache = require('./supports-cache');

  // nodeName:
  //  {string} element name
  //  {function} callback that returns a DOMElement
  // callback: (optional)
  //  {function} callback(element, wrapper) to manipulate element prior to focus-test.
  //             Can return DOMElement to define focus target (default: element)
  // validate: (optional)
  //  {function} callback(element) to manipulate test-result
  function detectFocus(nodeName, callback, validate) {
    // wrap tests in an element hidden from screen readers to prevent them
    // from announcing focus, which can be quite irritating to the user
    var wrapper = document.createElement('div');
    wrapper.setAttribute('aria-live', 'off');
    wrapper.setAttribute('aria-busy', 'true');
    wrapper.setAttribute('aria-hidden', 'true');
    document.body.appendChild(wrapper);
    // create dummy element to test focusability of
    var element = typeof nodeName === 'string' ? document.createElement(nodeName) : nodeName();
    // allow callback to further specify dummy element
    var focus = callback && callback(element, wrapper) || element;
    // element needs to be part of the DOM to be focusable
    !element.parentNode && wrapper.appendChild(element);
    // remember what had focus to restore after test
    var previousActiveElement = document.activeElement;
    // test if the element with invalid tabindex can be focused
    focus.focus && focus.focus();
    // validate test's result
    var allowsFocus = validate ? validate(element) : document.activeElement === focus;
    // restore focus to what it was before test and cleanup
    previousActiveElement.focus();
    document.body.removeChild(wrapper);
    return allowsFocus;
  }

  // cache detected support so we don't have to bother screen readers with unstoppable focus changes
  // and flood the console with net::ERR_INVALID_URL errors for audio/video tests
  function detectFocusSupport(testName, nodeName, callback, validate) {
    var value = cache.get(testName);
    if (typeof value !== 'boolean') {
      value = detectFocus(nodeName, callback, validate);
      cache.set(testName, value);
    }

    return value;
  }

  return detectFocusSupport;
});