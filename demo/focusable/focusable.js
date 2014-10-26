require.config({
  paths: {
    a11y: '../../src',
    // shims required by a11y.js
    'array.prototype.findindex': '../../bower_components/array.prototype.findindex/index',
    'CSS.escape': '../../bower_components/CSS.escape/css.escape',
    // stuff used for testing and co
    'underscore': '../../bower_components/underscore/underscore',
    'jquery': '../../bower_components/jquery/dist/jquery',
    'jquery.ui': '../../bower_components/jquery.ui/ui',
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
    var previous = document.activeElement;
    element.focus && element.focus();
    if (document.activeElement !== element && document.activeElement !== previous) {
      console.log("focus changed, but onto unexpected target", element, previous, document.activeElement)
    }
  });

  var results = {
    name: "",
    userAgent: navigator.userAgent,
    focusable: null,
    tabOrder: null,
    a11y: {
      focusable: null,
      tabOrder: null,
    },
    jquery: {
      focusable: null,
      tabOrder: null,
    },
  };

  setTimeout(function() {
    results.focusable = focusHistory.slice(0);
    document.getElementById('focusable').textContent = JSON.stringify(focusHistory, null, 2);

    require(['a11y/dom/query-focusable', 'jquery', 'jquery.ui/core'], function (queryFocusable, $) {
      results.a11y.focusable = queryFocusable(document).map(function(element) {
        return element.getAttribute('data-label') || element.nodeName;
      });

      results.jquery.focusable = $(':focusable').toArray().map(function(element) {
        return element.getAttribute('data-label') || element.nodeName;
      });

      document.getElementById('focusable').textContent += '\n\na11y.js:\n' + JSON.stringify(results.a11y.focusable, null, 2);
      document.getElementById('focusable').textContent += '\n\njQueryUI:\n' + JSON.stringify(results.jquery.focusable, null, 2);

      // reset focusHistory
      document.activeElement.blur();
      focusHistory.length=0;

      alert('with closed DevTools, focus the browser\'s address bar and hit TAB until you reach it again. Then click the "Results" headline');
      document.getElementById('output-results').addEventListener('click', function() {
        results.tabOrder = focusHistory;
        document.getElementById('results').textContent = JSON.stringify(results, null, 2);
      }, false);
      
    });

  }, 1000);
}

captureStuff();
