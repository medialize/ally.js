require.config({
  urlArgs: "bust=" +  (new Date()).getTime(),
  paths: {
    ally: '../../dist/amd',
    // shims required by ally.js
    'array.prototype.findindex': '../../node_modules/array.prototype.findindex/index',
    'css.escape': '../../node_modules/css.escape/css.escape',
    // stuff used for testing and co
    'platform': '../../node_modules/platform/platform',
    'jquery': '../../node_modules/jquery/dist/jquery',
    'jquery-ui': '../../node_modules/jquery-ui/ui',
  }
});

function elementName(element) {
  return element ? element.getAttribute('data-label') || element.nodeName : '-null-';
}

function ignore(value) {
  return value !== 'ignore';
}

function ignoreByAttribute(element) {
  return element.getAttribute('data-label') !== 'ignore';
}

function filterLabeledElements(element) {
  return element.hasAttribute('data-label');
}

function getContentDocument(element) {
  try {
    // works on <object> and <iframe>
    return element.contentDocument
      // works on <object> and <iframe>
      || element.contentWindow && element.contentWindow.document
      // works on <object> and <iframe> that contain SVG
      || element.getSVGDocument && element.getSVGDocument();
  } catch(e) {
    // IE may throw member not found exception
    // e.g. on <object type="image/png">
    return null;
  }
}

function addShadowedContent(host, elements) {
  if (!host || !host.shadowRoot || !document.body.createShadowRoot) {
    return;
  }

  var nestedHosts = [];
  var content = [].map.call(host.shadowRoot.querySelectorAll('*'), function(element) {
    if (element.shadowRoot) {
      nestedHosts.push(element);
    }

    return element;
  });

  elements.push.apply(elements, content);
  nestedHosts.forEach(function(_host) {
    addShadowedContent(_host, elements);
  });
}

