/* global Promise */
define([
  './utils',
  './active-element-observer',
  './css-focus-observer',
  './focus-event-observer',
  'ally/query/focusable',
  'ally/query/tabbable',
  'ally/query/tabsequence',
  'jquery',
  'jquery-ui/core',
], function(utils, ActiveElementObserver, CssFocusObserver, FocusEventObserver, queryFocusable, queryTabbable, queryTabsequence, $) {
  function mapLabels(list) {
    return list.map(utils.elementName).filter(utils.removeIgnoredName);
  }

  function Collector(elements) {
    this.elements = elements;
    this.results = {};
    this.observe = {
      focusEvent: new FocusEventObserver(),
      activeElement: new ActiveElementObserver(),
      cssFocus: new CssFocusObserver(),
    };
  }

  Collector.prototype = {

    mapElements: function(callback) {
      return this.mapAsync(this.elements.relevantElements, callback);
    },
    mapFocusableElements: function(callback) {
      return this.mapAsync(this.elements.scriptFocusableElements, callback);
    },
    mapAsync: function(elements, callback) {
      var results = {};

      var executeCallback = function(element) {
        var elementName = utils.elementName(element);

        var observeElement = function() {
          var _element = [element];

          var hostElement = this.elements.getHostElement(element);
          if (hostElement) {
            _element.push(hostElement);
          }

          var referenceElement = this.elements.getReferenceElement(element);
          if (referenceElement) {
            _element.push(referenceElement);
          }

          this.observer.focusEvent.observe(_element);
          return this.observer;
        }.bind(this);

        var terminateElement = function() {
          this.observer.focusEvent.terminate(element);
        }.bind(this);

        // setup observers
        return new Promise(function(resolve /*, reject */) {
          callback(element, function(data) {
            results[elementName] = data;
            terminateElement();
            resolve(data);
          }, observeElement);
        });
      }.bind(this);

      var prepareResults = function() {
        this.results = utils.sortMapByKey(results);
        this.terminateObservers();
        return this.results;
      }.bind(this);

      this.initObservers();
      return utils.asyncMap(elements, executeCallback, this)
        .then(prepareResults);
    },

    initObservers: function() {
      this.observer = {
        focusEvent: new FocusEventObserver(),
      };
    },
    terminateObservers: function() {
      this.observer.focusEvent.terminate();
    },

    queryElementsAlly: function() {
      this.results = {
        focusableQuick: mapLabels(queryFocusable({
          context: document,
          includeContext: true,
          strategy: 'quick',
        })),
        focusableStrict: mapLabels(queryFocusable({
          context: document,
          includeContext: true,
          strategy: 'strict',
        })),
        tabbableQuick: mapLabels(queryTabbable({
          context: document,
          includeContext: true,
          strategy: 'quick',
        })),
        tabbableStrict: mapLabels(queryTabbable({
          context: document,
          includeContext: true,
          strategy: 'strict',
        })),
        tabsequence: mapLabels(queryTabsequence({
          context: document,
          includeContext: true,
          strategy: 'strict',
        })),
      };

      return window.Promise.resolve(this.results);
    },
    queryElementsJquery: function() {
      this.results = {
        focusable: mapLabels($(':focusable').toArray()),
        tabbable: mapLabels($(':tabbable').toArray()),
      };

      return window.Promise.resolve(this.results);
    },

    observeTabsequence: function() {
      var sequence = [];
      var hostElements = {};

      var blockTabKey = false;
      var timer;
      var temp = {};

      var collectHostElement = function(ident) {
        var element = this.elements.getElement(ident);
        var hostElement = this.elements.getHostElement(element);
        if (!hostElement) {
          return;
        }

        hostElements[ident] = this.elements.analyzeActiveElementState(hostElement, null);
        hostElements[ident].ident = utils.elementName(hostElement);
      }.bind(this);

      var collectObservations = function() {
        blockTabKey = false;
        var keys = Object.keys(temp);
        temp = {};

        // for nested elements the deepest element (actually having focus)
        // contains the ancestral idents
        keys = keys.filter(function(ident) {
          if (ident === 'ignore') {
            return false;
          }

          return !keys.some(function(_ident) {
            return ident.length < _ident.length && _ident.substr(0, ident.length) === ident;
          });
        });

        // nested elements are filtered
        // so we'll go with the first we got
        var ident = keys[0];
        if (!ident) {
          return;
        }

        collectHostElement(ident);
        sequence.push(ident);
      };

      var registerObservation = function(type, elementName) {
        if (!elementName) {
          return;
        }

        blockTabKey = true;
        temp[elementName] = true;
        window.clearTimeout(timer);
        timer = window.setTimeout(collectObservations, 20);
      };

      var observers;
      var evaluateObservers = function() {
        observers.slice(1).forEach(function(observer) {
          observer.evaluate();
        });
      };

      var documents = this._documentContexts();
      var activeElementObservers = documents.map(function(_document, index) {
        return new ActiveElementObserver(_document, index === 0 ? evaluateObservers : null);
      });
      var cssFocusObservers = documents.map(function(_document) {
        return new CssFocusObserver(_document);
      });

      observers = [].concat(activeElementObservers).concat(cssFocusObservers);
      activeElementObservers.slice(1).forEach(function(observer) {
        observer.observe(registerObservation.bind(null, 'active'), true);
      });
      cssFocusObservers.forEach(function(observer) {
        observer.observe(registerObservation.bind(null, 'css'), true);
      });

      observers[0].observe(registerObservation.bind(null, 'active'));

      var keyEventListener = function(event) {
        if (event.keyCode === 9 && blockTabKey) {
          event.preventDefault();
        }
      };

      document.addEventListener('keydown', keyEventListener, true);

      // ignore the nested document's initial activeElement
      setTimeout(function() {
        sequence.length = 0;
      }, 200);

      return function() {
        document.removeEventListener('keydown', keyEventListener, true);
        observers.forEach(function(observer) {
          observer.terminate();
        });

        this.results = {
          sequence: sequence,
          hostElements: hostElements,
        };

        return this.results;
      }.bind(this);
    },
    _documentContexts: function() {
      function values(object) {
        return Object.keys(object).map(function(key) {
          return object[key];
        });
      }

      return [document]
        .concat(values(this.elements._documents))
        .concat(values(this.elements._shadowed));
    },

    getElementResult: function(element) {
      var elementName = utils.elementName(element);
      return this.results[elementName];
    },
  };

  return Collector;
});
