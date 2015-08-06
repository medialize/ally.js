define([], function() {

  // possibly replace this with https://github.com/termi/DOM-Keyboard-Event-Level-3-polyfill
  function createKeyEvent(type, options) {
    // new KeyboardEvent('keydown'), {
    //   key: 'Tab',
    //   code: 'Tab',
    //   keyCode: 9,
    // }
    // https://gist.github.com/boazsender/1291874
    var event = document.createEvent('KeyboardEvent');
    if (event.initKeyEvent) {
      // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/initKeyEvent
      event.initKeyEvent(type, true, false, null, false, false, false, false, options.keyCode, 0);
    } else {
      // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/initKeyboardEvent
      event.initKeyboardEvent(type, true, false, null, '', options.keyCode, null, '', false);
    }

    // http://stackoverflow.com/questions/1897333/firing-a-keyboard-event-on-chrome
    Object.defineProperty(event, 'keyCode', {value: options.keyCode});
    Object.defineProperty(event, 'which', {value: options.keyCode});

    return event;
  }

  function createMouseEvent(type, options) {
    return new MouseEvent(type, options);
  }

  return {
    mouse: function(target, type, options) {
      var event = createMouseEvent(type, options || {});
      if (target) {
        target.dispatchEvent(event);
      }

      return event;
    },
    key: function(target, type, options) {
      var event = createKeyEvent(type, options || {});
      if (target) {
        target.dispatchEvent(event);
      }

      return event;
    },
  };

});
