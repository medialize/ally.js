# ally.js

[![Join the chat at https://gitter.im/medialize/ally.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/medialize/ally.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

---

**NOTE:** We're hard at work on version 1.0.0 in the [master](https://github.com/medialize/ally.js/tree/master/) branch.

---

ally.js is a dependency-free (well, some shims, yes) **Library to help applications with accessibility concerns**. The intention is to separate these components from actual applications. It is being developed along side another project and features get added to ally.js once they become necessary in the other application - or someone sends a PR. The ultimate goal is to make adhering to [WAI-ARIA](http://www.w3.org/TR/wai-aria/) a breeze.

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
* `dom/query-tabsequence` - to obtain the exact order of tabbable elements within a given DOM element
* [`dom/active-elements`](http://medialize.github.io/ally.js/examples/active-elements.html) - to obtain the list of ShadowDOM host elements containing the actually focused element
* [`dom/visible-quotient`](http://medialize.github.io/ally.js/examples/visible-quotient.html) - to obtain how much of an element is currently visible on screen
* `dom/when-visible` - to execute a callback once an element is fully visible in the viewport

### Handling Interaction

* [`focus/disable-focus`](http://medialize.github.io/ally.js/examples/disable-focus.html) -- to render elements insert and remove them from the document's focus navigation sequence
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

### 0.0.7 (July 8th 2015) ###

* adding `event/shadow-focus` to emit custom event when focus changes within the Shadow DOM - extracted from `focus/within`
* adding `event/interaction-type-listener` to track user input to differentiate keyboard and pointer input
* adding [`focus/source`](http://medialize.github.io/ally.js/examples/focus-source.html) to allow styling of `:focus` dependent on user input (keyboard, pinter, script)
* adding [`focus/disable-focus`](http://medialize.github.io/ally.js/examples/disable-focus.html) to render elements inert and remove them from the document's focus navigation sequence
* deprecating [`focus/trap`](http://medialize.github.io/ally.js/examples/trap-focus.html), use [`focus/disable-focus`](http://medialize.github.io/ally.js/examples/disable-focus.html) instead


### 0.0.6 (June 17th 2015) ###

* fixing [`dom/visible-quotient`](http://medialize.github.io/ally.js/examples/visible-quotient.html) to subtract scrollbars from visible space


### 0.0.5 (June 15th 2015) ###

* adding [`dom/when-visible`](http://medialize.github.io/ally.js/examples/focus-when-visible.html) to execute callback when an element becomes visible
* improving [`dom/when-visible`](http://medialize.github.io/ally.js/examples/focus-when-visible.html) to also wait until an element becomes focusable


### 0.0.4 (February 3rd 2015) ###

* adding [`dom/visible-quotient`](http://medialize.github.io/ally.js/examples/visible-quotient.html)
* adding [`focus/when-visible`](http://medialize.github.io/ally.js/examples/focus-when-visible.html)
* fixing [`fix-browser/pointer-focus-children`](http://medialize.github.io/ally.js/examples/fix-pointer-focus-children.html) to temporarily disable transitions


### 0.0.3 (January 7th 2015) ###

* adding [`fix-browser/pointer-focus-children`](http://medialize.github.io/ally.js/examples/fix-pointer-focus-children.html)
* adding `dom/focus-target` to find the first focusable element in an element's ancestry
* improving [`fix-browser/pointer-focus-parent`](http://medialize.github.io/ally.js/examples/fix-pointer-focus-parent.html) for less complexity
* improving `fix-browser` by only engaging handlers for affected browsers (yes, *user agent sniffing*, deal with it)
* fixing `dom/is-visible` to look at computed styles, not the element's styles (duh!)


### 0.0.2 (January 5th 2015) ###

* adding [`fix-browser/pointer-focus-input`](http://medialize.github.io/ally.js/examples/fix-pointer-focus-input.html)
* adding [`dom/active-elements`](http://medialize.github.io/ally.js/examples/active-elements.html) to identify the actually focsued element and its host elements in ShadowDOM
* adding [`focus/within`](http://medialize.github.io/ally.js/examples/focus-within.html) to "polyfill" [`:focus-within`](http://dev.w3.org/csswg/selectors-4/#the-focus-within-pseudo)
* adding warning to browser support detection when document does not have focus
* adding `supports/supports-cache` to store browser compatibility data
* adding `focus/first` to identify and focus the first `[autofocus]` or non positive tabindex (`[tabindex=1]`) element
* adding `dom/query-domsequence` to separate sorting and mutating the list from `dom/query-tabbable`
* improving [`fix-browser/pointer-focus-parent`](http://medialize.github.io/ally.js/examples/fix-pointer-focus-parent.html) for fewer DOM interactions and less code
* improving [`focus/trap`](http://medialize.github.io/ally.js/examples/trap-focus.html) to allow nothing being focus and re-acquire focus when required
* improving `selector/focusable` (thus `dom/query-focusable`) by also finding focusable shadowed elements (via `>>>` or `/deep/`, ShadowDOM) - [#11](https://github.com/medialize/ally.js/issues/11)
* fixing `event/active-element` to be dispatched on `document` rather than `document.body`
* fixing `prototype/svgelement.prototoype.focus` to also cover `SVGElement.prototype.blur`
* fixing linting errors


### 0.0.1 (December 25th 2014) ###

* initial release "focus"


## License

ally.js is published under the [MIT License](http://opensource.org/licenses/mit-license).
