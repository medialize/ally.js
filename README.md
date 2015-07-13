# ally.js - Accessibility Made Simpler

ally.js is a dependency-free (well, some shims, yes) **Library to help applications with accessibility concerns**. The intention is to separate these components from actual applications. It is being developed along side another project and features get added to ally.js once they become necessary in the other application - or someone sends a PR. The ultimate goal is to make adhering to [WAI-ARIA](http://www.w3.org/TR/wai-aria/) a breeze.

Do not confuse ally.js with [a11y.js](https://github.com/IBM-Watson/a11y.js), a library to help with ARIA states.

---

## Features

### Working With The DOM

* `dom/query-focusable`, `dom/is-focusable` - to obtain a list of focusable elements within a given DOM element
* `dom/query-tabbable`, `dom/is-tabbable` - to obtain a list of tabbable elements within a given DOM element
* `dom/query-tabsequence` - to obtain the exact order of tabbable elements within a given DOM element
* [`dom/active-elements`](http://medialize.github.io/ally.js/examples/active-elements.html) - to obtain the list of ShadowDOM host elements containing the actually focused element
* [`dom/visible-quotient`](http://medialize.github.io/ally.js/examples/visible-quotient.html) - to obtain how much of an element is currently visible on screen
* `dom/when-visible` - to execute a callback once an element is fully visible in the viewport

### Handling Interaction

* [`focus/disable-focus`](http://medialize.github.io/ally.js/examples/disable-focus.html) -- to render elements inert and remove them from the document's focus navigation sequence
* [`focus/trap`](http://medialize.github.io/ally.js/examples/trap-focus.html) -- to trap the *focus* within a given DOM element upon <kbd>Tab</kbd> ([ARIA Practices: Trapping Focus](http://www.w3.org/WAI/PF/aria-practices/#trap_focus_div)) - *deprecated!*, use [`focus/disable-focus`](http://medialize.github.io/ally.js/examples/disable-focus.html) instead!
* `focus/first` -- to identify the element that should receive focus upon entering a new context
* [`focus/within`](http://medialize.github.io/ally.js/examples/focus-within.html) -- to "polyfill" [`:focus-within`](http://dev.w3.org/csswg/selectors-4/#the-focus-within-pseudo)
* [`focus/when-visible`](http://medialize.github.io/ally.js/examples/focus-when-visible.html) -- to focus an element once is fully visible in the viewport
* [`focus/source`](http://medialize.github.io/ally.js/examples/focus-source.html) -- to allow styling of `:focus` dependent on user input (keyboard, pinter, script)

### Working Around Browser Bugs

* [`fix-browser/pointer-focus-parent`](http://medialize.github.io/ally.js/examples/fix-pointer-focus-parent.html) -- to work around a bug in [WebKit](https://bugs.webkit.org/show_bug.cgi?id=139945) where a parent `[tabindex="-1"]` element can get focus when clicking on a nested `<a>`
* [`fix-browser/pointer-focus-input`](http://medialize.github.io/ally.js/examples/fix-pointer-focus-input.html) -- to work around a behavior in Safari and Firefox on Mac OS X where clicking on certain form elements would not give them focus
* [`fix-browser/pointer-focus-children`](http://medialize.github.io/ally.js/examples/fix-pointer-focus-children.html) to work around a bug in IE10 and IE11 where children of `display:flex;` are made focusable when they shouldn't be

### Events

* `event/shadow-focus` -- dispatched when focus changes within the Shadow DOM

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


### RequireJS Example Configuration

```js
require.config({
  paths: {
    'ally': 'node_modules/ally.js/src',
    // shims required by ally.js
    'array.prototype.findindex': 'node_modules/array.prototype.findindex/index',
    'css.escape': 'node_modules/css.escape/css.escape',
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

## Resources

* [CONTRIBUTING.md](CONTRIBUTING.md) explaining how to author, test and build ally.js
* [CHANGELOG.md](CHANGELOG.md) detailing what changed over time

## License

ally.js is published under the [MIT License](http://opensource.org/licenses/mit-license).
