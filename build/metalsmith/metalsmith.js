
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

const manualSort = require('./plugins/collection.manual-sort');
const prepare = require('./plugins/prepare');
const injectExamples = require('./plugins/inject-examples');
const absoluteUrl = require('./plugins/absolute-url');

const WEBSITE_ROOT = '/medialize/ally.js/';

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
    html: true,
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
      pattern: 'index.html',
    },
    'Getting Started': {
      pattern: '{getting-started.html,what-is-focusable.html}',
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
    Examples: {
      pattern: '**/*.example*.html',
      //sortBy: manualSort(['Contributing']),
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
  .use(injectExamples())
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
      'site-header': 'partials/site-header',
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
