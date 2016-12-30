define([
  './utils',
  'ally/prototype/window.requestanimationframe',
], function(utils) {
  function ActiveElementObserver(doc, onTick) {
    this.document = doc || document;
    this.lastElementName = null;
    this.onTick = onTick;
    this.callback = null;
    this.history = null;
    this.running = false;
    this.raf = null;
    this.tick = this.tick.bind(this);
  }

  ActiveElementObserver.prototype = {
    tick: function() {
      this.evaluate();
      this.onTick && this.onTick();

      if (this.running) {
        this.raf = requestAnimationFrame(this.tick);
      }
    },
    evaluate: function() {
      var activeElement;

      try {
        activeElement = this.document.activeElement;
      } catch (e) {
        // IE13 does not like this
        activeElement = null;
      }

      if (!activeElement) {
        return;
      }

      var elementName = utils.elementName(activeElement);
      if (activeElement === this.document.body || this.lastElementName === elementName) {
        return;
      }

      this.lastElementName = elementName;
      if (this.callback) {
        this.callback(elementName, activeElement);
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

  return ActiveElementObserver;
});
