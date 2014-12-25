require.config({
  urlArgs: "bust=" +  (new Date()).getTime(),
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

function elementName(element) {
  return element ? element.getAttribute('data-label') || element.nodeName : '-null-';
}

function ignore(value) {
  return value !== 'ignore';
}

function captureStuff() {
  var results = {
    platform: null,
    focusable: null,
    focusEvents: null,
    focusRedirection: null,
    noFocusMethod: null,
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

  var elements = [].slice.call(document.documentElement.querySelectorAll('*'), 0);
  elements.unshift(document.documentElement);

  var activeElementHistory = [];
  var focusEventHistory = [];
  var focusRedirection = [];
  var noFocusMethod = [];

  // collect changes of document.activeElement  
  function observeActiveElement() {
    var _element = elementName(document.activeElement);
    if (document.activeElement !== document.body && activeElementHistory[activeElementHistory.length - 1] !== _element) {
      activeElementHistory.push(_element);
    }

    requestAnimationFrame(observeActiveElement);
  }

  // collect focus events
  function logFocusEvent(event) {
    if (event.target && event.target.nodeName === 'BODY' && !event.relatedTarget) {
      // IE-11: ignore repeated focus events on <body> as they are irrelevant to data-collection
      return;
    }

    focusEventHistory.push(elementName(event.target));
  }

  // try to focus every single element without focus event listeners
  elements.forEach(function(element) {
    // reset focus to prevent redirections from being ignored
    document.activeElement.blur();
    document.body.focus();

    var previous = document.activeElement;
    var _element = elementName(element);

    if (!element.focus) {
      noFocusMethod.push(_element);
      return;
    }

    element.focus();
    
    if (document.activeElement === element) {
      activeElementHistory.push(_element);
    } else if (document.activeElement !== previous) {
      focusRedirection.push(_element + ' --- ' + elementName(document.activeElement));
    }
  });

  // save results
  results.focusable = activeElementHistory.filter(ignore);
  results.noFocusMethod = noFocusMethod.filter(ignore);
  results.focusRedirection = focusRedirection.filter(ignore);
  // reset buffers
  activeElementHistory.length = 0;
  noFocusMethod.length = 0;
  focusRedirection.length = 0;
  document.activeElement.blur();
  document.body.focus();
  // we already know that body is focusable by default
  // registerFocusLogging(document.body);

  // delaying execution to give IE some time to handle the FocusEvents triggered before
  // IE does not dispatch them synchronously, that messes up data collection.
  setTimeout(function() {
    // try to focus every single element *with* focus event listeners
    elements.forEach(function(element) {
      // reset focus to prevent redirections from being ignored
      document.activeElement.blur();
      document.body.focus();
      // register focus event handler
      element.addEventListener('focus', logFocusEvent, false);
      // focus the element, it will end up in focusEventHistory
      element.focus && element.focus();
    });

    require([
      'a11y/dom/query-focusable',
      'a11y/dom/query-tabbable',
      'platform',
      'jquery',
      'jquery.ui/core'
    ], function (queryFocusable, queryTabbable, platform, $) {
      // save results
      results.focusEvents = focusEventHistory.filter(ignore);
      // reset buffers
      activeElementHistory.length = 0;
      noFocusMethod.length = 0;
      focusRedirection.length = 0;
      document.activeElement.blur();
      document.body.focus();

      elements.forEach(function(element) {
        // unregister focus event handler
        element.removeEventListener('focus', logFocusEvent, false);
      });
      // save results
      results.platform = platform;
      results.a11y.focusable = queryFocusable(document, true).map(elementName).filter(ignore);
      results.a11y.tabOrder = queryTabbable(document).map(elementName).filter(ignore);
      results.jquery.focusable = $(':focusable').toArray().map(elementName).filter(ignore);
      results.jquery.tabOrder = $(':tabbable').toArray().map(elementName).filter(ignore);
      // reset buffers
      activeElementHistory.length = 0;
      noFocusMethod.length = 0;
      focusRedirection.length = 0;
      document.activeElement.blur();
      document.body.focus();

      alert('with closed DevTools, focus the browser\'s address bar and hit TAB until you reach it again. Then click the "Results" headline');
      document.activeElement.blur();
      document.body.focus();
      observeActiveElement();

      document.getElementById('output-results').addEventListener('click', function() {
        results.tabOrder = activeElementHistory.filter(ignore);
        var _results = document.createElement('textarea');
        _results.style.width = '100%';
        _results.style.height = '400px';
        _results.id = 'results';
        document.body.replaceChild(_results, document.getElementById('results'));
        _results.value = JSON.stringify(results, null, 2);
      }, false);
    });
  }, 500);
}

if (window.isLoaded) {
  captureStuff();
} else {
  window.addEventListener('load', function() {
    captureStuff();
  }, false);
}

