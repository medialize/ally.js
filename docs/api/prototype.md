---
layout: doc-page.html
tags: internal
---

# Prototype Polyfills

The prototype infrastructure makes functions available in modern browsers available to older browsers lacking the native support.

* `prototype/element.prototoype.matches.js` polyfills [Element.matches](https://developer.mozilla.org/en-US/docs/Web/API/Element.matches)
* `prototype/svgelement.prototype.focus.js` makes [`HTMLElement.focus`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) available at `SVGElement.focus` (which is not formally specified prior to [SVG 2](http://www.w3.org/TR/SVG2/interact.html#Focus))
* `prototype/window.customevent.js` polyfills the [`CustomEvent`](https://developer.mozilla.org/en/docs/Web/API/CustomEvent) constructor (but returns it rather than overwriting `window.CustomEvent` in Internet Explorer)

Additionally ally.js uses the following third party polyfills:

* [`CSS.escape`](https://github.com/mathiasbynens/CSS.escape) to polyfill the [CSSOM `CSS.escape`](https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape) function
* [array.prototype.findindex](https://github.com/paulmillr/Array.prototype.findIndex) to polyfill the [ES6 `Array.findIndex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)


## Contributing

ally.js is not using the [babel polyfill](http://babeljs.io/docs/usage/polyfill/) because it is too big for the rather limited subset we're using at the moment. This may change in the future, but we're not keen on making this move.

ally.js will not pollute prototypes of built-in methods with anything but proper polyfills for (semi-) standardized methods. If we *need* to add another polyfill, we'll prefer to use an external dependency over implementing things ourselves.


