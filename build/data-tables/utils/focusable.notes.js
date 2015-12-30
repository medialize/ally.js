
const path = require('path');

const Notes = require('./focusable.notes.interface');

const cwd = process.cwd();
const _source = path.resolve(cwd, 'tests/focusable/data/meta.notes.json');
const source = require(_source);

const notes = new Notes(source);

module.exports = notes;
