# ally.js - making accessibility simpler

---

[![NPM version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![MIT License][license-image]][license-url]
[![Code Climate][climate-image]][climate-url]
[![Test coverage][coverage-image]][coverage-url]

[![Dependencies][dependencies-image]][dependencies-url]
[![Dev-Dependencies][dev-dependencies-image]][dev-dependencies-url]

---

ally.js is a JavaScript library simplifying certain accessibility features, functions and behaviors. Its goal is to be **A JavaScript library to help web applications with accessibility concerns**. The intention is to separate these generic components from actual applications and other libraries.

For the time being ally.js is developed along side my actual work projects and features get added to ally.js once they become necessary to them. Of course you're welcome to contribute whatever and however you can. I don't bite, promise. See [GOALS.md](GOALS.md) to learn what I want this project to become.

Do not confuse ally.js with [a11y.js](https://github.com/IBM-Watson/a11y.js), a library to help with ARIA states. Or [allyjs.com](http://www.allyjs.com/), a Flux and React demo.

---


## What is ally.js?

ally.js is a JavaScript library simplifying certain accessibility features, functions and behaviors. However, simply loading ally.js will not automagically make a web application accessible. The library provides certain standard functions the "web platform" should've provided itself, so JavaScript applications can be made accessible more easily.

---

In its UMD build ally.js weighs about 20KB minified and gzipped, with all external dependencies already bundled. In modern browsers only one external dependency is required, alongside 2 shims/polyfills for the *slightly* older browers. It has been tested on IE10+, Android 4.4+ and iOS8+ along Firefox, Chrome and Safari.


## Which problems does ally.js solve?

ally.js 1.0.0 is primarily concerned with focus navigation:

* Identify and absorb browser differences regarding which elements are considered focusable
* Query the DOM for all focusable or tabbable (keyboard focusable) elements
* Trap focus navigation in a DOM sub-tree
* Make DOM sub-trees inert (i.e. disable all element's from being focused or interacted with)
* Identify focused elements and focus changes within Shadow DOM
* Provide `:focus-within` (CSS Selectors Level 4) Polyfill
* Determine how focus changed (keyboard, mouse, script) to apply different focus outline styles
* Determine when an element is focusable and visible in the viewport to prevent browsers from scrolling the element into view upon focus

Have a look at the [API documentation](docs/api/README.md).

---

## Requirements

* [ES5](http://kangax.github.io/compat-table/es5/)
* [ES6 Array.prototype.findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
* [CSSOM CSS.escape](https://developer.mozilla.org/en-US/docs/Web/API/CSS.escape) ([spec](http://dev.w3.org/csswg/cssom/#the-css.escape%28%29-method))


## Dependencies

* [platform.js](https://github.com/bestiejs/platform.js) (because parsing the userAgent string yourself is ludicrous)
* [ES5-shim](https://github.com/es-shims/es5-shim) (implicitly expected)
* [ES6-shim Array.prototype.findIndex](https://github.com/paulmillr/Array.prototype.findIndex) (or complete [ES6-shim](https://github.com/paulmillr/es6-shim))
* [CSSOM CSS.escape polyfill](https://github.com/mathiasbynens/CSS.escape)


## Resources

* [Website](http://allyjs.io/)
* [Documentation](docs/README.md)
* [CONTRIBUTING.md](CONTRIBUTING.md) explaining how to author, test, document and build ally.js
* [CHANGELOG.md](CHANGELOG.md) detailing what changed over time
* [Filed issues (browsers & specifications)](issues.md)


## Supported by

* [BrowserStack](http://browserstack.com) and [SauceLabs](http://saucelabs.com/) provide VMs for automated testing - free for open source projects.
* [Code Climate](https://codeclimate.com/oss) provides us with automated code analysis - free for open source projects.
* [Travis CI](https://travis-ci.org/medialize/ally.js) provides a build server - free for open source projects.


## License

ally.js is published under the [MIT License](http://opensource.org/licenses/mit-license).


[npm-image]: https://img.shields.io/npm/v/ally.js.svg
[npm-url]: https://www.npmjs.com/package/ally.js
[downloads-image]: http://img.shields.io/npm/dm/ally.js.svg
[downloads-url]: https://www.npmjs.com/package/ally.js
[license-image]: https://img.shields.io/npm/l/ally.js.svg
[license-url]: https://github.com/medialize/ally.js/blob/master/LICENSE.txt
[climate-image]: https://img.shields.io/codeclimate/github/medialize/ally.js.svg
[climate-url]: https://codeclimate.com/github/medialize/ally.js
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/medialize/ally.js.svg
[coverage-url]: https://codeclimate.com/github/medialize/ally.js/coverage
[dependencies-image]: https://img.shields.io/david/medialize/ally.js.svg
[dependencies-url]: https://www.npmjs.com/package/ally.js
[dev-dependencies-image]: https://img.shields.io/david/dev/medialize/ally.js.svg
[dev-dependencies-url]: https://www.npmjs.com/package/ally.js
