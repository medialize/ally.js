#!/usr/bin/env node

var markdownlint = require('markdownlint');
var glob = require('glob');
var path = require('path');

var cwd = path.resolve(process.cwd(), 'docs');

// https://github.com/DavidAnson/markdownlint#rules
// https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md
var config = {
  ignore: 'frontmatter',
  'default': true,
  // Exclusions for deliberate/widespread violations
  MD001: true, // Header levels should only increment by one level at a time
  MD002: true, // First header should be a h1 header
  MD003: { // Header should be `# first level #`
    style: 'atx'
  },
  MD007: {  // Unordered list indentation
    indent: 2
  },
  MD012: false, // Multiple consecutive blank lines
  MD013: false, // Line length

  // MD019: false, // Multiple spaces after hash on atx style header
  // MD021: false, // Multiple spaces inside hashes on closed atx style header
  // MD024: false, // Multiple headers with the same content
  MD026: { // Trailing punctuation in header
    punctuation: '.,;:!'
  },
  // MD029: false, // Ordered list item prefix
  // MD030: false, // Spaces after list markers
  // MD034: false, // Bare URL used
  // MD040: false,  // Fenced code blocks should have a language specified
};

var result = markdownlint.sync({
  files: glob.sync('**/*.md', {cwd: cwd, realpath: true}),
  config: config
}).toString();

if (result) {
  console.error(String(result));
  process.exit(1);
}
