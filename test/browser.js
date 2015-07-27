// Learn more about configuring this file at <https://github.com/theintern/intern/wiki/Configuring-Intern>.
// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites.
define({
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
    'selenium-version': '2.41.0',
  },

  // Browsers to run integration testing against. Note that version numbers must be strings if used with Sauce
  // OnDemand. Options that will be permutated are browserName, version, platform, and platformVersion; any other
  // capabilities options specified for an environment will be copied as-is
  // see https://saucelabs.com/platforms/ for a list of supported platforms
  environments: [
    { browserName: 'internet explorer', version: '11', platform: 'Windows 8.1' },
    { browserName: 'internet explorer', version: '10', platform: 'Windows 8' },
    //{ browserName: 'internet explorer', version: '9', platform: 'Windows 7' },
    { browserName: 'firefox', version: '39', platform: [ 'OS X 10.10', 'Windows 8.1', 'Linux' ] },
    { browserName: 'firefox', version: 'dev', platform: [ 'OS X 10.10', 'Windows 8.1', 'Linux' ] },
    { browserName: 'chrome', version: '43', platform: [ 'OS X 10.10', 'Windows 8.1', 'Linux' ] },
    { browserName: 'chrome', version: 'dev', platform: [ 'OS X 10.10', 'Windows 8.1', 'Linux' ] },
    { browserName: 'safari', version: '6', platform: 'OS X 10.8' },
    { browserName: 'safari', version: '7', platform: 'OS X 10.9' },
    { browserName: 'safari', version: '8', platform: 'OS X 10.10' },
  ],

  // Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
  maxConcurrency: 5,

  // Name of the tunnel class to use for WebDriver tests
  tunnel: 'SauceLabsTunnel',

  // The desired AMD loader to use when running unit tests (client.html/client.js). Omit to use the default Dojo
  // loader
  useLoader: {
    'host-node': 'dojo/dojo',
    'host-browser': 'node_modules/dojo/dojo.js',
  },

  // Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
  // can be used here
  loader: {
    // Packages that should be registered with the loader in each testing environment
    packages: [ { name: 'ally', location: 'dist/amd/' } ],
    paths: {
      'array.prototype.findindex': 'node_modules/array.prototype.findindex/index',
      'css.escape': 'node_modules/css.escape/css.escape',
    },
  },

  // Non-functional test suite(s) to run in each browser
  suites: [
    'test/unit/get.active-elements.test.js',
    'test/unit/get.focus-target.test.js',
    'test/unit/get.parents.test.js',
    'test/unit/get.shadow-host-parents.test.js',
    'test/unit/get.shadow-host.test.js',
    'test/unit/is.disabled.test.js',
    'test/unit/is.focusable.test.js',
    'test/unit/is.shadowed.test.js',
    'test/unit/is.tabbable.test.js',
    'test/unit/util.context-to-element.test.js',
    'test/unit/util.decorate-context.test.js',
    'test/unit/util.decorate-singleton.test.js',
    'test/unit/util.node-array.test.js',
    'test/unit/util.sort-elements-by-tabindex.test.js',
  ],

  // Functional test suite(s) to run in each browser once non-functional tests are completed
  functionalSuites: [
    'test/functional/tutorial.js',
  ],

  // A regular expression matching URLs to files that should not be included in code coverage analysis
  excludeInstrumentation: /^(?:tests|test|examples|node_modules)\//,
});
