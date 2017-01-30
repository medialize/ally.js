# ally.js - making accessibility simpler

---

[![NPM version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![MIT License][license-image]][license-url]
[![Travis CI][build-image]][build-url]
[![Code Climate][climate-image]][climate-url]
[![Test coverage][coverage-image]][coverage-url]

[![Dependencies][dependencies-image]][dependencies-url]
[![Dev-Dependencies][dev-dependencies-image]][dev-dependencies-url]

---

ally.js is a JavaScript library simplifying certain accessibility features, functions and behaviors. Its goal is to be **A JavaScript library to help web applications with accessibility concerns**. The intention is to separate these generic components from actual applications and other libraries.

[See the website for more](https://allyjs.io)

---

## Requirements

* [ES5](https://kangax.github.io/compat-table/es5/)
* [CSSOM CSS.escape](https://developer.mozilla.org/en-US/docs/Web/API/CSS.escape) ([spec](https://dev.w3.org/csswg/cssom/#the-css.escape%28%29-method))
* [Element.classList](https://developer.mozilla.org/en/docs/Web/API/Element/classList)


## Dependencies

* [platform.js](https://github.com/bestiejs/platform.js) (because parsing the userAgent string yourself is ludicrous)
* [ES5-shim](https://github.com/es-shims/es5-shim) (implicitly expected)
* [CSSOM CSS.escape polyfill](https://github.com/mathiasbynens/CSS.escape)


## Resources

* [Website](https://allyjs.io/)
* [Documentation](docs/README.md)
* [CONTRIBUTING.md](CONTRIBUTING.md) explaining how to author, test, document and build ally.js
* [CHANGELOG.md](CHANGELOG.md) detailing what changed over time
* [Filed issues (browsers & specifications)](issues.md)


## Supported by

* [BrowserStack](https://browserstack.com) and [SauceLabs](https://saucelabs.com/) provide VMs for automated testing - free for open source projects.
* [Code Climate](https://codeclimate.com/github/medialize/ally.js) and [Coveralls](https://coveralls.io/github/medialize/ally.js/) provide us with automated code analysis and coverage reports - free for open source projects.
* [Travis CI](https://travis-ci.org/medialize/ally.js) provides a build server - free for open source projects.
* [Algolia](https://algolia.com/) provides a search interface - free for open source projects.


## License

ally.js is published under the [MIT License](https://opensource.org/licenses/mit-license).


[npm-image]: https://img.shields.io/npm/v/ally.js.svg
[npm-url]: https://www.npmjs.com/package/ally.js
[downloads-image]: https://img.shields.io/npm/dm/ally.js.svg
[downloads-url]: https://www.npmjs.com/package/ally.js
[license-image]: https://img.shields.io/npm/l/ally.js.svg
[license-url]: https://github.com/medialize/ally.js/blob/master/LICENSE.txt
[build-image]: https://img.shields.io/travis/medialize/ally.js/master.svg
[build-url]: https://travis-ci.org/medialize/ally.js
[climate-image]: https://img.shields.io/codeclimate/github/medialize/ally.js.svg
[climate-url]: https://codeclimate.com/github/medialize/ally.js
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/medialize/ally.js.svg
[coverage-url]: https://codeclimate.com/github/medialize/ally.js/coverage
[dependencies-image]: https://img.shields.io/david/medialize/ally.js.svg
[dependencies-url]: https://www.npmjs.com/package/ally.js
[dev-dependencies-image]: https://img.shields.io/david/dev/medialize/ally.js.svg
[dev-dependencies-url]: https://www.npmjs.com/package/ally.js
