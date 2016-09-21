---
layout: doc-page.html
---

# Test infrastructure

The tests are built on top of [The Intern](https://theintern.github.io/). See the [tutorial](https://github.com/theintern/intern-tutorial) and [some examples](https://github.com/theintern/intern-examples) to get started. Also see [Chai BDD](http://chaijs.com/api/bdd/) for asserting stuff and [leadfoot](https://theintern.github.io/leadfoot/) for interacting with browsers.

:::note
Unlike ally.js, the tests are not written in ES6, but follow Intern's ES5 and AMD scheme.
:::

The test infrastructure is located in the `test` directory. Note that the `tests` directory is occupied by manual browser support tests.

Intern handles both unit and functional tests. Unit tests are the ones that verify a function's integrity without user interaction (like clicking on things or pressing keys). Functional tests are the ones that use [leadfoot](https://theintern.github.io/leadfoot/) to simulate a human being using the browser. Both types of tests are executed in the browser, there is no point testing things in Node.

For local development the command `npm run test` can be used to run tests in local Google Chrome. To run tests against a whole battery of browsers in the cloud we use [BrowserStack](https://browserstack.com) and [SauceLabs](https://saucelabs.com). To run those locally, you'll need the secret access keys (which you'll only get if you're a core contributor, sorry).

Coverage reports are made available in the directory `reports/coverage`.

Tests are run by [TravisCI](https://travis-ci.org/medialize/ally.js) on every push and every pull request.


## Locally running unit tests in the browser

You can run the unit tests in any browser by starting the server using `npm run test:server` and navigating to the following URL:

```text
http://localhost:9000/node_modules/intern/client.html?config=test/browser
```

:::note
The tests run off `dist/amd` and require the `reports` directory to exist. Before running running the tests, you need to have run `npm run clean` and `npm run build:amd` at least once.
:::


## Locally running all tests in the browser

Both unit and functional tests can be executed in Google Chrome locally via `npm run test`. This requires Java, as the [SeleniumTunnel](https://theintern.github.io/digdug/module-digdug_SeleniumTunnel.html) simply spawns a [Selenium Standalone Server](http://www.seleniumhq.org/download/).

```sh
# run all tests locally in Google Chrome
npm run test
```

:::note
The tests run off `dist/amd` and require the `reports` directory to exist. Before running running the tests, you need to have run `npm run clean` and `npm run build:amd` at least once.
:::


## Remotely running all tests in all browsers

You can register your own SauceLabs account (there is a [free tier](https://saucelabs.com/signup/plan/free)) and provide your own credentials if you don't have access to the project's account. The same is true for [BrowserStack](https://browserstack.com/).

### Running tests on BrowserStack

```sh
# make BrowserStack credentials available to Intern
# obtainable at https://www.browserstack.com/accounts/automate
export BROWSERSTACK_USERNAME=rodneyrehm1
export BROWSERSTACK_ACCESS_KEY=nope

# run all tests
npm run test:browserstack

# run all tests (without npm)
./node_modules/.bin/intern-runner \
  config=test/browserstack

# run selected suites
./node_modules/.bin/intern-runner \
  config=test/browserstack \
  suites=test/unit/selected-test \
  functionalSuites=tests/functional/selected-test
```

### Running tests on SauceLaubs

```sh
# make SauceLabs credentials available to Intern
# obtainable at https://saucelabs.com/account
export SAUCE_USERNAME=allyjs
export SAUCE_ACCESS_KEY=nope

# run all tests
npm run test:sauce

# run all tests (without npm)
./node_modules/.bin/intern-runner \
  config=test/sauce

# run selected suites
./node_modules/.bin/intern-runner \
  config=test/sauce \
  suites=test/unit/selected-test \
  functionalSuites=tests/functional/selected-test
```

## Reports

After running the automated tests, the `reports` directory will contain several files:

```text
reports
├── coverage
│   ├── …
│   └── index.html  - test coverage in human readable format
├── junit.xml       - test status non-human readable format
└── lcov.info       - test coverage non-human readable format
```

When the tests executed, code coverage results can be uploaded to [Code Climate](https://codeclimate.com/) and [Coveralls](https://coveralls.io/) by running `npm run publish:lcov`.

:::note
The coverage measured by `npm run test` is (dramatically) lower than for `npm run test-ci`, because the former only runs in a single browser, and ally.js has code paths that only run in specific browsers.
:::


## Analyzing bundle size

Before a release the structure of the UMD bundle should be analyzed to make sure we didn't accidentally blow it up. Since [rollupify](https://github.com/nolanlawson/rollupify/) reduces all ES6 code to a single bundle, bundles need to be analyzed on a bundle that was built *without* rollupify.
The interactive bundle size report is generated by [source-map-explorer](https://github.com/danvk/source-map-explorer).

```sh
# run surce-map-explorer
npm run analyze:bundle
```

The report will be available in `reports/bundle-size.html`.

