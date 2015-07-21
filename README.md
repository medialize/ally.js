# ally.js - Accessibility Made Simpler

---

[![Join the chat at https://gitter.im/medialize/ally.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/medialize/ally.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

---

ally.js is a JavaScript library simplifying certain accessibility features, functions and behaviors. Its goal is to be **A library to help applications with accessibility concerns**. The intention is to separate these generic components from actual applications and other libraries.

For the time being ally.js is developed along side my actual work projects and features get added to ally.js once they become necessary to them. Of course you're welcome to contribute whatever and however you can. I don't bite, promise. See [GOALS.md](GOALS.md) to learn what I want this project to become.

Do not confuse ally.js with [a11y.js](https://github.com/IBM-Watson/a11y.js), a library to help with ARIA states.

---


## What Is ally.js?

ally.js is a JavaScript library simplifying certain accessibility features, functions and behaviors. However, simply loading ally.js will not automagically make a web application accessible. The library provides certain standard functions the "web platform" should've provided itself, so JavaScript applications be made accessible more easily.


## Which Problems Does ally.js Solve?

ally.js 1.0.0 is primarily concerned with focus navigation:

* Identify and absorb browser differences regarding which elements are considered focusable
* Query the DOM for all focusable or tabbable (keyboard focusable) elements
* Trap focus navigation in a DOM sub-tree
* Make DOM sub-trees inert (i.e. disable all element's from being focused or interacted with)
* Identify focused elements and focus changes within Shadow DOM
* Provide `:focus-within` (CSS Selectors Level 4) Polyfill
* Determine how focus changed (keyboard, mouse, script) to apply different focus outline styles
* Determine when an element is focusable and visible in the viewport to prevent browsers from scrolling the element into view upon focus

Have a look at the [API Documentation](docs/api/README.md).

---


## Requirements

* [ES5](http://kangax.github.io/compat-table/es5/)
* [ES6 Array.prototype.findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
* [CSSOM CSS.escape](https://developer.mozilla.org/en-US/docs/Web/API/CSS.escape) ([spec](http://dev.w3.org/csswg/cssom/#the-css.escape%28%29-method))


## Dependencies

* [ES5-shim](https://github.com/es-shims/es5-shim) (implicitly expected)
* [ES6-shim Array.prototype.findIndex](https://github.com/paulmillr/Array.prototype.findIndex) (or complete [ES6-shim](https://github.com/paulmillr/es6-shim))
* [CSSOM CSS.escape polyfill](https://github.com/mathiasbynens/CSS.escape)


## Resources

* [Website](http://medialize.github.io/ally.js/)
* [Documentation](docs/README.md)
* [CONTRIBUTING.md](CONTRIBUTING.md) explaining how to author, test, document and build ally.js
* [CHANGELOG.md](CHANGELOG.md) detailing what changed over time


## License

ally.js is published under the [MIT License](http://opensource.org/licenses/mit-license).
