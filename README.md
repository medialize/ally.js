# ally.js

ally.js is a dependency-free **Library to help applications with accessibility concerns**. The intention is to separate these components from actual applications. It is being developed along side another project and features get added to ally.js once they become necessary in the other application - or someone sends a PR. The ultimate goal is to make adhering to [WAI-ARIA](http://www.w3.org/TR/wai-aria/) a breeze.

Do not confuse ally.js with [a11y.js](https://github.com/IBM-Watson/a11y.js), a library to help with ARIA states.


---


## Goals

* [x] simplify managing focus
* [ ] simplify WAI-ARIA keyboard interactions for defined ARIA roles
* [ ] simplify working with aria attributes (only if [a11y.js](https://github.com/IBM-Watson/a11y.js) doesn't cover all of this already)
  * allow toggling states
  * simplify referencing things like `aria-describedby="…unique-id-required…"`
* [ ] simplify providing "help layer" explaining available keyboard commands


---


## Features

### Working With The DOM

* `dom/query-focusable`, `dom/is-focusable` - to obtain a list of focusable elements within a given DOM element
* `dom/query-tabbable`, `dom/is-tabbable` - to obtain a list of tabbable elements within a given DOM element

### Handling Interaction

* [`focus/trap`](http://medialize.github.io/ally.js/examples/trap-focus.html) -- to trap the *focus* within a given DOM element upon <kbd>Tab</kbd> ([ARIA Practices: Trapping Focus](http://www.w3.org/WAI/PF/aria-practices/#trap_focus_div))

### Working Around Browser Bugs

* [`fix-browser/pointer-focus-parent`](http://medialize.github.io/ally.js/examples/fix-pointer-focus-parent.html) -- to work around a bug in [WebKit](https://bugs.webkit.org/show_bug.cgi?id=139945) where a parent `[tabindex="-1"]` element can get focus when clicking on a nested `<a>`
* [`fix-browser/pointer-focus-input`](http://medialize.github.io/ally.js/examples/fix-pointer-focus-input.html) -- to work around a behavior in Safari and Firefox on Mac OS X where clicking on certain form elements would not give them focus


### Development / Debugging

* `event/active-element` -- to dispatch `active-element` event to `html` element regardless of `focus` event


---


## Requirements

* [ES5](http://kangax.github.io/compat-table/es5/)
* [ES6 Array.prototype.findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
* [CSSOM CSS.escape](https://developer.mozilla.org/en-US/docs/Web/API/CSS.escape) ([spec](http://dev.w3.org/csswg/cssom/#the-css.escape%28%29-method))


## Dependencies

* [ES5-shim](https://github.com/es-shims/es5-shim) (implicitly expected)
* [ES6-shim Array.prototype.findIndex](https://github.com/paulmillr/Array.prototype.findIndex) (or complete [ES6-shim](https://github.com/paulmillr/es6-shim))
* [CSSOM CSS.escape polyfill](https://github.com/mathiasbynens/CSS.escape)


## RequireJS Config

```js
require.config({
  paths: {
    'ally': 'bower_components/ally.js/src',
    // shims required by ally.js
    'array.prototype.findindex': 'bower_components/array.prototype.findindex/index',
    'CSS.escape': 'bower_components/CSS.escape/css.escape',
  },

  // alias array.prototype.findindex to es6-shim
  // only if you're using es6-shim instead of selected bundles
  // see http://requirejs.org/docs/api.html#config-map
  map: {
    '*': {
      'array.prototype.findindex': 'es6-shim',
    }
  },
});
```


---


## Changelog

### master (will become 0.0.2) ###

* improving [`fix-browser/pointer-focus-parent`](http://medialize.github.io/ally.js/examples/fix-pointer-focus-parent.html) for fewer DOM interactions and less code
* adding [`fix-browser/pointer-focus-input`](http://medialize.github.io/ally.js/examples/fix-pointer-focus-input.html)
* adding warning to browser support detection when document does not have focus
* improving [`focus/trap`](http://medialize.github.io/ally.js/examples/trap-focus.html) to allow nothing being focus and re-acquire focus when required
* fixing `event/active-element` to be dispatched on `document` rather than `document.body`
* adding `supports/supports-cache` to store browser compatibility data
* fixing linting errors


### 0.0.1 (December 25th 2014) ###

* initial release "focus"


## License

ally.js is published under the [MIT License](http://opensource.org/licenses/mit-license).
