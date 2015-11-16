#!/usr/bin/env node

const markdownlint = require('markdownlint');
const glob = require('glob');
const path = require('path');

const cwd = path.resolve(process.cwd(), 'docs');

// https://github.com/DavidAnson/markdownlint#rules
// https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md
const config = {
  // as of 0.0.8 markdownlint will support options.frontMatter
  ignore: 'frontmatter',
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
  // MD024: false, // Multiple headers with the same content
  MD026: { // Trailing punctuation in header
    punctuation: '.,;:!',
  },
  // MD029: false, // Ordered list item prefix
  // MD030: false, // Spaces after list markers
  MD033: ['kbd', 'a'], // patched in rodneyrehm/markdownlint
  // MD034: false, // Bare URL used
  // MD040: false,  // Fenced code blocks should have a language specified
};

markdownlint({
  files: glob.sync('**/*.md', {cwd: cwd, realpath: true}),
  // as of 0.0.8 markdownlint will support front-matter
  // MD041 does not like an empty line before the first header,
  // so we'll simply consider that empty line frontMatter...
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

