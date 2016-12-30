define([
  './utils',
  'ally/prototype/window.requestanimationframe',
], function(utils) {
  function CssFocusObserver(doc) {
    this.document = doc || document;
    this.lastElementName = null;
    this.callback = null;
    this.history = null;
    this.running = false;
    this.raf = null;

    this.tick = this.tick.bind(this);
  }

  CssFocusObserver.prototype = {
    tick: function() {
      this.evaluate();

      if (this.running) {
        this.raf = requestAnimationFrame(this.tick);
      }
    },
    evaluate: function() {
      var focused = this.document.querySelector(':focus');
      if (!focused) {
        return;
      }

      var elementName = utils.elementName(focused);
      if (this.lastElementName === elementName) {
        return;
      }

      this.lastElementName = elementName;
      if (this.callback) {
        this.callback(elementName, focused);
      } else {
        this.history.push(elementName);
      }
    },

    observe: function(callback, externalEvaluation) {
      this.lastElementName = null;
      this.callback = callback || null;
      this.history = [];
      this.running = true;
      !externalEvaluation && this.tick();
    },
    terminate: function() {
      this.running = false;
      this.callback = null;
      cancelAnimationFrame(this.raf);
    },
  };

  return CssFocusObserver;
});
