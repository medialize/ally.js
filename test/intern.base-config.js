define([
  // 'intern',
], function(/*intern*/) {
  // see extending config example at
  // https://github.com/mozilla/fxa-content-server/blob/master/tests/intern.js
  // if we ever need to deal with arguments
  // var args = intern.args;

  return {
    // The port on which the instrumenting proxy will listen
    proxyPort: 9000,

    // A fully qualified URL to the Intern proxy
    proxyUrl: 'http://localhost:9000/',

    // Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
    // specified browser environments in the `environments` array below as well. See
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities for standard Selenium capabilities and
    // https://saucelabs.com/docs/additional-config#desired-capabilities for Sauce Labs capabilities.
    // Note that the `build` capability will be filled in with the current commit ID from the Travis CI environment
    // automatically
    capabilities: {
      // Firefox Dev on SauceLabs does not like the version
      // 'selenium-version': '2.41.0',
    },

    // Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
    // can be used here
    loaderOptions: {
      // Packages that should be registered with the loader in each testing environment
      packages: [ { name: 'ally', location: 'dist/amd/' } ],
      paths: {
        'array.prototype.findindex': 'node_modules/array.prototype.findindex/index',
        'css.escape': 'node_modules/css.escape/css.escape',
      },
    },

    // https://theintern.github.io/intern/#option-reporters
    reporters: [
      'Console',
      // see https://theintern.github.io/intern/#reporter-lcov
      {
        id: 'LcovHtml',
        directory: 'reports/coverage/',
        watermarks: {
          statements: [ 50, 80 ],
          lines: [ 50, 80 ],
          functions: [ 50, 80 ],
          branches: [ 50, 80 ],
        },
      },
      {
        id: 'Lcov',
        filename: 'reports/lcov.info',
        watermarks: {
          statements: [ 50, 80 ],
          lines: [ 50, 80 ],
          functions: [ 50, 80 ],
          branches: [ 50, 80 ],
        },
      },
      {
        id: 'JUnit',
        filename: 'reports/junit.xml',
      },
    ],

    // Non-functional test suite(s) to run in each browser
    suites: [
      'test/unit/event.active-element.test.js',
      'test/unit/event.shadow-focus.test.js',
      'test/unit/fix.pointer-focus-children.test.js',
      'test/unit/fix.pointer-focus-input.test.js',
      'test/unit/fix.pointer-focus-parent.test.js',
      'test/unit/focus.disable.test.js',
      'test/unit/focus.trap.test.js',
      'test/unit/get.active-elements.test.js',
      'test/unit/get.focus-target.test.js',
      'test/unit/get.parents.test.js',
      'test/unit/get.shadow-host-parents.test.js',
      'test/unit/get.shadow-host.test.js',
      'test/unit/is.disabled.test.js',
      'test/unit/is.focusable.test.js',
      'test/unit/is.shadowed.test.js',
      'test/unit/is.tabbable.test.js',
      'test/unit/is.valid-area.test.js',
      'test/unit/is.valid-tabindex.test.js',
      'test/unit/is.visible.test.js',
      'test/unit/observe.interaction-type.test.js',
      'test/unit/prototype.element.prototype.matches.test.js',
      'test/unit/prototype.svgelement.prototype.focus.test.js',
      'test/unit/prototype.window.customevent.test.js',
      'test/unit/query.first-tabbable.test.js',
      'test/unit/query.focusable.test.js',
      'test/unit/query.tabbable.test.js',
      'test/unit/query.tabsequence.test.js',
      'test/unit/style.focus-within.test.js',
      'test/unit/style.focus-source.test.js',
      'test/unit/util.context-to-element.test.js',
      'test/unit/util.decorate-context.test.js',
      'test/unit/util.decorate-singleton.test.js',
      'test/unit/util.node-array.test.js',
      'test/unit/util.sort-elements-by-tabindex.test.js',
      'test/unit/util.visible-area.test.js',
      'test/unit/when.focusable.test.js',
      'test/unit/when.visible-area.test.js',
    ],

    // Functional test suite(s) to run in each browser once non-functional tests are completed
    // functionalSuites: [
    //   'test/functional/fix.pointer-focus-children.test.js',
    // ],

    // A regular expression matching URLs to files that should not be included in code coverage analysis
    excludeInstrumentation: /^(?:tests|test|examples|node_modules)\//,
  };
});
