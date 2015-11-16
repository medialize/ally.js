---
layout: doc-page.html
---

# Test infrastructure

The tests are built on top of [The Intern](https://theintern.github.io/). See the [tutorial](https://github.com/theintern/intern-tutorial) and [some examples](https://github.com/theintern/intern-examples) to get started. Also see [Chai BDD](http://chaijs.com/api/bdd/) for asserting stuff and [leadfoot](http://theintern.github.io/leadfoot/) for interacting with browsers.

* **NOTE:** Unlike ally.js, the tests are not written in ES6, but follow Intern's ES5 and AMD scheme.

The test infrastructure is located in the `test` directory. Note that the `tests` directory is occupied by manual browser support tests.

Intern handles both unit and functional tests. Unit tests are the ones that verify a function's integrity without user interaction (like clicking on things or pressing keys). Functional tests are the ones that use [leadfoot](http://theintern.github.io/leadfoot/) to simulate a human being using the browser. Both types of tests are executed in the browser, there is no point testing things in Node.

For local development the command `npm run test` can be used to spawn an instance of ChromeDriver interfacing with Google Chrome and automatically executing the tests setup defined in `test/local.js`. To run tests against a whole battery of browsers in the cloud we use [BrowserStack](http://browserstack.com) and [SauceLabs](https://saucelabs.com). To run those locally, you'll need the secret access keys (which you'll only get if you're a core contributor, sorry). The results of all tests executed on SauceLab's infrastructure are [made public](https://saucelabs.com/u/allyjs).

Coverage reports are made available in the directory `reports/coverage`.

> TODO: The tests should be run automatically via [TravisCI](https://theintern.github.io/intern/#ci-travis)


## Locally running unit tests in the browser

You can run the unit tests in any browser by navigating to the following URL (replacing `${host}` and `${path}` accordingly):

```text
http://${hostname}>/${path}/ally.js/node_modules/intern/client.html?config=test/browser
```

(we're not using `test/sauce` or `test/local` in the browser because of the `reporters` those configurations load)


## Locally running all tests in the browser

Both unit and functional tests can be executed in Google Chrome locally via `npm run test` or `node test/run-local.js`. You could also [install and start ChromeDriver yourself](https://theintern.github.io/intern/#local-selenium) and then run `./node_modules/.bin/intern-runner config=test/local`. The `test/run-local.js` uses [dalek-driver-chrome](https://github.com/dalekjs/dalek-driver-chrome) to download, install and start ChromeDriver automatically.

```sh
# run all tests locally in Google Chrome
npm run test

# run all tests locally in Google Chrome (without npm)
node test/run-local.js

# run selected suites in Google Chrome
node test/run-local.js \
  suites=test/unit/selected-test \
  functionalSuites=tests/functional/selected-test
```


## Remotely running all tests in all browsers

You can register your own SauceLabs account (there is a [free tier](https://saucelabs.com/signup/plan/free)) and provide your own credentials if you don't have access to the project's account. The same is true for [BrowserStack](http://browserstack.com/).

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

When the tests executed, code coverage results can be uploaded to [Code Climate](http://codeclimate.com/) by running `npm run publish:lcov`.

* **NOTE:** The coverage measured by `npm run test` is (dramatically) lower than for `npm run test-ci`, because the former only runs in a single browser, and ally.js has code paths that only run in specific browsers.


## Analyzing bundle size

Before a release the structure of the UMD bundle should be analyzed to make sure we didn't accidentally blow it up. This is done using [source-map-explorer](https://github.com/danvk/source-map-explorer).

```sh
# run surce-map-explorer
npm run analyze:bundle
```

The report will be available in `reports/bundle-size.html`


## Functional test limitations

By way of LeadFoot and WebDriver, Intern allows us to script user actions. Such a user action could be *click on that element* or *press the <kbd>Tab</kbd> key*. While clicking on things generally works fine, sending keyboard commands does *not entirely* do what we expect (and need). While simulating the keypress of the <kbd>Tab</kbd> key will trigger the `keydown`, `keyup`, … event cascade, it will *not* make the browser advance focus to the next element. In other words, we can't test against browser behavior. For that reason we haven't created any functional tests up to now.
