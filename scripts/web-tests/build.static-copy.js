
var shelljs = require('shelljs');

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
var SOURCE = 'tests/';
var TARGET = 'web/tests/';

shelljs.mkdir('-p', TARGET);
directories.forEach(function(directory) {
  shelljs.cp('-r', SOURCE + directory, TARGET);
});
