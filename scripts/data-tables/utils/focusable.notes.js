
const path = require('path');

const Remarkable = require('remarkable');

const file = path.resolve(__dirname, '../../../tests/focusable/data/meta.notes.json');
const source = require(file);

// build lookup table and flattened list of notes
let counter = 0;
const index = {};
const map = new Map();
const references = {};

function addNote(message) {
  if (message[0] === '@') {
    // link to a centralized note
    message = references[message];
  }

  const key = map.get(message) || (++counter);
  map.set(message, key);
  return key;
}

function importNotes(keys, data) {
  if (typeof data === 'string') {
    let key = addNote(data);
    keys.push(key);
  } else if (Array.isArray(data)) {
    data.forEach(function(_message) {
      let key = addNote(_message);
      keys.push(key);
    });
  }
}

function addToIndex(_map, _index) {
  _map.general.forEach(key => _index.general.push(key));
  _map.ally.forEach(key => _index.ally.push(key));
  Object.keys(_map.browsers).forEach(function(browser) {
    if (!_index.browsers[browser]) {
      _index.browsers[browser] = [];
    }

    _map.browsers[browser].forEach(key => _index.browsers[browser].push(key));
  });
}

Object.keys(source).forEach(function(ident) {
  if (ident[0] === '@') {
    // resolve alias target
    references[ident] = source[ident];
    addNote(references[ident]);
    delete source[ident];
    return;
  }

  const _map = {
    general: [],
    ally: [],
    browsers: {},
  };

  const data = source[ident];
  importNotes(_map.general, data.general || data);

  data.browsers && Object.keys(data.browsers).forEach(function(browser) {
    if (!_map.browsers[browser]) {
      _map.browsers[browser] = [];
    }

    const _browser = data.browsers[browser];
    importNotes(_map.browsers[browser], _browser);
  });

  data.ally && importNotes(_map.ally, data.ally);

  data.alias && data.alias.forEach(function(_ident) {
    if (!index[_ident]) {
      index[_ident] = {
        general: [],
        ally: [],
        browsers: {},
      };
    }

    addToIndex(_map, index[_ident]);
  });

  if (!index[ident]) {
    index[ident] = {
      general: [],
      ally: [],
      browsers: {},
    };
  }

  addToIndex(_map, index[ident]);
});

const md = new Remarkable({});
const notes = {};
map.forEach(function(key, message) {
  notes[key] = md.render(message);
});

module.exports = {
  get: function(ident) {
    const _map = index[ident];
    return _map && _map.general || [];
  },
  getBrowser: function(ident, browser) {
    const _map = index[ident];
    return _map && _map.browsers[browser] || [];
  },
  getAlly: function(ident) {
    const _map = index[ident];
    return _map && _map.ally || [];
  },
  list: notes,
};
