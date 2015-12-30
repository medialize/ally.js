
const metalsmith = require('metalsmith');
const remarkable = require('metalsmith-markdown-remarkable');
const paths = require('metalsmith-paths');
const packageJson = require('metalsmith-packagejson');
const registerHelpers = require('metalsmith-register-helpers');
const layouts = require('metalsmith-layouts');
const linkChecker = require('metalsmith-broken-link-checker');
const collections = require('metalsmith-collections');
const staticFiles = require('metalsmith-static');
const redirect = require('metalsmith-redirect');
const inPlace = require('metalsmith-in-place');

const manualSort = require('./plugins/collection.manual-sort');
const prepare = require('./plugins/prepare');
const injectExamples = require('./plugins/inject-examples');
const absoluteUrl = require('./plugins/absolute-url');

const WEBSITE_ROOT = '/medialize/ally.js/';
const WEBSITE_CANONICAL = 'http://allyjs.io/';

function getRedirectionMap() {
  // make sure legacy links are forwarded
  return {
    '/tests/focusable/table.html': WEBSITE_CANONICAL + 'data-tables/focusable.html',
    '/tests/static-results/focusable.html': WEBSITE_CANONICAL + 'data-tables/focusable.html',
    '/tests/static-results/scrolling-into-view.html': WEBSITE_CANONICAL + 'tests/scrolling/table.html',
    '/examples/active-elements.html': WEBSITE_CANONICAL + 'api/get/active-elements.html',
    '/examples/disable-focus.html': WEBSITE_CANONICAL + 'api/maintain/disabled.html',
    '/examples/fix-pointer-focus-children.html': WEBSITE_CANONICAL + 'api/fix/pointer-focus-children.html',
    '/examples/fix-pointer-focus-input.html': WEBSITE_CANONICAL + 'api/fix/pointer-focus-input.html',
    '/examples/fix-pointer-focus-parent.html': WEBSITE_CANONICAL + 'api/fix/pointer-focus-parent.html',
    '/examples/focus-source.html': WEBSITE_CANONICAL + 'api/style/focus-source.html',
    '/examples/focus-when-visible.html': WEBSITE_CANONICAL + 'api/when/focusable.html',
    '/examples/focus-within.html': WEBSITE_CANONICAL + 'api/style/focus-within.html',
    '/examples/index.html': WEBSITE_CANONICAL + 'api/index.html',
    '/examples/trap-focus.html': WEBSITE_CANONICAL + 'api/maintain/disabled.html',
    '/examples/visible-area.html': WEBSITE_CANONICAL + 'api/when/visible-area.html',
    '/data-tables/focusable.redirect.html': WEBSITE_CANONICAL + 'data-tables/focusable.html',
  };
}

function getPartialsMap() {
  return {
    'site-navigation': 'partials/site-navigation',
    'collection-navigation': 'partials/collection-navigation',
    'table-of-contents': 'partials/table-of-contents',
    'contribute-to-document': 'partials/contribute-to-document',
    'site-header': 'partials/site-header',
    'site-footer': 'partials/site-footer',
    tracking: 'partials/tracking',
  };
}

function getCollectionsMap() {
  return {
    Home: {
      pattern: 'index.html',
    },
    'Getting Started': {
      pattern: '{getting-started.html,what-is-focusable.html,concepts.html,questions.html}',
      sortBy: manualSort(['Getting started', 'General concepts', 'Frequently asked questions']),
    },
    API: {
      pattern: 'api/**/*.html',
      sortBy: manualSort(['API index', 'API concepts']),
    },
    Tutorials: {
      pattern: 'tutorials/**/*.html',
      sortBy: manualSort(['Tutorials']),
    },
    Contributing: {
      pattern: 'contributing/**/*.html',
      sortBy: manualSort(['Contributing']),
    },
    Examples: {
      pattern: '**/*.example*.html',
      //sortBy: manualSort(['Contributing']),
    },
  };
}

metalsmith(__dirname)
  .source('../../docs')
  .destination('../../web')
  .use(packageJson())
  .use(function(files) {
    Object.keys(files).forEach(function(path) {
      files[path].originalPath = path;
    });
  })
  .use(inPlace({
    directory: './',
    engine: 'handlebars',
  }))
  .use(remarkable({
    linkify: true,
    html: true,
  }))
  .use(absoluteUrl({
    property: 'websiteRoot',
    define: WEBSITE_ROOT,
  }))
  .use(prepare())
  .use(paths())
  .use(collections(getCollectionsMap()))
  .use(injectExamples())
  .use(registerHelpers({
    directory: 'helpers/',
  }))
  .use(layouts({
    directory: './',
    engine: 'handlebars',
    partials: getPartialsMap(),
  }))
  .use(staticFiles({
    src: 'assets',
    dest: 'assets',
  }))
  .use(redirect(getRedirectionMap()))
  .use(absoluteUrl({
    resolve: WEBSITE_ROOT,
    canonical: WEBSITE_CANONICAL,
  }))
  .use(linkChecker({
    warn: true,
  }))
  .build(function(err) {
    if (err) {
      throw err;
    }
  });
