
var Metalsmith = require('metalsmith');
var Handlebars = require('handlebars')
var remarkable = require('metalsmith-markdown-remarkable');
var manualSort = require('./plugins/collection.manual-sort');
var paths = require('metalsmith-paths');
var packageJson = require('metalsmith-packagejson');
var registerHelpers = require('metalsmith-register-helpers');
var layouts = require('metalsmith-layouts');
var linkChecker = require('metalsmith-broken-link-checker');
var prepare = require('./plugins/prepare');
var collections = require('metalsmith-collections');
var staticFiles = require('metalsmith-static');

Metalsmith(__dirname)
  .source('../docs')
  .destination('../web')
  .use(remarkable({
    linkify: true,
  }))
  .use(packageJson())
  .use(function(files, metalsmith, done) {
    var metadata = metalsmith.metadata();
    metadata['websiteRoot'] = '/medialize/ally.js/web/';
    done();
  })
  .use(prepare())
  .use(paths())
  .use(collections({
    Home: {
      pattern: '',
    },
    'Getting Started': {
      pattern: 'getting-started.html',
    },
    API: {
      pattern: 'api/**/*.html',
      sortBy: manualSort(['API Index']),
    },
    Tutorials: {
      pattern: 'tutorials/**/*.html',
      sortBy: manualSort(['Tutorials']),
    },
    Contributing: {
      pattern: 'contributing/**/*.html',
      sortBy: manualSort(['Contributing']),
    },
    /*
    key: {
      metadata: {
        name: 'Articles',
        description: 'The Articles listed here...'
      }
    }
    */
  }))
  .use(registerHelpers({
    directory: 'helpers/',
  }))
  .use(layouts({
    directory: './',
    engine: 'handlebars',
    partials: {
      'site-navigation': 'partials/site-navigation',
      'collection-navigation': 'partials/collection-navigation',
      'table-of-contents': 'partials/table-of-contents',
    },
  }))
  .use(staticFiles({
    src: 'assets',
    dest: 'assets',
  }))
  .use(linkChecker({
    warn: true,
  }))
  .build(function(err) {
    if (err) throw err;
  });
