# ally.js Change Log

## master (becoming 1.0.0) ##

* moving dependencies from bower to npm
* moving source from AMD to ES6 Module Syntax
* adding ES6 build infrastructure - [issue #1](https://github.com/medialize/ally.js/issues/1)
* adding unit tests - [issue #2](https://github.com/medialize/ally.js/issues/2)
* adding `query/first-tabbable` (replacing `focus/first`) to find the first keyboard focusable element in a sub-tree
* unifying API of all functions, see the [API docs](docs/api/)
* adding `strategy: 'strict'` option to `query/focusable` to find elements by filters unavailable to `querySelectorAll()` - i.e. Shadow DOM without the "Shadow Piercing Descendant Combinator", scrollable containers, `-webkit-user-modify: read-write` - [issue #17](https://github.com/medialize/ally.js/issues/17), [issue #21](https://github.com/medialize/ally.js/issues/21)
* refactoring `is/focusable` to also identify "edge-cases" - [issue #17](https://github.com/medialize/ally.js/issues/17), [issue #20](https://github.com/medialize/ally.js/issues/20), [issue #21](https://github.com/medialize/ally.js/issues/21)
* adding `is/focus-relevant` to identify technically focusable elements (refactored from `is/focusable`)
* adding `is/only-tabbable` to identify elements that cannot be focused by script, but by keyboard
* removing "dimension check" from `is/visible` - [issue #14](https://github.com/medialize/ally.js/issues/14)
* `query/focusable` no longer considers `<html>` and `<body>` focusable - [issue #31](https://github.com/medialize/ally.js/issues/31)
* adding `element/disabled` (refactored from `focus/disabled`) - [issue #33](https://github.com/medialize/ally.js/issues/33)

### Breaking Changes

* `src/` was ES5 and AMD, it is now ES6 - AMD components are now available at `dist/amd/`
* dropping `focus/first` in favor of `query/first-tabbable`
* `dom/is-valid-area` now returns `false` for elements that are not `<area>`
* `dom/is-valid-tabindex` now returns `false` for elements without `tabindex` attribute
* see the [API docs](docs/api/README.md) for the new function signatures
* renaming files in `src`:
  * `dom/active-elements.js` to `get/active-elements.js`
  * `dom/focus-target.js` to `get/focus-target.js`
  * `dom/is-disabled.js` to `is/disabled.js`
  * `dom/is-focusable.js` to `is/focusable.js`
  * `dom/is-shadowed.js` to `is/shadowed.js`
  * `dom/is-tabbable.js` to `is/tabbable.js`
  * `dom/is-valid-area.js` to `is/valid-area.js`
  * `dom/is-valid-tabindex.js` to `is/valid-tabindex.js`
  * `dom/is-visible.js` to `is/visible.js`
  * `dom/node-array.js` to `util/node-array.js`
  * `dom/path.js` to `get/parents.js`
  * `dom/query-focusable.js` to `query/focusable.js`
  * `dom/query-tabbable.js` to `query/tabbable.js`
  * `dom/query-tabsequence.js` to `query/tabsequence.js`
  * `dom/shadow-host-ancestors.js` to `get/shadow-host-parents.js`
  * `dom/when-visible.js` to `when/visible-area.js`
  * `dom/shadow-host.js` to `get/shadow-host.js`
  * `dom/sort-tabindex.js` to `util/sort-elements-by-tabindex.js`
  * `dom/visible-quotient.js` to `util/visible-area.js`
  * `event/interaction-type-listener.js` to `observe/interaction-type.js`
  * `focus/source.js` to `style/focus-source.js`
  * `focus/when-visible.js` to `when/focusable.js`
  * `focus/within.js` to `style/focus-within.js`
  * `focus/disable-focus` to `maintain/disabled`
  * `focus/trap` to `maintain/focus-trapped`


## 0.0.7 (July 8th 2015) ##

* adding `event/shadow-focus` to emit custom event when focus changes within the Shadow DOM - extracted from `focus/within`
* adding `event/interaction-type-listener` to track user input to differentiate keyboard and pointer input
* adding [`focus/source`](http://medialize.github.io/ally.js/examples/focus-source.html) to allow styling of `:focus` dependent on user input (keyboard, pinter, script)
* adding [`focus/disable-focus`](http://medialize.github.io/ally.js/examples/disable-focus.html) to render elements inert and remove them from the document's focus navigation sequence
* deprecating [`focus/trap`](http://medialize.github.io/ally.js/examples/trap-focus.html), use [`focus/disable-focus`](http://medialize.github.io/ally.js/examples/disable-focus.html) instead


## 0.0.6 (June 17th 2015) ##

* fixing [`dom/visible-quotient`](http://medialize.github.io/ally.js/examples/visible-quotient.html) to subtract scrollbars from visible space


## 0.0.5 (June 15th 2015) ##

* adding [`dom/when-visible`](http://medialize.github.io/ally.js/examples/focus-when-visible.html) to execute callback when an element becomes visible
* improving [`dom/when-visible`](http://medialize.github.io/ally.js/examples/focus-when-visible.html) to also wait until an element becomes focusable


## 0.0.4 (February 3rd 2015) ##

* adding [`dom/visible-quotient`](http://medialize.github.io/ally.js/examples/visible-quotient.html)
* adding [`focus/when-visible`](http://medialize.github.io/ally.js/examples/focus-when-visible.html)
* fixing [`fix-browser/pointer-focus-children`](http://medialize.github.io/ally.js/examples/fix-pointer-focus-children.html) to temporarily disable transitions


## 0.0.3 (January 7th 2015) ##

* adding [`fix-browser/pointer-focus-children`](http://medialize.github.io/ally.js/examples/fix-pointer-focus-children.html)
* adding `dom/focus-target` to find the first focusable element in an element's ancestry
* improving [`fix-browser/pointer-focus-parent`](http://medialize.github.io/ally.js/examples/fix-pointer-focus-parent.html) for less complexity
* improving `fix-browser` by only engaging handlers for affected browsers (yes, *user agent sniffing*, deal with it)
* fixing `dom/is-visible` to look at computed styles, not the element's styles (duh!)


## 0.0.2 (January 5th 2015) ##

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
* fixing `prototype/svgelement.prototype.focus` to also cover `SVGElement.prototype.blur`
* fixing linting errors


## 0.0.1 (December 25th 2014) ##

* initial release "focus"
