require.config({
  paths: {
    a11y: '../../src',
    // shims required by a11y.js
    'array.prototype.findindex': '../../bower_components/array.prototype.findindex/index',
    'CSS.escape': '../../bower_components/CSS.escape/css.escape',
    // stuff used for testing and co
    'platform': '../../bower_components/platform/platform',
    'underscore': '../../bower_components/underscore/underscore',
    'jquery': '../../bower_components/jquery/dist/jquery',
    'jquery.ui': '../../bower_components/jquery.ui/ui',
  }
});

function captureStuff() {
  // focus does not bubble so attach the listener to every element in the dom and log events to focusHistory
  var elements = [].slice.call(document.body.querySelectorAll('*'), 0);
  var focusHistory = [document.activeElement && (document.activeElement.getAttribute('data-label') || document.activeElement.nodeName) || 'no-initial-focus'];

  function elementName(element) {
    return element.getAttribute('data-label') || element.nodeName;
  }

  function logFocusEvent(event) {
    focusHistory.push(elementName(event.target));
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
      // make apparent that the focus was triggered from another element
      focusHistory.push('via(' + elementName(element) + '): ' + elementName(document.activeElement));
    }
  });

  var results = {
    platform: null,
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

    require(['a11y/dom/query-focusable', 'platform', 'jquery', 'jquery.ui/core'], function (queryFocusable, platform, $) {
      results.platform = platform;
      results.a11y.focusable = queryFocusable(document).map(elementName);
      results.jquery.focusable = $(':focusable').toArray().map(elementName);

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
