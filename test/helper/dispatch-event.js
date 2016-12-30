define([], function() {
  // if this file executes in strict mode,
  // KeyboardEvents are not created properly
  'do not use strict';

  // possibly replace this with https://github.com/termi/DOM-Keyboard-Event-Level-3-polyfill
  function createKeyEvent(type, options) {
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent
    if (typeof KeyboardEvent === 'function') {
      options.bubbles = true;
      return new KeyboardEvent(type, options);
    }

    // https://gist.github.com/boazsender/1291874
    var event = document.createEvent('KeyboardEvent');
    if (event.initKeyEvent) {
      // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/initKeyEvent
      event.initKeyEvent(type, true, false, null, !!options.ctrlKey, !!options.altKey, !!options.shiftKey, !!options.metaKey, options.keyCode, 0);
    } else if (event.initKeyboardEvent) {
      // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/initKeyboardEvent
      var modifiers = [];
      options.altKey && modifiers.push('Alt');
      options.ctrlKey && modifiers.push('Ctrl');
      options.metaKey && modifiers.push('Meta');
      options.shiftKey && modifiers.push('Shift');
      event.initKeyboardEvent(type, true, false, null, '', options.keyCode, null, modifiers.join(' '), false);
    }

    try {
      // Safari 7 does not like this: ATTEMPTING TO CHANGE VALUE OF A READONLY PROPERTY
      // https://stackoverflow.com/questions/1897333/firing-a-keyboard-event-on-chrome
      Object.defineProperty(event, 'keyCode', {value: options.keyCode});
      Object.defineProperty(event, 'which', {value: options.keyCode});
      Object.defineProperty(event, 'altKey', {value: !!options.altKey});
      Object.defineProperty(event, 'ctrlKey', {value: !!options.ctrlKey});
      Object.defineProperty(event, 'metaKey', {value: !!options.metaKey});
      Object.defineProperty(event, 'shiftKey', {value: !!options.shiftKey});
      // Internet Explorer does not like this
      event.keyCode = options.keyCode;
    } catch (e) {
      // IGNORE
      return false;
    }

    return event;
  }

  function createMouseEvent(type, options) {
    if (typeof MouseEvent === 'function') {
      return new MouseEvent(type, options);
    }

    var evt = document.createEvent('MouseEvent');
    evt.initMouseEvent(type,
      options.bubbles || true,
      options.cancelable || true,
      options.view || window,
      options.detail || 1,
      options.screenX || 0,
      options.screenY || 0,
      options.clientX || 0,
      options.clientY || 0,
      options.ctrlKey || false,
      options.altKey || false,
      options.shiftKey || false,
      options.metaKey || false,
      options.button || 0,
      options.relatedTarget || null
    );

    return evt;
  }

  return {
    createMoutse: createMouseEvent,
    mouse: function(target, type, options) {
      var event = createMouseEvent(type, options || {});
      if (!event) {
        return event;
      }

      if (target) {
        target.dispatchEvent(event);
      }

      return event;
    },
    createKey: createKeyEvent,
    key: function(target, type, options) {
      var event = createKeyEvent(type, options || {});
      if (!event) {
        return event;
      }

      if (target) {
        target.dispatchEvent(event);
      }

      return event;
    },
    preventDefault: function(event) {
      event.preventDefault();
      if (event.defaultPrevented) {
        return;
      }

      try {
        // Safari 7 does not like this: ATTEMPTING TO CHANGE VALUE OF A READONLY PROPERTY
        // https://stackoverflow.com/questions/1897333/firing-a-keyboard-event-on-chrome
        Object.defineProperty(event, 'defaultPrevented', {value: true});
        // Internet Explorer does not like this
        event.defaultPrevented = true;
      } catch (e) {
        // IGNORE
        return;
      }
    },
  };
});
