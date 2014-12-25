# a11y.js

a11y.js (pronounced "ally js", pun intended) is a dependency-free library covering generic accessibility topics. The intention is to separate these components from actual applications. It is being developed along side another project and features get added to a11y.js once they become necessary in the other application - or someone sends a PR. The ultimate goal is to make adhering to [WAI-ARIA](http://www.w3.org/TR/wai-aria/) a breeze.


---


## Goals

* [x] simplify managing focus
* [ ] simplify WAI-ARIA keyboard interactions for defined ARIA roles
* [ ] simplify working with aria attributes
  * allow toggling states
  * simplify referencing things like `aria-describedby="…unique-id-required…"`
* [ ] simplify providing "help layer" explaining available keyboard commands


---


## Features

### Working With The DOM

* `dom/query-focusable`, `dom/is-focusable` - to obtain a list of focusable elements within a given DOM element
* `dom/query-tabbable`, `dom/is-tabbable` - to obtain a list of tabbable elements within a given DOM element

### Handling Interaction

* [`focus/trap`](http://medialize.github.io/a11y.js/examples/trap-focus.html) -- to trap the *focus* within a given DOM element upon <kbd>Tab</kbd> ([ARIA Practices: Trapping Focus](http://www.w3.org/WAI/PF/aria-practices/#trap_focus_div))

### Working Around Browser Bugs

* [`fix-browser/pointer-focus-parent`](http://medialize.github.io/a11y.js/examples/fix-pointer-focus-parent.html) -- to work around focus-click bug in [Blink](#todo-bug-link) and [WebKit](#todo-bug-link)


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
    'a11y': 'bower_components/a11y.js/src',
    // shims required by a11y.js
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

### master (will become 0.1.0) ###

* initial release "focus"


## License

a11y.js is published under the [MIT License](http://opensource.org/licenses/mit-license).
