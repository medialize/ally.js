
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

Object.keys(source).forEach(function(ident) {
  if (ident[0] === '@') {
    // resolve alias target
    references[ident] = source[ident];
    addNote(references[ident]);
    delete source[ident];
    return;
  }

  index[ident] = {
    general: [],
    ally: [],
    browsers: {},
  };

  const data = source[ident];
  importNotes(index[ident].general, data.general || data);

  data.browsers && Object.keys(data.browsers).forEach(function(browser) {
    const _browser = data.browsers[browser];
    index[ident].browsers[browser] = [];
    importNotes(index[ident].browsers[browser], _browser);
  });

  data.ally && importNotes(index[ident].ally, data.ally);

  data.alias && data.alias.forEach(function(_ident) {
    index[_ident] = index[ident];
  });
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
