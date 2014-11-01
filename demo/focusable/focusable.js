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

function elementName(element) {
  return element.getAttribute('data-label') || element.nodeName;
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

  var elements = [].slice.call(document.body.querySelectorAll('*'), 0);

  var activeElementHistory = [document.activeElement && elementName(document.activeElement) || 'no-initial-focus'];
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

  // save results
  results.focusEvents = focusEventHistory.filter(ignore);
  // reset buffers
  activeElementHistory.length = 0;
  noFocusMethod.length = 0;
  focusRedirection.length = 0;
  document.activeElement.blur();
  document.body.focus();

  require(['a11y/dom/query-focusable', 'platform', 'jquery', 'jquery.ui/core'], function (queryFocusable, platform, $) {
    // save results
    results.platform = platform;
    results.a11y.focusable = queryFocusable(document).map(elementName).filter(ignore);
    results.jquery.focusable = $(':focusable').toArray().map(elementName).filter(ignore);
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
      document.getElementById('results').textContent = JSON.stringify(results, null, 2);
    }, false);
  });
}

if (window.isLoaded) {
  captureStuff();
} else {
  window.addEventListener('load', function() {
    captureStuff();
  }, false);
}

