define([
  './utils',
], function(utils) {

  function FocusEventObserver() {
    this.seenBefore = {};
    this.callback = null;
    this.history = null;
    this.running = false;

    this.handleEvent = this.handleEvent.bind(this);
  }

  FocusEventObserver.prototype = {
    handleEvent: function(event) {
      if (this.skipRepeatedEvent(event)) {
        return;
      }

      this.history.push(utils.elementName(event.target));
    },
    skipRepeatedEvent: function(event) {
      if (event.target && (event.target.nodeName === 'BODY' || event.target.nodeName === 'HTML') && !event.relatedTarget) {
        if (this.seenBefore[event.target.nodeName]) {
          // IE10 and IE11: ignore repeated focus events on <body> and <html> as they are irrelevant to data-collection
          return true;
        }

        this.seenBefore[event.target.nodeName] = true;
      }

      return false;
    },

    bind: function(element) {
      element.addEventListener('focus', this.handleEvent, false);
    },
    unbind: function(element) {
      element.removeEventListener('focus', this.handleEvent, false);
    },

    observe: function(element, callback) {
      this.elements = element.nodeType ? [element] : element;
      this.seenBefore = {};
      this.callback = callback || null;
      this.history = [];
      this.running = true;
      this.elements.forEach(this.bind, this);
    },
    terminate: function() {
      this.elements && this.elements.forEach(this.unbind, this);
      this.running = false;
      this.callback = null;
      this.element = null;
    },
    getHistory: function() {
      return this.history.slice(0);
    },
  };

  return FocusEventObserver;
});
