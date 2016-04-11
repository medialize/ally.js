define(function(require) {
  'use strict';

  var Promise = require('intern/dojo/Promise');

  function FrameProxy(source) {
    // the HTML we're loading in the iframe
    this.source = this.sanitizeSource(source);
    // the <iframe> element
    this.element = null;
    // the <iframe>'s window
    this.window = null;
    // the <iframe>'s document
    this.document = null;
  }

  FrameProxy.prototype = {
    sanitizeSource: function(source) {
      // remove <embed> elements avoid blocking QuickTime upgrade dialog in IE on BrowserStack
      // see https://github.com/medialize/ally.js/pull/80#issuecomment-163602788
      // <object> are fine as long as they're only embedding SVG, Flash or images
      return source
        .replace(/<embed\s[^>]+>/g, '');
    },

    initialize: function(parent) {
      var dfd = new Promise.Deferred();

      this.element = document.createElement('iframe');
      parent.appendChild(this.element);
      this.window = this.element.contentWindow;
      this.document = this.window.document;

      this.document.open();
      this.document.write(this.source);
      this.document.close();

      if (!this.window) {
        dfd.reject();
        return dfd.promise;
      }

      var resolve = function() {
        // Firefox needs some extra time in order to
        // consider ImageMaps linked. I dont even...
        setTimeout(dfd.resolve, 1000);
      };

      if (this.document.readyState === 'complete') {
        resolve();
      } else {
        this.window.addEventListener('load', resolve, false);
      }

      return dfd.promise;
    },

    terminate: function() {
      this.element.parentNode.removeChild(this.element);
      this.source = this.element = this.window = this.document = null;
    },
  };

  return FrameProxy;
});
