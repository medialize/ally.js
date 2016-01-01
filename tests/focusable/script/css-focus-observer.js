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
      var focused = this.document.querySelector(':focus');
      if (focused) {
        var elementName = utils.elementName(focused);
        if (this.lastElementName !== elementName) {
          this.lastElementName = elementName;
          if (this.callback) {
            this.callback(elementName, focused);
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

  return CssFocusObserver;
});
