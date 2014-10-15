define(function defineFocusContain() {
  var keycode = require('../map/keycode');
  var wrap = require('./wrap');

  function handle(event) {
    var code = event.which || event.keyCode;
    if (code !== keycode.tab) {
      return;
    }

    if (wrap(this, !event.shift)) {
      event.preventDefault()
    }
  };

  function contain(context) {
    // TODO: create a central key-event-manager instead?
    // TODO: should this be bound to context, not body?
    var _handle = handle.bind(context);
    // Chrome won't fire a keypress for TAB
    context.addEventListener('keydown', _handle, false);
    return function off() {
      context.removeEventListener('keydown', _handle, false);
    };
  };
  
  return contain;
});