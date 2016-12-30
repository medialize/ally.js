#!/usr/bin/env node

const markdownlint = require('markdownlint');

// "<binary>" "<path>" "--" "<file1>" "<file2>" "<file…>"
const files = process.argv.slice(3);

// https://github.com/DavidAnson/markdownlint#rules
// https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md
const config = {
  'default': true,
  // Exclusions for deliberate/widespread violations
  MD001: true, // Header levels should only increment by one level at a time
  MD002: true, // First header should be a h1 header
  MD003: { // Header should be `# first level #`
    style: 'atx',
  },
  MD007: {  // Unordered list indentation
    indent: 2,
  },
  MD012: false, // Multiple consecutive blank lines
  MD013: false, // Line length

  // MD019: false, // Multiple spaces after hash on atx style header
  // MD021: false, // Multiple spaces inside hashes on closed atx style header
  MD022: false, // Headers should be surrounded by blank lines (disabled for denser @@@example blocks)
  // MD024: false, // Multiple headers with the same content
  MD026: { // Trailing punctuation in header
    punctuation: '.,;:!',
  },
  // MD029: false, // Ordered list item prefix
  // MD030: false, // Spaces after list markers
  MD033: {
    // https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md#md033---inline-html
    /*eslint-disable camelcase */
    allowed_elements: ['kbd', 'a'],
    /*eslint-enable camelcase */
  },
  // MD034: false, // Bare URL used
  // MD040: false,  // Fenced code blocks should have a language specified
};

markdownlint({
  files,
  frontMatter: /(^---$[^]*?^---$)?(\r\n|\r|\n){1,}/m,
  config: config,
}, function(err, result) {
  /*eslint-disable no-console */
  /*eslint-disable no-process-exit */
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const resultString = result.toString();
  if (resultString) {
    console.error(resultString);
    process.exit(1);

  }
  /*eslint-enable no-console */
  /*eslint-enable no-process-exit */
});
