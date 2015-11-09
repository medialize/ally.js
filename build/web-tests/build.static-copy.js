
var path = require('path');

var shelljs = require('shelljs');

var cwd = process.cwd();
var SOURCE = path.resolve(cwd, 'tests/');
var TARGET = path.resolve(cwd, 'web/tests/');
var directories = [
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
