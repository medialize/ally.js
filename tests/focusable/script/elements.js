define([
  './utils',
  'ally/util/element-matches',
  'ally/is/focusable',
  'ally/is/tabbable',
  'ally/is/only-tabbable',
  'ally/get/focus-redirect-target',
  'jquery',
  'jquery-ui/core',
], function(utils, elementMatches, isFocusable, isTabbable, isOnlyTabbable, getFocusRedirectTarget, $) {

  // infrastructure grabbing all the elements we have
  function Elements() {
    // [html, head, …]
    this.query();
    // { 'iframe-label': [html, head, …], … }
    this.queryNestedDocuments();
    // NOTE: this.documents may differ from window.nestedDocuments
    // { 'shadow-label': [html, head, …] }
    this.queryShadowHosts();
    // [html, head, … iframe, html, head, … shadowed-element, …]
    this.allElements = this.mergeElements();
    // the set we're actually working with
    this.relevantElements = this.allElements
      .filter(utils.filterLabeledElements)
      .filter(utils.removeIgnoredAttribute);
    // the elements we can actually focus from script
    this.scriptFocusableElements = this.relevantElements.slice(0);

    // lookup table for ident -> element,
    // also log duplicate ident use
    this.idents = this.listToMap(this.relevantElements);
  }

  Elements.prototype = {
    query: function() {
      // all elements of the document
      this.elements = [].slice.call(document.documentElement.querySelectorAll('*'), 0);
      // including the <html> itself
      this.elements.unshift(document.documentElement);
    },
    queryNestedDocuments: function() {
      this.documents = {};
      this._documents = {};

      [].forEach.call(document.querySelectorAll('iframe, object, embed'), function(element) {
        var _document = this.getContentDocument(element);
        if (!_document || !_document.documentElement) {
          return;
        }

        var elementName = utils.elementName(element);
        var elements = [].slice.call(_document.documentElement.querySelectorAll('*'), 0);
        elements.unshift(_document.documentElement);
        this.documents[elementName] = elements;
        this._documents[elementName] = _document;
      }, this);

      // not all document may be have been found (e.g. embed)
      Object.keys(window.nestedDocuments).forEach(function(key) {
        if (this.documents[key]) {
          return;
        }

        var _document = window.nestedDocuments[key];
        var elements = [].slice.call(_document.documentElement.querySelectorAll('*'), 0);
        elements.unshift(_document.documentElement);
        this.documents[key] = elements;
        this._documents[key] = _document;
      }, this);
    },
    queryShadowHosts: function() {
      this.shadowed = {};
      this._shadowed = {};

      if (!document.body.createShadowRoot) {
        return;
      }

      var queryHost = function(host) {
        var elementName = utils.elementName(host);
        var elements = [].slice.call(host.shadowRoot.querySelectorAll('*'), 0);
        this.shadowed[elementName] = elements;
        this._shadowed[elementName] = host.shadowRoot;

        var nestedHosts = elements.filter(utils.filterShadowRoot);
        nestedHosts.forEach(queryHost, this);
      };

      this.elements.filter(utils.filterShadowRoot).forEach(queryHost, this);
    },
    getContentDocument: function(element) {
      try {
        // works on <object> and <iframe>
        return element.contentDocument
          // works on <object> and <iframe>
          || element.contentWindow && element.contentWindow.document
          // works on <object> and <iframe> that contain SVG
          || element.getSVGDocument && element.getSVGDocument();
      } catch (e) {
        // IE may throw member not found exception
        // e.g. on <object type="image/png">
        return null;
      }
    },
    mergeElements: function() {
      var result = this.elements.slice(0);

      var mergeObjectArray = function(list) {
        Object.keys(list).forEach(function(key) {
          result.push.apply(result, list[key]);
        });
      };

      mergeObjectArray(this.documents);
      mergeObjectArray(this.shadowed);

      return result;
    },
    listToMap: function(list) {
      var result = {};
      var map = {};
      var keys = [];
      list.forEach(function(element) {
        var name = utils.elementName(element);
        if (!map[name]) {
          map[name] = [];
        }

        result[name] = element;
        map[name].push(element);
        if (map[name].length > 1) {
          keys.push(name);
        }
      });

      keys.forEach(function(key) {
        /*eslint-disable no-console */
        console.warn('duplicate', key, map[key]);
        /*eslint-enable no-console */
      });

      return result;
    },

    getElement: function(ident) {
      return this.idents[ident];
    },
    getHostElement: function(element) {
      var ident = null
        || this.getElementsShadowHost(element)
        || this.getElementsDocument(element);

      if (!ident || ident === 'html') {
        return null;
      }

      return this.getElement(ident);
    },
    getReferenceElement: function(element) {
      var ident = element.getAttribute('data-reference');
      if (!ident) {
        return null;
      }

      return this.getElement(ident);
    },

    getElementsDocument: function(element) {
      if (this.elements.indexOf(element) !== -1) {
        return 'html';
      }

      var doc = null;
      Object.keys(this.documents).some(function(documentName) {
        var elements = this.documents[documentName];
        if (elements.indexOf(element) !== -1) {
          doc = documentName;
          return true;
        }

        return false;
      }, this);

      return doc;
    },
    getElementsShadowHost: function(element) {
      if (this.elements.indexOf(element) !== -1) {
        return null;
      }

      var host = null;
      Object.keys(this.shadowed).some(function(shadowHostName) {
        var elements = this.shadowed[shadowHostName];
        if (elements.indexOf(element) !== -1) {
          host = shadowHostName;
          return true;
        }

        return false;
      }, this);

      return host;
    },
    isElementShadowHost: function(element) {
      var elementName = utils.elementName(element);
      return Boolean(this.shadowed[elementName]);
    },

    analyzeElementMeta: function(element) {
      return {
        // the element's tabIndex value
        tabindexProperty: element.tabIndex,
        // the DOM value of the tabindex attribute
        tabindexAttribute: element.getAttribute('tabindex'),
        // true if the element has a focus method
        // (SVG elements in Firefox and IE don't)
        hasFocusMethod: utils.filterFocusMethod(element),
        // "html" for anything within the document,
        // the container element's label for everything else
        document: this.getElementsDocument(element),
        // null for elements not within a ShadowHost,
        // the ShadowHost's label for everything else
        shadowHost: this.getElementsShadowHost(element),
        // true if the element itself contains a ShadowRoot
        isShadowHost: this.isElementShadowHost(element),
      };
    },
    analyzeElementAlly: function(element) {
      var target = getFocusRedirectTarget({context: element});
      var focusable = isFocusable(element);
      return {
        focusable: focusable,
        tabbable: focusable && isTabbable(element),
        onlyTabbable: !focusable && isOnlyTabbable(element),
        focusTarget: target && utils.elementName(target) || null,
      };
    },
    analyzeElementJquery: function(element) {
      var $element = $(element);
      return {
        focusable: $element.is(':focusable'),
        tabbable: $element.is(':tabbable'),
      };
    },
    analyzeActiveElementState: function(element, previousActiveElement) {
      var meta = this.analyzeElementMeta(element);
      var data = {
        // true if the element is the activeElement of the master document
        documentActiveElement: document.activeElement === element,
        // true if the element is the activeElement within the nested document or ShadowRoot
        contextActiveElement: false,
        // true if the element has the :focus pseudo class set
        cssFocus: elementMatches(element, ':focus'),
      };

      try {
        // IE may throw when trying to access .activeElement on an svg document
        data.contextActiveElement = utils.getRootNode(element).activeElement === element;
      } catch (e) {
        // IGNORE
      }

      // in case the element did not become the activeElement itself
      // but the activeElement changed anyway, we're either dealing with
      // encapsulated focus (e.g. content of <iframe>),
      // or redirected focus (e.g. <label> to <input>)
      var isRedirectedFocus = previousActiveElement !== null
        && !data.documentActiveElement
        && document.activeElement !== previousActiveElement;

      // The SVG foreignObject hack may lead to <body>, or the temporary container <g>
      // receiving focus. If that's not a proper redirection and must be ignored.
      var activeElementLabel = document.activeElement.getAttribute('data-label');
      var isFailedSvgRedirection = activeElementLabel === 'body'
        || activeElementLabel === 'ignore';

      if (isRedirectedFocus && !isFailedSvgRedirection) {
        // SVG document don't know document.activeElement, which is why we
        // can't simply test agains data.contextActiveElement
        if (meta.document !== 'html' || meta.shadowHost) {
          // label of element in master document that received focus as well
          data.encapsulated = utils.elementName(document.activeElement);
        } else {
          // label of element in master document that received focus instead
          data.redirected = utils.elementName(document.activeElement);
        }
      }

      return data;
    },
  };

  return Elements;
});
