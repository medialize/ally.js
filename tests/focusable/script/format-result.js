define([
  'platform',
], function(platform) {

  /*
    results = {
      // browser meta data
      platform: <platform>,

      // element state table
      elements: {
        "<ident>": {
          // "<ident>" of host document, or "html" (master document)
          document: "<document-ident>",
          // true if element.focus() exists
          // (which is not true for SVGElement in Firefox and Internet Explorer)
          hasFocusMethod: Boolean,
          // true if the element contains a ShadowRoot
          isShadowHost: Boolean,
          // "<ident>" of host element
          shadowHost: "<ShadowHost-ident>",
          // value of the tabindex attribute
          tabindexAttribute: String,
          // value of the tabIndex property
          tabindexProperty: Number,
          // true if the element can be focused via script
          focusable: Boolean,
          // true if the element can be focused via keyboard
          tabbable: Boolean,
          // ally state for the element
          ally: {
            focusable: Boolean,
            tabbable: Boolean,
            onlyTabbable: Boolean,
            focusTarget: "<target-ident>",
          },
          // jquery state for the element
          jquery: {
            focusable: Boolean,
            tabbable: Boolean,
          },
          // script focus state
          scriptFocus: {
            // true if the element is the document.activeElement in its document/ShadowRoot
            contextActiveElement: Boolean,
            // true if the element is the document.activeElement in the master document
            documentActiveElement: Boolean,
            // true if element.matches(':focus')
            cssFocus: Boolean,
            // "<ident>" of the element hosting the document/documentFragment this element belongs to
            encapsulated: "<target-ident>",
            // "<ident>" of the element that received focus after element.focus() was called
            redirected: "<target-ident>",
            // true if "focus" event was dispatched to the element upon focus
            event: Boolean,
          },
          // state of element if element within is focused (either via script or keyboard)
          hostElementFocus: {
            // true if the element is the document.activeElement in its document/ShadowRoot
            contextActiveElement: Boolean,
            // true if the element is the document.activeElement in the master document
            documentActiveElement: Boolean,
            // true if element.matches(':focus')
            cssFocus: Boolean,
            // true if "focus" event was dispatched to the element upon focus
            event: Boolean,
            // "<ident>" of the reference element
            "ident": "<ident>",
          },
          // state of referenced element (e.g. the <img> for <map>)
          "referenceElementFocus": {
            // true if the element is the document.activeElement in its document/ShadowRoot
            "documentActiveElement": false,
            // true if the element is the document.activeElement in the master document
            "contextActiveElement": false,
            // true if element.matches(':focus')
            "cssFocus": false,
            // true if "focus" event was dispatched to the element upon focus
            event: Boolean,
            // "<ident>" of the reference element
            "ident": "<ident>",
          }
        }
      },

      // sequence of elements that received focus during the tabbing test
      // this lists the elements in nested documents and ShadowRoots,
      // not the documents and ShadowHosts
      tabsequence: ["<ident>", …],

      // ally DOM query operation results
      ally: {
        focusableQuick: ["<ident>", …],
        tabbableQuick: ["<ident>", …],
        focusableStrict: ["<ident>", …],
        tabbableStrict: ["<ident>", …],
        tabsequence: ["<ident>", …],
      },

      // jquery DOM query operation results
      jquery: {
        focusable: ["<ident>", …],
        tabbable: ["<ident>", …],
      }

    }
  */

  function removeFalsyProperties(data, properties) {
    properties.forEach(function(property) {
      if (!data[property]) {
        delete data[property];
      }
    });
  }

  function formatResult(collected) {
    var results = {
      platform: platform,
      elements: collected.elementsMeta.results,
    };

    Object.keys(collected.scriptFocus.results).forEach(function(ident) {
      var source = collected.scriptFocus.results[ident];
      var target = results.elements[ident];
      target.scriptFocus = source.scriptFocus;
      target.hostElementFocus = source.hostElementFocus;
      target.referenceElementFocus = source.referenceElementFocus;
    });

    Object.keys(collected.tabsequence.results.hostElements).forEach(function(ident) {
      if (!results.elements[ident].hostElementFocus) {
        results.elements[ident].hostElementFocus = collected.tabsequence.results.hostElements[ident];
      }
    });

    Object.keys(collected.focusEvent.results).forEach(function(ident) {
      var events = collected.focusEvent.results[ident].events;
      results.elements[ident].scriptFocus.event = events.indexOf(ident) !== -1;
      if (results.elements[ident].hostElementFocus) {
        results.elements[ident].hostElementFocus.event = events.indexOf(ident) !== -1;
      }
      if (results.elements[ident].referenceElementFocus) {
        results.elements[ident].referenceElementFocus.event = events.indexOf(ident) !== -1;
      }
    });

    collected.tabsequence.results.sequence.forEach(function(ident) {
      if (!results.elements[ident]) {
        /*eslint-disable no-console */
        console.warn('tabbable but otherwise unknown element', ident);
        /*eslint-enable no-console */
        results.elements[ident] = {
          ally: {},
          jquery: {},
          scriptFocus: {},
        };
      }

      results.elements[ident].tabbable = true;
    });

    // or remove properties that are falsy (to reduce output file size)
    Object.keys(results.elements).forEach(function(ident) {
      var data = results.elements[ident];
      if (!data.scriptFocus) {
        data.scriptFocus = {};
      }

      data.focusable = false
        || data.scriptFocus.contextActiveElement
        || data.scriptFocus.documentActiveElement;

      if (data.tabindexAttribute === null) {
        delete data.tabindexAttribute;
      }

      removeFalsyProperties(data, [
        'hasFocusMethod',
        'document',
        'shadowHost',
        'isShadowHost',
        'focusable',
        'tabbable',
      ]);
      removeFalsyProperties(data.ally, [
        'focusable',
        'tabbable',
        'onlyTabbable',
        'focusTarget',
      ]);
      removeFalsyProperties(data.jquery, [
        'focusable',
        'tabbable',
      ]);
      removeFalsyProperties(data.scriptFocus, [
        'documentActiveElement',
        'contextActiveElement',
        'cssFocus',
        'encapsulated',
        'redirected',
        'event',
      ]);
      data.hostElementFocus && removeFalsyProperties(data.hostElementFocus, [
        'documentActiveElement',
        'contextActiveElement',
        'cssFocus',
      ]);
    });

    results.tabsequence = collected.tabsequence.results.sequence;
    results.ancestry = collected.tabsequence.results.ancestry;
    results.ally = collected.queryAlly.results;
    results.jquery = collected.queryJquery.results;

    return window.Promise.resolve(results);
  }

  return formatResult;
});
