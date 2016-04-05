
import keyBinding from './key.binding';
import nodeArray from '../util/node-array';
import {getParentComparator} from '../util/compare-position';

// Bug 286933 - Key events in the autocomplete popup should be hidden from page scripts
// @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=286933

export default function(map = {}) {
  const bindings = {};

  const context = nodeArray(map.context)[0] || document.documentElement;
  delete map.context;
  const filter = nodeArray(map.filter);
  delete map.filter;

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

    if (filter.length) {
      // ignore elements within the exempted sub-trees
      const isParentOfElement = getParentComparator({element: event.target, includeSelf: true});
      if (filter.some(isParentOfElement)) {
        return;
      }
    }

    const key = event.keyCode || event.which;
    if (!bindings[key]) {
      return;
    }

    bindings[key].forEach(function(_event) {
      if (!_event.matchModifiers(event)) {
        return;
      }

      _event.callback.call(context, event, disengage);
    });
  };

  context.addEventListener('keydown', handleKeyDown, false);

  const disengage = function() {
    context.removeEventListener('keydown', handleKeyDown, false);
  };

  return { disengage };
}
