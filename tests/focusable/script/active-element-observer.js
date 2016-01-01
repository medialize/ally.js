define([
  './utils',
  'ally/prototype/window.requestanimationframe',
], function(utils) {

  function ActiveElementObserver(doc) {
    this.document = doc || document;
    this.lastElementName = null;
    this.callback = null;
    this.history = null;
    this.running = false;
    this.raf = null;
    this.tick = this.tick.bind(this);
  }

  ActiveElementObserver.prototype = {
    tick: function() {
      var activeElement;

      try {
        activeElement = this.document.activeElement;
      } catch(e) {
        // IE13 does not like this
        activeElement = null;
      }

      if (activeElement) {
        var elementName = utils.elementName(activeElement);
        if (activeElement !== this.document.body && this.lastElementName !== elementName) {
          this.lastElementName = elementName;
          if (this.callback) {
            this.callback(elementName, activeElement);
          } else {
            this.history.push(elementName);
          }
        }
      }

      if (this.running) {
        this.raf = requestAnimationFrame(this.tick);
      }
    },

    observe: function(callback) {
      this.lastElementName = null;
      this.callback = callback || null;
      this.history = [];
      this.running = true;
      this.tick();
    },
    terminate: function() {
      this.running = false;
      this.callback = null;
      cancelAnimationFrame(this.raf);
    },
  };

  return ActiveElementObserver;
});
