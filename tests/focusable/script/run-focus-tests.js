define([
  'platform',
  './utils',
  './elements',
  './collector',
  './format-result',
], function(platform, utils, Elements, Collector, formatResult) {

  function resetActiveElement() {
    document.activeElement.blur();
    document.body.focus();
  }

  function evaluateFocusInView(element, evaluate) {
    var previousActiveElement = document.activeElement;
    // prevent the browser from scroll on focus
    // as this can be a problem for ImageMaps in Firefox
    element.scrollIntoView && element.scrollIntoView(true);
    // give browser a little time to scroll
    setTimeout(function() {
      element.focus();
      // give browser a little time to focus
      setTimeout(function() {
        evaluate(previousActiveElement);
      }, 10);
    }, 10);
  }

  function log(message) {
    return function(res) {
      /*eslint-disable no-console */
      console.log(message);
      /*eslint-enable no-console */
      return res;
    };
  }

  function wait() {
    return new window.Promise(function(resolve) {
      setTimeout(resolve, 100);
    });
  }

  var elements = new Elements();

  var elementsMeta;
  var scriptFocus;
  var focusEvent;
  var queryAlly;
  var queryJquery;
  var tabsequence;

  // collect metadata for every element
  // (actual state, ally state, jquery state)
  var runElementsMeta = function() {
    log('running meta data collection')();
    elementsMeta = new Collector(elements);
    return elementsMeta.mapElements(function(element, done) {
      var data = elements.analyzeElementMeta(element);
      data.ally = elements.analyzeElementAlly(element);
      data.jquery = elements.analyzeElementJquery(element);
      done(data);
    }).then(log('completed meta data collection'));
  };

  // focus every element and examine document.activeElement afterwards
  // without any observers and event listeners
  // (because WebKit and Blink)
  var runScriptFocus = function() {
    log('running script focus collection')();
    scriptFocus = new Collector(elements);
    return scriptFocus.mapFocusableElements(function(element, done) {
      resetActiveElement();

      evaluateFocusInView(element, function(previousActiveElement) {
        var data = {
          scriptFocus: elements.analyzeActiveElementState(element, previousActiveElement),
        };

        var hostElement = elements.getHostElement(element);
        if (hostElement) {
          data.hostElementFocus = elements.analyzeActiveElementState(hostElement, null);
          data.hostElementFocus.ident = utils.elementName(hostElement);
        }

        var referenceElement = elements.getReferenceElement(element);
        if (referenceElement) {
          data.referenceElementFocus = elements.analyzeActiveElementState(referenceElement, null);
          data.referenceElementFocus.ident = utils.elementName(referenceElement);
        }
        done(data);
      });
    }).then(log('completed script focus collection'));
  };

  // focus every element and examine the received focus event
  // with a focus event listener on every element
  var runScriptFocusWithEventListener = function() {
    log('running script focus with event listener collection')();
    focusEvent = new Collector(elements, {
      focusEvent: true,
    });
    return focusEvent.mapFocusableElements(function(element, done, observe) {
      resetActiveElement();
      var observer = observe();

      evaluateFocusInView(element, function(previousActiveElement) {
        var events = observer.focusEvent.getHistory();
        var data = elements.analyzeActiveElementState(element, previousActiveElement);
        data.events = events;
        done(data);
      });
    }).then(log('completed script focus with event listener collection'));
  };

  // collect what ally can grab off the DOM
  var runQueryAlly = function() {
    log('running ally query collection')();
    queryAlly = new Collector(elements);
    return queryAlly.queryElementsAlly()
      .then(log('completed ally query collection'));
  };

  // collect what jquery can grab off the DOM
  var runQueryJquery = function() {
    log('running jQuery query collection')();
    queryJquery = new Collector(elements);
    return queryJquery.queryElementsJquery()
      .then(log('completed jQuery query collection'));
  };

  // kick of tabsequence collection and
  // wait until the user finishes the test
  var runTabbingTest = function() {
    log('running manual tabbing test collection')();

    tabsequence = new Collector(elements);

    // IE10 reacts bad to the <object>s, so we simply remove them
    // related to https://connect.microsoft.com/IE/feedback/details/1109008
    if (platform.name === 'IE' && platform.version === '10.0') {
      /*eslint-disable no-alert */
      alert('removing <object> because IE might get stuck');
      /*eslint-enable no-alert */
      [].forEach.call(document.querySelectorAll('.hide-from-ie10'), function(element) {
        element.parentNode.removeChild(element);
      });
    }

    resetActiveElement();

    /*eslint-disable no-alert */
    alert('With closed DevTools, hit TAB until you reach the browser address bar.'
      + ' Then click on the red banner at the bottom');
    /*eslint-enable no-alert */

    // start with a common element
    // Otherwise MS Edge might freak and start with an iframe
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    document.getElementById('tabsequence-start').focus();
    return wait().then(function() {
      return new window.Promise(function(resolve) {
        // start observing activeElement and :focus
        var done = tabsequence.observeTabsequence();
        // create a button to complete the observation
        var button = document.createElement('p');
        button.textContent = 'click to finished sequence and continue with next text';
        var buttonStyle = 'position: fixed; right:0; bottom: 20px; left: 0; margin: 0; padding: 5px;'
          + ' font-size: 24px; color: white; background: red; cursor: pointer;';
        button.setAttribute('style', buttonStyle);
        button.addEventListener('click', function(event) {
          // avoid *anything* being done on this click
          event.preventDefault();
          event.stopPropagation();
          // we're done observing, time to save the results
          tabsequence.results = done();
          resolve(tabsequence.results);
          // remove the button and scroll to the end of the page to finish
          this.parentNode.removeChild(this);
          document.getElementById('output-results').scrollIntoView(true);
        }, false);

        document.body.appendChild(button);
      });
    }).then(log('completed tabsequence collection'));
  };

  var prepareResult = function() {
    var results = formatResult({
      elementsMeta: elementsMeta,
      scriptFocus: scriptFocus,
      focusEvent: focusEvent,
      queryAlly: queryAlly,
      queryJquery: queryJquery,
      tabsequence: tabsequence,
    });

    return window.Promise.resolve(results);
  };

  return window.Promise.resolve()
    .then(runElementsMeta)
    .then(wait)
    .then(runScriptFocus)
    .then(wait)
    .then(runScriptFocusWithEventListener)
    .then(wait)
    .then(runQueryAlly)
    .then(wait)
    .then(runQueryJquery)
    .then(wait)
    .then(runTabbingTest)
    .then(wait)
    .then(prepareResult)
    .then(null, function(error) {
      /*eslint-disable no-console */
      console.error(error);
      console.error(error.stack);
      /*eslint-enable no-console */
    });
});
