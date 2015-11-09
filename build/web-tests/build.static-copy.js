
const path = require('path');

const shelljs = require('shelljs');

const cwd = process.cwd();
const SOURCE = path.resolve(cwd, 'tests/');
const TARGET = path.resolve(cwd, 'web/tests/');
const directories = [
  'browser-bugs',
  // event-sequence handled by build.event-sequence.js
  // exploring skipped
  'focus-outline-styles',
  // focusable handled by build.event-sequence.js
  'fragment-focus',
  'index.html',
  'media',
  'scrolling',
];

shelljs.mkdir('-p', TARGET);
directories.forEach(function(directory) {
  shelljs.cp('-r', path.resolve(SOURCE, directory), TARGET);
});
