
import keycode from '../map/keycode';

// Bug 286933 - Key events in the autocomplete popup should be hidden from page scripts
// @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=286933

export default function(map = {}) {
  let disengage;

  const keys = {};
  const mapKeys = Object.keys(map);
  if (!mapKeys.length) {
    throw new TypeError('when/key requires at least one option key');
  }

  mapKeys.forEach(function(key) {
    const code = keycode[key] || parseInt(key, 10);
    if (!code || typeof code !== 'number' || isNaN(code)) {
      throw new TypeError('when/key requires option keys to be numeric or references to map/keycode, but "' + key + '" is neither');
    }

    if (typeof map[key] !== 'function') {
      throw new TypeError('when/key requires option.' + key + ' to be a function');
    }

    keys[code] = map[key];
  });

  const handleKeyDown = function(event) {
    if (event.defaultPrevented) {
      return;
    }

    const callback = keys[event.keyCode];
    if (!callback) {
      return;
    }

    callback.call(this, event, disengage);
  };

  document.documentElement.addEventListener('keydown', handleKeyDown, false);

  disengage = function() {
    document.documentElement.removeEventListener('keydown', handleKeyDown, false);
  };

  return { disengage };
}
