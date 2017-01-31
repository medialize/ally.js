---
layout: doc-page.html
tags: internal
---

# Utilities

the util infrastructure does not contain any functionality relevant to a user of ally.js. It merely contains code supporting other components, e.g. to ensure consistent component function signatures for a consistent APIs. To be honest, it's also the dumping ground for everything that didn't fit into one of the other buckets. None of these functions are available through the `ally` object exposed by the production file `dist/ally.min.js`, but are very much accessible via modules.


## Contributing

### Platform

In order to make using [platform.js](https://github.com/bestiejs/platform.js) even simpler, this utility adds the few verifications ally.js actually needs.


### Logger

In order to safely access - and in the future possibly mutate - any calls to `console.log` et al, we're importing the logger utility, rather than referencing `console.*` directly.


### Translate input to node array

Internally ally.js prefers to use Arrays of Nodes, but when accepting input from the outside we're not sure what we get. NodeList, HTMLCollection, jQuery object, a single Node or even just a string (to run through [document.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)) - `util/node-array.js` converts everything to array.


### Context to element

`util/context-to-element.js` is an internal convenience function to hide grabbing the first element of `util/node-array` or throwing an `TypeError` if nothing was found. It is unclear if this "convenience" may cause developers to complain about indirected stack traces.


### Decorate service

`util/decorate-service.js` is a decorator wrapping a component's setup (`engage`) and teardown (`disengage`) functions in a way that exposes the component with the following trivialized signature:

```js
function engage() {
  component.engage();
  return {
    disengage: function() {
      component.disengage();
    },
  };
}
```

The "service" aspect here is that a components `engage()` function can be invoked from anyone anywhere anytime without having to track if the component has already been initialized before. This is made possible by a simple reference counter. If three components `engage()` but only two `disengage()`, the `component.disengage()` is never executed. Only after the last reference has been `disengage()`d, the component is told to teardown. It is possible to force teardown by executing `disengage({force: true})`.

A component's `engage()` function may return an result object. The decorated `disengage()` function is added to that result object, returned to the caller and cached for subsequent calls to the decorated `engage()` function.


### Decorate options.context

`util/decorate-context` is a decorate wrapping a component's setup (`engage()`) and teardown (`disengage()`) functions in a way that exposes the component with the following trivialized signature:

```js
function engage(options) {
  var context = nodeArray(options.context);
  context.forEach(function(element) {
    component.engage(element);
  });
  return {
    disengage: function() {
      context.forEach(function(element) {
        component.disengage(element);
      });
    },
  };
}
```

Unlike the singleton decorator, the context decorator allows multiple concurrent instances of a component. There is no need for counting references - `disengage()`ing is the library user's obligation.

A component's `engage()` function may return an result object. The decorated `disengage()` function is added to that result object and returned to the caller. Unlike the singleton decorator, the context decorator returns a unique result object for every `engage()` invocation.


### Sort elements according to DOM order

`util/sort-dom-order` sorts an `Array` of elements according to their relative position in the DOM.


### Merge elements according to DOM order

`util/merge-dom-order` merges an `Array` of elements with another `Array` of elements so that the resulting array's sorting order corresponds to DOM each element's relative position in the DOM.


### Retrieve tabindex value

`util/tabindex-value` returns the value of the tabindex attribute (not property!) as an integer, or null for missing or invalid values


### Calculate an element's visible area

`util/visible-area` calculates the fraction of the area that is visible in the viewport (`1` fully visible, `0` not visible at all, `0.5` half the element is visible, the rest is hidden by *scroll containers*)


### Compare document position

`util/compare-position` provides utilities for comparing the relative position of elements in the DOM for use with higher order functions (such as `Array.map`)


### Toggle attribute value

`util/toggle-attribute-value` can will change an attribute's value, while saving its former value to allow restoring the previous state


### Select in ShadowDOM

`util/select-in-shadows` mutates a given CSS selector in order to make it match elements in ShadowDOM as well.


### Get a Node's document, window and content document

* `util/get-content-document` returns the `document` representing the content of an `<iframe>` or `<object>` element.
* `util/get-document` returns the `document` an element is attached to.* `util/get-document` returns the `document` an element is attached to.
* `util/get-frame-element` returns the `<iframe>` or `<object>` the element is hosted in.
* `util/get-window` returns the `window` (also known as `defaultView`) of the document and element is attached to.`util/get-window` returns the `window` (also known as `defaultView`) of the document and element is attached to.

### Mutate Element.className (classList)

`util/toggle-class` mutates a given element's `class` attribute without using [`classList`](https://developer.mozilla.org/en/docs/Web/API/Element/classList), as this is not consistently available on `Element` and `SVGEelement`.

### Reset scroll positions

`util/reset-scrolling` collects the scroll positions of the given element's ancestors. The function returned as a result will reset the elements to the collected elements' positions. This is useful to revert the effect of an operation that causes unpreventable scrolling.

### Match element agains CSS selector

`util/element-matches` provides a simple interface to using [Element.matches](https://developer.mozilla.org/en-US/docs/Web/API/Element.matches) through its various vendor-prefixed names.

### Find an item in an array

`util/array-find-index` is a simple wrapper that provides the same functionality as [Array.findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) for non ES 6 browsers.
