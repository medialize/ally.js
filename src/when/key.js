
import keyBinding from './key.binding';

// Bug 286933 - Key events in the autocomplete popup should be hidden from page scripts
// @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=286933

export default function(map = {}) {
  let disengage;
  const bindings = {};

  const mapKeys = Object.keys(map);
  if (!mapKeys.length) {
    throw new TypeError('when/key requires at least one option key');
  }

  const registerBinding = function(event) {
    event.keyCodes.forEach(function(code) {
      if (!bindings[code]) {
        bindings[code] = [];
      }

      bindings[code].push(event);
    });
  };

  mapKeys.forEach(function(text) {
    if (typeof map[text] !== 'function') {
      throw new TypeError('when/key requires option["' + text + '"] to be a function');
    }

    const addCallback = function(event) {
      event.callback = map[text];
      return event;
    };

    keyBinding(text)
      .map(addCallback)
      .forEach(registerBinding);
  });

  const handleKeyDown = function(event) {
    if (event.defaultPrevented) {
      return;
    }

    const key = event.keyCode || event.which;
    if (!bindings[key]) {
      return;
    }

    const context = this;
    bindings[key].forEach(function(_event) {
      if (!_event.matchModifiers(event)) {
        return;
      }

      _event.callback.call(context, event, disengage);
    });
  };

  document.documentElement.addEventListener('keydown', handleKeyDown, false);

  disengage = function() {
    document.documentElement.removeEventListener('keydown', handleKeyDown, false);
  };

  return { disengage };
}
