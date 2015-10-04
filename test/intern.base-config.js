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
        platform: 'node_modules/platform/platform',
      },
    },

    // https://theintern.github.io/intern/#option-reporters
    reporters: [
      'Runner',
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
      'test/unit/element.disabled.test',
      'test/unit/event.active-element.test',
      'test/unit/event.shadow-focus.test',
      'test/unit/fix.pointer-focus-children.test',
      'test/unit/fix.pointer-focus-input.test',
      'test/unit/fix.pointer-focus-parent.test',
      'test/unit/get.active-elements.test',
      'test/unit/get.ancestry-siblings.test',
      'test/unit/get.focus-target.test',
      'test/unit/get.parents.test',
      'test/unit/get.shadow-host-parents.test',
      'test/unit/get.shadow-host.test',
      'test/unit/is.disabled.test',
      'test/unit/is.focus-relevant.test',
      'test/unit/is.focusable.test',
      'test/unit/is.native-disabled-supported.test',
      'test/unit/is.only-tabbable.test',
      'test/unit/is.shadowed.test',
      'test/unit/is.tabbable.test',
      'test/unit/is.valid-area.test',
      'test/unit/is.valid-tabindex.test',
      'test/unit/is.visible.test',
      'test/unit/maintain.disabled.test',
      'test/unit/maintain.focus-trapped.test',
      'test/unit/observe.interaction-type.test',
      'test/unit/prototype.element.prototype.matches.test',
      'test/unit/prototype.svgelement.prototype.focus.test',
      'test/unit/prototype.window.customevent.test',
      'test/unit/query.first-tabbable.test',
      'test/unit/query.focusable.all.test',
      'test/unit/query.focusable.strict.test',
      'test/unit/query.focusable.test',
      'test/unit/query.tabbable.test',
      'test/unit/query.tabsequence.test',
      'test/unit/style.focus-within.test',
      'test/unit/style.focus-source.test',
      'test/unit/util.context-to-element.test',
      'test/unit/util.decorate-context.test',
      'test/unit/util.decorate-service.test',
      'test/unit/util.node-array.test',
      'test/unit/util.sort-elements-by-tabindex.test',
      'test/unit/util.tabindex-value.test',
      'test/unit/util.visible-area.test',
      'test/unit/when.focusable.test',
      'test/unit/when.visible-area.test',
    ],

    // Functional test suite(s) to run in each browser once non-functional tests are completed
    functionalSuites: [],
    // functionalSuites: [
    //   'test/functional/fix.pointer-focus-children.test.js',
    // ],

    // A regular expression matching URLs to files that should not be included in code coverage analysis
    excludeInstrumentation: /^(?:tests|test|examples|node_modules)\//,
  };
});