function captureStuff() {
  var results = {
    platform: null,
    focusable: null,
    focusEvents: null,
    focusRedirection: null,
    focusEncapsulation: null,
    noFocusMethod: null,
    tabOrder: null,
    tabIndex: null,
    ally: {
      focusable: null,
      focusableStrict: null,
      tabbable: null,
      tabbableStrict: null,
      onlyTabbable: null,
      tabOrder: null,
    },
    jquery: {
      focusable: null,
      tabOrder: null,
    },
  };

  // all elements of the document
  var elements = [].slice.call(document.documentElement.querySelectorAll('*'), 0);
  // including the <html>
  elements.unshift(document.documentElement);
  // retain a copy of only the elements in the document
  var documentElements = elements.slice(0);
  // add all <iframe>, <object> and <embed> document contents
  [].forEach.call(document.querySelectorAll('iframe, object, embed'), function(element) {
    var _document = getContentDocument(element);
    if (!_document || !_document.documentElement) {
      return;
    }

    var _elements = [].slice.call(_document.documentElement.querySelectorAll('*'), 0);
    elements.push.apply(elements, _elements);
  });
  // add all ShadowDOM content
  addShadowedContent(document.getElementById('shadow-host-1'), elements);
  addShadowedContent(document.getElementById('shadow-host-2'), elements);
  addShadowedContent(document.getElementById('shadow-host-3'), elements);

  var activeElementHistory = [];
  var focusEventHistory = [];
  var focusRedirection = [];
  var focusEncapsulation = [];
  var noFocusMethod = [];

  // collect changes of document.activeElement
  var _lasActiveElement = null;
  function observeActiveElement() {
    var _element = elementName(document.activeElement);
    if (document.activeElement !== document.body && _lasActiveElement !== _element) {
      _lasActiveElement = _element;
      activeElementHistory.push(_element);
    }

    requestAnimationFrame(observeActiveElement);
  }

  // collect focus within iframe
  window.iframeFocusEvent = function(event) {
    activeElementHistory.push(elementName(event.target));
  };

  // collect focus events
  var hasSeenFocusEvent = {};
  function logFocusEvent(event) {
    if (event.target && (event.target.nodeName === 'BODY' ||  event.target.nodeName === 'HTML') && !event.relatedTarget) {
      if (hasSeenFocusEvent[event.target.nodeName]) {
        // IE10 and IE11: ignore repeated focus events on <body> and <html> as they are irrelevant to data-collection
        return;
      }

      hasSeenFocusEvent[event.target.nodeName] = true;
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
      var sameDocument = element.ownerDocument === document;
      var token = _element + ' --- ' + elementName(document.activeElement);
      if (sameDocument && documentElements.indexOf(element) !== -1) {
        focusRedirection.push(token);
      } else {
        focusEncapsulation.push(token);

        var parent = element;
        while (parent.parentNode) {
          parent = parent.parentNode;
        }

        if (parent !== document && parent.activeElement === element) {
          activeElementHistory.push(_element);
        }
      }
    }
  });

  // save results
  results.focusable = activeElementHistory.filter(ignore);
  results.noFocusMethod = noFocusMethod.filter(ignore);
  results.focusRedirection = focusRedirection.filter(ignore);
  results.focusEncapsulation = focusEncapsulation.filter(ignore);
  // reset buffers
  activeElementHistory.length = 0;
  noFocusMethod.length = 0;
  focusRedirection.length = 0;
  focusEncapsulation.length = 0;
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
      'ally/query/focusable',
      'ally/query/tabsequence',
      'ally/query/tabbable',
      'ally/is/only-tabbable',
      'platform',
      'jquery',
      'jquery-ui/core',
      'ally/prototype/window.requestanimationframe',
    ], function (queryFocusable, queryTabsequence, queryTabbable, isOnlyTabbable, platform, $) {
      // save results
      results.focusEvents = focusEventHistory.filter(ignore);
      // reset buffers
      activeElementHistory.length = 0;
      noFocusMethod.length = 0;
      focusRedirection.length = 0;
      focusEncapsulation.length = 0;
      document.activeElement.blur();
      document.body.focus();

      elements.forEach(function(element) {
        // unregister focus event handler
        element.removeEventListener('focus', logFocusEvent, false);
      });
      // save results
      results.platform = platform;

      // ally
      results.ally.focusable = queryFocusable({
        context: document,
        includeContext: true,
      }).map(elementName).filter(ignore);
      results.ally.focusableStrict = queryFocusable({
        context: document,
        includeContext: true,
        strategy: 'strict',
      }).map(elementName).filter(ignore);
      results.ally.tabbable = queryTabbable({
        context: document
      }).map(elementName).filter(ignore);
      results.ally.tabbableStrict = queryTabbable({
        context: document,
        includeContext: true,
        strategy: 'strict',
      }).map(elementName).filter(ignore);
      results.ally.tabOrder = queryTabsequence({
        context: document
      }).map(elementName).filter(ignore);

      // jQueryUI
      results.jquery.focusable = $(':focusable').toArray().map(elementName).filter(ignore);
      results.jquery.tabOrder = $(':tabbable').toArray().map(elementName).filter(ignore);

      // query-independent data
      results.tabIndex = {};
      results.ally.onlyTabbable = [];
      elements.filter(filterLabeledElements).filter(ignoreByAttribute).forEach(function(element) {
        // browser: tabIndex
        var name = elementName(element);
        results.tabIndex[name] = element.tabIndex;
        if (isOnlyTabbable(element)) {
          results.ally.onlyTabbable.push(name);
        }
      });

      // reset buffers
      activeElementHistory.length = 0;
      noFocusMethod.length = 0;
      focusRedirection.length = 0;
      focusEncapsulation.length = 0;
      document.activeElement.blur();
      document.body.focus();

      // IE10 reacts bad to the <object>s, so we simply remove them
      // related to https://connect.microsoft.com/IE/feedback/details/1109008
      if (platform.name === 'IE' && platform.version === '10.0') {
        alert('removing <object> because IE might get stuck');
        [].forEach.call(document.querySelectorAll('.hide-from-ie10'), function(element) {
          element.parentNode.removeChild(element);
        });
      }

      alert('with closed DevTools, focus the browser\'s address bar and hit TAB until you reach it again. Then click the "Results" headline');
      document.activeElement.blur();
      document.body.focus();
      observeActiveElement();

      document.getElementById('output-results').addEventListener('click', function() {
        results.tabOrder = activeElementHistory.filter(ignore);
        var _text = JSON.stringify(results, null, 2);
        var _form = document.createElement('form');
        _form.method = 'POST';
        _form.action = location.href.replace(/\/test.html.*$/, '/save.php');
        _form.innerHTML = '<p><input type="submit" value="submit"></p><p><input type="text" name="name" value="saved"></p>';
        document.body.replaceChild(_form, document.getElementById('results'));

        var _results = document.createElement('textarea');
        _results.style.width = '100%';
        _results.style.height = '400px';
        _results.id = 'results';
        _results.name = 'results';
        _results.value = _text;
        _form.appendChild(_results);
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

