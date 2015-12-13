# ally.js change log

## master

**will eventually released as 1.1.0** - see [milestone](https://github.com/medialize/ally.js/milestones/1.1.0%20-%20second%20wave)

### Changes

The following lists show the changes to the library grouped by domain.

#### Browsers

* Adding full support for Internet Explorer 9 - [issue #71](https://github.com/medialize/ally.js/issues/71)
* Dropping manual focusable tests for Safari on iOS 8, keeping Safari on iOS 9
* Dropping manual focusable tests for Mobile Chrome on Android 4.4, keeping Mobile Chrome on Android 5.1

#### Dependencies

* upgrading to [css.escape](https://github.com/mathiasbynens/CSS.escape) v1.3.0 to work around [WebKit 149175](https://bugs.webkit.org/show_bug.cgi?id=149175)
* adding [domtokenlist-shim](https://github.com/jwilsson/domtokenlist) for IE9

#### Focusable detection

* changing [`ally.is.focusRelevant`][ally/is/focus-relevant] and [`ally.is.focusable`][ally/is/focusable] to regard `<keygen>` and `<embed>` focus-relevant but *not* focusable - [issue #82](https://github.com/medialize/ally.js/issues/82)
* changing [`ally.is.validArea`][ally/is/valid-area] to properly handle `<area href="…">` vs. `<area>` - [issue #72](https://github.com/medialize/ally.js/issues/72)
* changing [`ally.is.focusRelevant`][ally/is/focus-relevant] to properly handle `<object type="application/x-shockwave-flash">` in IE9 - [Issue #71](https://github.com/medialize/ally.js/issues/71)
* fixing [`ally.query.tabsequence`][ally/query/tabsequence] to return `<area>` elements at the correct position - [issue #5](https://github.com/medialize/ally.js/issues/5)
* fixing [`ally.query.tabsequence`][ally/query/tabsequence] to properly sort within Shadow DOM - [issue #6](https://github.com/medialize/ally.js/issues/6)
* refactoring [`ally.query.tabsequence`][ally/query/tabsequence] to extract `util/merge-dom-order` and `util/sort-dom-order`

#### Keyboard support

* changing [`ally.when.key`][ally/when/key] to handle modifier keys and respect `context` and `filter` options - [issue #59](https://github.com/medialize/ally.js/issues/59)
* changing [`ally.map.keycode`][ally/map/keycode] to provide alphanumeric keys and aliasing

#### Internals

* changing `ally.is.*` to work with other documents (e.g. iframes) - [issue #78](https://github.com/medialize/ally.js/issues/78)
* fixing `supports/*` to not raise network errors - [issue #68](https://github.com/medialize/ally.js/issues/68)
* fixing `supports/*` to run when required instead of on script load, restore scroll position - [issue #60](https://github.com/medialize/ally.js/issues/60)
* fixing `supports/supports-cache` to respect ally.js version change
* fixing `supports/focus-label-tabindex` in Chrome 49
* fixing ShadowDOM related unit tests in WebKit

#### Testing

Intern unit tests are now run for the following browsers:

* Internet Explorer 9, 10, 11
* Safari 6.2, 7.1, 8, 9
* Chrome 47
* Firefox 42

#### Sources

* renamed `src/util/sort-elements-by-tabindex.js` to `src/query/tabsequence.sort-tabindex.js`


## 1.0.1 (November 20th 2015)

* aligning `package.json` in repository and npm artifact for compatibility with cdnjs


## 1.0.0 - A New Hope

*November 18th 2015.* We're embarking on a journey to *make accessibility simpler*. Version 1.0.0 - the official release - of ally.js has been 14 months in the making, but it's only the beginning of a long story - or so I hope.


### The mission

**Making accessibility simpler** (for developers) by providing

* providing core functionality (not complete solutions)
* documentation to learn about accessibility requirements
* the basis figure out how specifications need to evolve
* a common ground for the community to collaborate


### The plan

I've laid the foundation for collaboration. My [goals](https://github.com/medialize/ally.js/tree/master/GOALS.md) are laid out. *Everything* is done on github, in the open. *Everything* is up for discussion. *Anyone* can join. See [contributing to ally.js](http://allyjs.io/contributing/index.html) for more.


### The past

Version `1.0.0` is a complete rewrite from the the early `0.0.x` releases, there are no breaking changes, it *is* a giant breaking change. More than 400 commits have been made since `0.0.7`, resulting in a few changes:

* moving dependencies from bower to npm (in fact, abandoning bower altogether)
* moving source from AMD to ES6 Module Syntax
* unifying API of all functions, see the [API docs](docs/api/)
* adding ES6 build infrastructure - [issue #1](https://github.com/medialize/ally.js/issues/1)
* adding unit tests - [issue #2](https://github.com/medialize/ally.js/issues/2) (>90% coverage!)
* adding [`ally.query.firstTabbable`][ally/query/first-tabbable] (replacing `focus/first`) to find the first keyboard focusable element in a sub-tree
* adding `strategy: 'strict'` option to [`ally.query.focusable`][ally/query/focusable] to find elements by filters unavailable to `querySelectorAll()` - i.e. Shadow DOM without the "Shadow Piercing Descendant Combinator", scrollable containers, `-webkit-user-modify: read-write` - [issue #17](https://github.com/medialize/ally.js/issues/17), [issue #21](https://github.com/medialize/ally.js/issues/21)
* [`ally.query.focusable`][ally/query/focusable] no longer considers `<html>` and `<body>` focusable - [issue #31](https://github.com/medialize/ally.js/issues/31)
* adding [`ally.is.focusRelevant`][ally/is/focus-relevant] to identify technically focusable elements (refactored from [`ally.is.focusable`][ally/is/focusable])
* adding [`ally.is.onlyTabbable`][ally/is/only-tabbable] to identify elements that cannot be focused by script, but by keyboard
* adding [`ally.element.disabled`][ally/element/disabled] (refactored from `focus/disabled`) - [issue #33](https://github.com/medialize/ally.js/issues/33)
* adding [`ally.when.key`][ally/when/key] to observe simple keyboard input - [issue #47](https://github.com/medialize/ally.js/issues/47)
* adding [`ally.get.insignificantBranches`][ally/get/insignificant-branches] to find branches not relevant to a given set of elements - [issue #32](https://github.com/medialize/ally.js/issues/32)
* adding [`ally.maintain.hidden`][ally/maintain/hidden] to hide everything in the DOM that is not relevant to a given set of elements - [issue #46](https://github.com/medialize/ally.js/issues/46)
* fixing [`ally.is.visible`][ally/is/visible] by removing dimension constraint - [issue #14](https://github.com/medialize/ally.js/issues/14)
* fixing [`ally.is.focusable`][ally/is/focusable] to also identify "edge-cases" - [issue #17](https://github.com/medialize/ally.js/issues/17), [issue #20](https://github.com/medialize/ally.js/issues/20), [issue #21](https://github.com/medialize/ally.js/issues/21)

#### Breaking changes (compared to 0.0.7)

* ally.js is no longer available through bower, other than by [downloading the built archive](http://allyjs.io/getting-started.html#Installing-via-Package-Manager)
* `src/` was ES5 and AMD, it is now ES6. AMD modules are available in `dist/amd/`
* dropping `focus/first` in favor of [`ally.query.firstTabbable`][ally/query/first-tabbable]
* dropping `focus/trap` in favor of [`ally.maintain.disabled`][ally/maintain/disabled]
* [`ally.is.validArea`][ally/is/valid-area] (`dom/is-valid-area`) now returns `false` for elements that are not `<area>`
* [`ally.is.validTabindex`][ally/is/valid-tabindex] (`dom/is-valid-tabindex`) now returns `false` for elements without `tabindex` attribute
* [`ally.style.focusSource`][ally/style/focus-source] has methods `.next()` and `.repeat()` removed

#### Renamed Files

* renamed `dom/active-elements.js` to `get/active-elements.js`
* renamed `dom/focus-target.js` to `get/focus-target.js`
* renamed `dom/is-disabled.js` to `is/disabled.js`
* renamed `dom/is-focusable.js` to `is/focusable.js`
* renamed `dom/is-shadowed.js` to `is/shadowed.js`
* renamed `dom/is-tabbable.js` to `is/tabbable.js`
* renamed `dom/is-valid-area.js` to `is/valid-area.js`
* renamed `dom/is-valid-tabindex.js` to `is/valid-tabindex.js`
* renamed `dom/is-visible.js` to `is/visible.js`
* renamed `dom/node-array.js` to `util/node-array.js`
* renamed `dom/path.js` to `get/parents.js`
* renamed `dom/query-focusable.js` to `query/focusable.js`
* renamed `dom/query-tabbable.js` to `query/tabbable.js`
* renamed `dom/query-tabsequence.js` to `query/tabsequence.js`
* renamed `dom/shadow-host-ancestors.js` to `get/shadow-host-parents.js`
* renamed `dom/when-visible.js` to `when/visible-area.js`
* renamed `dom/shadow-host.js` to `get/shadow-host.js`
* renamed `dom/sort-tabindex.js` to `util/sort-elements-by-tabindex.js`
* renamed `dom/visible-quotient.js` to `util/visible-area.js`
* renamed `event/interaction-type-listener.js` to `observe/interaction-type.js`
* renamed `focus/source.js` to `style/focus-source.js`
* renamed `focus/when-visible.js` to `when/focusable.js`
* renamed `focus/within.js` to `style/focus-within.js`
* renamed `focus/disable-focus` to `maintain/disabled`


## 0.0.7 (July 8th 2015) ##

* adding `event/shadow-focus` to emit custom event when focus changes within the Shadow DOM - extracted from `focus/within`
* adding `event/interaction-type-listener` to track user input to differentiate keyboard and pointer input
* adding [`focus/source`](http://allyjs.io/examples/focus-source.html) to allow styling of `:focus` dependent on user input (keyboard, pinter, script)
* adding [`focus/disable-focus`](http://allyjs.io/examples/disable-focus.html) to render elements inert and remove them from the document's focus navigation sequence
* deprecating [`focus/trap`](http://allyjs.io/examples/trap-focus.html), use [`focus/disable-focus`](http://allyjs.io/examples/disable-focus.html) instead


## 0.0.6 (June 17th 2015) ##

* fixing [`dom/visible-quotient`](http://allyjs.io/examples/visible-quotient.html) to subtract scrollbars from visible space


## 0.0.5 (June 15th 2015) ##

* adding [`dom/when-visible`](http://allyjs.io/examples/focus-when-visible.html) to execute callback when an element becomes visible
* improving [`dom/when-visible`](http://allyjs.io/examples/focus-when-visible.html) to also wait until an element becomes focusable


## 0.0.4 (February 3rd 2015) ##

* adding [`dom/visible-quotient`](http://allyjs.io/examples/visible-quotient.html)
* adding [`focus/when-visible`](http://allyjs.io/examples/focus-when-visible.html)
* fixing [`fix-browser/pointer-focus-children`](http://allyjs.io/examples/fix-pointer-focus-children.html) to temporarily disable transitions


## 0.0.3 (January 7th 2015) ##

* adding [`fix-browser/pointer-focus-children`](http://allyjs.io/examples/fix-pointer-focus-children.html)
* adding `dom/focus-target` to find the first focusable element in an element's ancestry
* improving [`fix-browser/pointer-focus-parent`](http://allyjs.io/examples/fix-pointer-focus-parent.html) for less complexity
* improving `fix-browser` by only engaging handlers for affected browsers (yes, *user agent sniffing*, deal with it)
* fixing `dom/is-visible` to look at computed styles, not the element's styles (duh!)


## 0.0.2 (January 5th 2015) ##

* adding [`fix-browser/pointer-focus-input`](http://allyjs.io/examples/fix-pointer-focus-input.html)
* adding [`dom/active-elements`](http://allyjs.io/examples/active-elements.html) to identify the actually focsued element and its host elements in ShadowDOM
* adding [`focus/within`](http://allyjs.io/examples/focus-within.html) to "polyfill" [`:focus-within`](http://dev.w3.org/csswg/selectors-4/#the-focus-within-pseudo)
* adding warning to browser support detection when document does not have focus
* adding `supports/supports-cache` to store browser compatibility data
* adding `focus/first` to identify and focus the first `[autofocus]` or non positive tabindex (`[tabindex=1]`) element
* adding `dom/query-domsequence` to separate sorting and mutating the list from `dom/query-tabbable`
* improving [`fix-browser/pointer-focus-parent`](http://allyjs.io/examples/fix-pointer-focus-parent.html) for fewer DOM interactions and less code
* improving [`focus/trap`](http://allyjs.io/examples/trap-focus.html) to allow nothing being focus and re-acquire focus when required
* improving `selector/focusable` (thus `dom/query-focusable`) by also finding focusable shadowed elements (via `>>>` or `/deep/`, ShadowDOM) - [#11](https://github.com/medialize/ally.js/issues/11)
* fixing `event/active-element` to be dispatched on `document` rather than `document.body`
* fixing `prototype/svgelement.prototype.focus` to also cover `SVGElement.prototype.blur`
* fixing linting errors


## 0.0.1 (December 25th 2014) ##

* initial release "focus"


[ally/element/disabled]: http://allyjs.io/api/element/disabled.html
[ally/event/active-element]: http://allyjs.io/api/event/active-element.html
[ally/event/shadow-focus]: http://allyjs.io/api/event/shadow-focus.html
[ally/fix/pointer-focus-children]: http://allyjs.io/api/fix/pointer-focus-children.html
[ally/fix/pointer-focus-input]: http://allyjs.io/api/fix/pointer-focus-input.html
[ally/fix/pointer-focus-parent]: http://allyjs.io/api/fix/pointer-focus-parent.html
[ally/get/active-elements]: http://allyjs.io/api/get/active-elements.html
[ally/get/focus-target]: http://allyjs.io/api/get/focus-target.html
[ally/get/insignificant-branches]: http://allyjs.io/api/get/insignificant-branches.html
[ally/get/parents]: http://allyjs.io/api/get/parents.html
[ally/get/shadow-host-parents]: http://allyjs.io/api/get/shadow-host-parents.html
[ally/get/shadow-host]: http://allyjs.io/api/get/shadow-host.html
[ally/is/disabled]: http://allyjs.io/api/is/disabled.html
[ally/is/focus-relevant]: http://allyjs.io/api/is/focus-relevant.html
[ally/is/focusable]: http://allyjs.io/api/is/focusable.html
[ally/is/only-tabbable]: http://allyjs.io/api/is/only-tabbable.html
[ally/is/shadowed]: http://allyjs.io/api/is/shadowed.html
[ally/is/tabbable]: http://allyjs.io/api/is/tabbable.html
[ally/is/valid-area]: http://allyjs.io/api/is/valid-area.html
[ally/is/valid-tabindex]: http://allyjs.io/api/is/valid-tabindex.html
[ally/is/visible]: http://allyjs.io/api/is/visible.html
[ally/maintain/disabled]: http://allyjs.io/api/maintain/disabled.html
[ally/maintain/hidden]: http://allyjs.io/api/maintain/hidden.html
[ally/map/attribute]: http://allyjs.io/api/map/attribute.html
[ally/map/keycode]: http://allyjs.io/api/map/keycode.html
[ally/observe/interaction-type]: http://allyjs.io/api/observe/interaction-type.html
[ally/query/first-tabbable]: http://allyjs.io/api/query/first-tabbable.html
[ally/query/focusable]: http://allyjs.io/api/query/focusable.html
[ally/query/tabbable]: http://allyjs.io/api/query/tabbable.html
[ally/query/tabsequence]: http://allyjs.io/api/query/tabsequence.html
[ally/style/focus-source]: http://allyjs.io/api/style/focus-source.html
[ally/style/focus-within]: http://allyjs.io/api/style/focus-within.html
[ally/when/focusable]: http://allyjs.io/api/when/focusable.html
[ally/when/key]: http://allyjs.io/api/when/key.html
[ally/when/visible-area]: http://allyjs.io/api/when/visible-area.html
[ally/prototype]: http://allyjs.io/api/prototype.html
[ally/selector]: http://allyjs.io/api/selector.html
[ally/supports]: http://allyjs.io/api/supports.html
[ally/util]: http://allyjs.io/api/util.html
