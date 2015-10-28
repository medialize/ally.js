
var Metalsmith = require('metalsmith');
var remarkable = require('metalsmith-markdown-remarkable');
var packageJson = require('metalsmith-packagejson');
var helpers = require('metalsmith-register-helpers');
var layouts = require('metalsmith-layouts');
var linkChecker = require('metalsmith-broken-link-checker');
var prepare = require('./plugins/prepare');

Metalsmith(__dirname)
  .source('../docs')
  .destination('../web')
  .use(remarkable({
    linkify: true,
  }))
  .use(packageJson())
  .use(prepare())
  .use(helpers({
    directory: 'helpers/',
  }))
  .use(layouts({
    directory: './',
    engine: 'handlebars',
    partials: {
      'table-of-contents': 'partials/table-of-contents',
    },
  }))
  .use(linkChecker({
    warn: true,
  }))
  .build(function(err) {
    if (err) throw err;
  });
