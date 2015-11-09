
var metalsmith = require('metalsmith');
var remarkable = require('metalsmith-markdown-remarkable');
var paths = require('metalsmith-paths');
var packageJson = require('metalsmith-packagejson');
var registerHelpers = require('metalsmith-register-helpers');
var layouts = require('metalsmith-layouts');
var linkChecker = require('metalsmith-broken-link-checker');
var collections = require('metalsmith-collections');
var staticFiles = require('metalsmith-static');
var redirect = require('metalsmith-redirect');

var manualSort = require('./plugins/collection.manual-sort');
var prepare = require('./plugins/prepare');
var absoluteUrl = require('./plugins/absolute-url');

var WEBSITE_ROOT = '/medialize/ally.js/';

function getRedirectionMap() {
  // make sure legacy links are forwarded
  return {
    '/tests/focusable/table.html': WEBSITE_ROOT + 'data-tables/focusable.html',
    '/tests/static-results/focusable.html': WEBSITE_ROOT + 'data-tables/focusable.html',
    '/tests/static-results/scrolling-into-view.html': WEBSITE_ROOT + 'tests/scrolling/table.html',
    '/examples/active-elements.html': WEBSITE_ROOT + 'api/get/active-elements.html',
    '/examples/disable-focus.html': WEBSITE_ROOT + 'api/maintain/disabled.html',
    '/examples/fix-pointer-focus-children.html': WEBSITE_ROOT + 'api/fix/pointer-focus-children.html',
    '/examples/fix-pointer-focus-input.html': WEBSITE_ROOT + 'api/fix/pointer-focus-input.html',
    '/examples/fix-pointer-focus-parent.html': WEBSITE_ROOT + 'api/fix/pointer-focus-parent.html',
    '/examples/focus-source.html': WEBSITE_ROOT + 'api/style/focus-source.html',
    '/examples/focus-when-visible.html': WEBSITE_ROOT + 'api/when/visible-area.html',
    '/examples/focus-within.html': WEBSITE_ROOT + 'api/style/focus-within.html',
    '/examples/index.html': WEBSITE_ROOT + 'api/index.html',
    '/examples/trap-focus.html': WEBSITE_ROOT + 'api/maintain/disabled.html',
    '/examples/visible-area.html': WEBSITE_ROOT + 'api/util.html',
  };
}

metalsmith(__dirname)
  .source('../../docs')
  .destination('../../web')
  .use(remarkable({
    linkify: true,
  }))
  .use(packageJson())
  .use(absoluteUrl({
    property: 'websiteRoot',
    define: WEBSITE_ROOT,
  }))
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
      'site-footer': 'partials/site-footer',
    },
  }))
  .use(staticFiles({
    src: 'assets',
    dest: 'assets',
  }))
  .use(redirect(getRedirectionMap()))
  .use(absoluteUrl({
    resolve: WEBSITE_ROOT,
  }))
  .use(linkChecker({
    warn: true,
  }))
  .build(function(err) {
    if (err) {
      throw err;
    }
  });
