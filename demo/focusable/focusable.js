require.config({
  paths: {
    a11y: '../../src',
    // shims required by a11y.js
    'array.prototype.findindex': '../../bower_components/array.prototype.findindex/index',
    'CSS.escape': '../../bower_components/CSS.escape/css.escape',

  }
});

function captureStuff() {
  // focus does not bubble so attach the listener to every element in the dom and log events to focusHistory
  var elements = [].slice.call(document.body.querySelectorAll('*'), 0);
  var focusHistory = [document.activeElement && (document.activeElement.getAttribute('data-label') || document.activeElement.nodeName) || 'no-initial-focus'];
  function logFocusEvent(event) {
    if ((event.target.getAttribute('data-label') || event.target.nodeName) === 'text') {
      console.log(event.target);
    }
    focusHistory.push(event.target.getAttribute('data-label') || event.target.nodeName);
  }
  function registerFocusLogging(element) {
    element.addEventListener('focus', logFocusEvent, false);
  }
  registerFocusLogging(document.body);
  elements.forEach(registerFocusLogging);

  // try to focus every single element, successes wil end up in focusHistory
  elements.forEach(function(element) {
    // FIXME: need to test if activeElement changed without focus event
    // FIXME: need to verify activeElement is the thing we just focused
    element.focus && element.focus();
  });

  setTimeout(function() {
    document.getElementById('focusable').textContent = JSON.stringify(focusHistory, null, 2);
    require(['a11y/dom/query-focusable'], function (queryFocusable) {
      var scriptedFocus = queryFocusable(document).map(function(element) {
        return element.getAttribute('data-label') || element.nodeName;
      });

      document.getElementById('focusable').textContent += '\n\na11y.js:\n' + JSON.stringify(scriptedFocus, null, 2);

      // reset focusHistory
      document.activeElement.blur();
      focusHistory.length=0;

      alert('with closed DevTools, focus the browser\'s address bar and hit TAB until you reach it again. Then click the "Tab Order" headline');
      document.getElementById('output-tab-order').addEventListener('click', function() {
        document.getElementById('tab-order').textContent = JSON.stringify(focusHistory, null, 2);
      }, false);
      
    });

  }, 1000);
}

captureStuff();
