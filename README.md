# a11y.js

a11y.js (pronounced "ally js", pun intended) is a suite of JavaScript functions and workflows to help your application with various [WAI-ARIA](http://www.w3.org/TR/wai-aria/) related accessibility concerns.

---
---
---

## Goals

* help manage focus
* abstract keyboard bindings
* create unqique IDs for aria-reference-only use
* provide default data maps (keyCodes, aria attribute values, …)

## Questions

* tabbing to an element that is not in the viewport triggers scroll - preventable?

---

## Read

* http://www.w3.org/TR/html5/editing.html#the-hidden-attribute
* http://www.w3.org/TR/wai-aria/
* http://w3c.github.io/aria-in-html/
* http://www.w3.org/WAI/PF/aria-practices/

* http://www.marcozehe.de/2008/02/29/easy-aria-tip-1-using-aria-required/
* http://www.marcozehe.de/2008/08/06/aria-in-gmail-2-enhancing-the-chat-experience/
* http://www.marcozehe.de/2008/07/16/easy-aria-tip-3-aria-invalid-and-role-alert/
* http://www.marcozehe.de/2008/03/23/easy-aria-tip-2-aria-labelledby-and-aria-describedby/
* http://www.marcozehe.de/2008/03/25/a-follow-up-to-my-easy-aria-tip-2/
* http://www.marcozehe.de/2010/02/10/easy-aria-tip-5-aria-expanded-and-aria-controls/
* http://www.marcozehe.de/2013/04/24/easy-aria-tip-6-making-clickables-accessible/
* http://www.marcozehe.de/2014/03/11/easy-aria-tip-7-use-listbox-and-option-roles-when-constructing-autocomplete-lists/

* http://www.marcozehe.de/2008/08/04/aria-in-gmail-1-alerts/
* http://www.marcozehe.de/2013/08/02/how-i-came-to-grudgingly-accept-aria-hidden/
* http://www.marcozehe.de/2013/03/08/sometimes-you-have-to-use-illegal-wai-aria-to-make-stuff-work/
* http://www.marcozehe.de/2012/02/06/if-you-use-the-wai-aria-role-application-please-do-so-wisely/
* http://www.marcozehe.de/2011/12/05/from-wai-aria-to-html5-and-back-or-maybe-not/

---

## Check Out

* https://github.com/Flamefork/freefocus (arrow-key focus navigation)
* http://n12v.com/focus-transition/ (animated :focus transitions)
  * `-moz-mac-focusring`
  * scrollIntoView
  * https://github.com/NV/flying-focus/
  * https://jonathanstark.com/labs/flying-focus/

---
---
---

## Features:

* `dom/query-focusable` `dom/is-focusable` - to obtain a list of focusable elements within a given dom element
* `dom/query-tabbable` `dom/is-tabbable` - to obtain a list of tabbable elements within a given dom element

* `focus/contain` -- to contain the *focus* within a given dom element upon <kbd>Tab</kbd>
* `focus/wrap` -- to focus next or previous tabbable element with given dom element
* `focus/fix-pointer-focus` -- to work around focus-click bug in Blink and WebKit

* `event/active-element` -- to dispatch `active-element` event to `html` element regardless of `focus` event


---
---
---

## Requirements:

* [ES5](http://kangax.github.io/compat-table/es5/)
* [ES6 Array.prototype.findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
* [CSSOM CSS.escape](https://developer.mozilla.org/en-US/docs/Web/API/CSS.escape) ([spec](http://dev.w3.org/csswg/cssom/#the-css.escape%28%29-method))

## Dependencies:

* [ES5 shim](https://github.com/es-shims/es5-shim)
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

## Tools


### Screen Readers

* [ChromeVox](www.chromevox.com) (Chrome, Free)
* [NVDA](http://www.nvaccess.org/) (Windows, Free)
* [JAWS](http://www.freedomscientific.com/Products/Blindness/JAWS) (Windows, Trial)
* [ZoomText](http://www.aisquared.com/zoomtext/more/zoomtext_magnifier_reader/) (Windows, Trial)


### Tools for Visualizing the Accessibility Tree

* [Firefox DOM Inspector Extension](https://addons.mozilla.org/en-US/firefox/addon/dom-inspector-6622/) (Accessibility Tree, Accessibility Events)
* XCode Accessibility Inspector `open '/Applications/Xcode.app/Contents/Applications/Accessibility Inspector.app'`


---

## Changelog

### 0.0.0 (???) ###

* initial release


## License

a11y.js is published under the [MIT License](http://opensource.org/licenses/mit-license).
