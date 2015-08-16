---
layout: doc-page.html
---

# Utilities

the util infrastructure does not contain any functionality relevant to a user of ally.js. It merely contains code supporting other components, e.g. to ensure consistent component function signatures for a consistent APIs. To be honest, it's also the dumping ground for everything that didn't fit into one of the other buckets. None of these functions are available through the `ally` object exposed by the production `dist/ally.min.js`, but very much accessible via modules.


## Contribution Notes

### Translate Input To Node Array

Internally ally.js prefers to use Arrays of Nodes, but when accepting input from the outside we're not sure what we get. NodeList, HTMLCollection, jQuery object, a single Node or even just a string (to run through [document.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)) - `util/node-array.js` converts everything to array.


### Context To Element

`util/context-to-element.js` is an internal convenience function to hide grabbing the first element of `util/node-array` or throwing an `TypeError` if nothing was found. It is unclear if this "convenience" may cause developers to complain about indirected stack traces.


### Decorate Service

`util/decorate-service.js` is a decorator wrapping a component's setup (`engage`) and teardown (`disengage`) functions in a way that exposes the component with the following trivialized signature:

```js
function engage() {
  component.engage();
  return {
    disengage: function() {
      component.disengage();
    }
  }
}
```

The "service" aspect here is that a components `engage()` function can be invoked from anyone anywhere anytime without having to track if the component has already been initialized before. This is made possible by a simple reference counter. If three components `engage()` but only two `disengage()`, the `component.disengage()` is never executed. Only after the last reference has been `disengage()`d, the component is told to teardown. It is possible to force teardown by executing `disengage({force: true})`.

A component's `engage()` function may return an result object. The decorated `disengage()` function is added to that result object, returned to the caller and cached for subsequent calls to the decorated `engage()` function.


### Decorate Options.context

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
    }
  }
}
```

Unlike the singleton decorator, the context decorator allows multiple concurrent instances of a component. There is no need for counting references - `disengage()`ing is the library user's obligation.

A component's `engage()` function may return an result object. The decorated `disengage()` function is added to that result object and returned to the caller. Unlike the singleton decorator, the context decorator returns a unique result object for every `engage()` invocation.



### Sort Elements By Tabindex

`util/sort-elements-by-tabindex` is a function to sort a list of elements in such a way that elements with a positive tabindex (e.g. `[tabindex="4"]`) come first in ascending order and the other nodes remain in DOM order.


### Retrieve Tabindex Value

`util/tabindex-value` returns the value of the tabindex attribute (not property!) as an integer, or null for missing or invalid values


### Calculate An Element's Visible Area

`util/visible-area` calculates the fraction of the area that is visible in the viewport (`1` fully visible, `0` not visible at all, `0.5` half the element is visible, the rest is hidden by *scroll containers*)


---

Back to the [API Documentation](./README.md).
