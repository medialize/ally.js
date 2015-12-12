
/*
  decodes a key binding token to a JavaScript structure

  returns an array of objects:
    {
      // key name translated to keyCode (possibly more than one)
      keyCodes: [<number>],
      // translated modifiers
      modifiers: {
        altKey: null,   // ignore
        ctrKey: false,  // expect not pressed
        metaKey: true,  // expect pressed
        shiftKey: true, // expect pressed
      },
      // callback that returns true if event's
      // modifier keys match the expected state
      matchModifiers: function(event){},
    }
*/

import keycode from '../map/keycode';

const modifier = {
  alt: 'altKey',
  ctrl: 'ctrlKey',
  meta: 'metaKey',
  shift: 'shiftKey',
};

const modifierSequence = Object.keys(modifier).map(name => modifier[name]);

function createExpectedModifiers(ignoreModifiers) {
  const value = ignoreModifiers ? null : false;
  return {
    altKey: value,
    ctrlKey: value,
    metaKey: value,
    shiftKey: value,
  };
}

function resolveModifiers(modifiers) {
  const ignoreModifiers = modifiers.indexOf('*') !== -1;
  const expected = createExpectedModifiers(ignoreModifiers);

  modifiers.forEach(function(token) {
    if (token === '*') {
      // we've already covered the all-in operator
      return;
    }

    // we want the modifier pressed
    let value = true;
    const operator = token.slice(0, 1);
    if (operator === '?') {
      // we don't care if the modifier is pressed
      value = null;
    } else if (operator === '!') {
      // we do not want the modifier pressed
      value = false;
    }

    if (value !== true) {
      // compensate for the modifier's operator
      token = token.slice(1);
    }

    const propertyName = modifier[token];
    if (!propertyName) {
      throw new TypeError('Unknown modifier "' + token + '"');
    }

    expected[propertyName] = value;
  });

  return expected;
}

function resolveKey(key) {
  const code = keycode[key] || parseInt(key, 10);
  if (!code || typeof code !== 'number' || isNaN(code)) {
    throw new TypeError('Unknown key "' + key + '"');
  }

  return [code].concat(keycode._alias[code] || []);
}

function matchModifiers(expected, event) {
  // returns true on match
  return !modifierSequence.some(function(prop) {
    // returns true on mismatch
    return typeof expected[prop] === 'boolean' && Boolean(event[prop]) !== expected[prop];
  });
}

export default function(text) {
  return text.split(/\s+/).map(function(_text) {
    const tokens = _text.split('+');
    const _modifiers = resolveModifiers(tokens.slice(0, -1));
    const _keyCodes = resolveKey(tokens.slice(-1));
    return {
      keyCodes: _keyCodes,
      modifiers: _modifiers,
      matchModifiers: matchModifiers.bind(null, _modifiers),
    };
  });
}
