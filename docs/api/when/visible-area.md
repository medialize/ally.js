---
layout: doc-api.html
---

# ally.when.visibleArea (`ally/when/visible-area`)

Executes a callback once an element is visible in the viewport

The callback executes once the predicates [`ally/is/visible`](../is/visible.md) and [`ally/util/visible-area`](../util.md#Calculate-An-Element-s-Visible-Area) return positive. Visibility detection works regardless of the technical way an element was made invisible. The predicates are evaluated on every [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame).

The callback function executes exactly once, meaning it won't focus the target element every time it comes into view. Waiting for the callback to execute is aborted automatically should another element have gotten focus prior to the context element coming fully into view. The callback is executed immediately if the context element is already fully visible and focusable.

The callback may return `false` to indicate that another predicate (handled by the callback function) has not been fulfilled yet and the callback should be executed again on the next animation frame.


## Notes

* **NOTE:** This method *may* cause [layout thrashing](http://wilsonpage.co.uk/preventing-layout-thrashing/)


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  // wait until context element is visible in the viewport
  var handle = ally.when.visibleArea({
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '#element-to-focus',
    // callback and filter function
    callback: function(element) {
      // the context is passed back as element for convenience
      console.log("element is visible", element)
      // upon return of the callback handle.disengage() is executed internally,
      // to prevent disengaging, to keep polling, return false
    },
    // [optional] percentage of area of the context element to be visible in the viewport
    // default is 1, be careful with lower values because browsers
    // may scroll the element the into view
    area: 1,
  });
  // abort waiting for element to become visible
  handle.disengage();
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/when/visible-area'
], function(whenVisibleArea) {
  // wait until context element is visible in the viewport
  var handle = whenVisibleArea({
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '#element-to-focus',
    // callback and filter function
    callback: function(element) {
      // the context is passed back as element for convenience
      console.log("element is visible", element)
      // upon return of the callback handle.disengage() is executed internally,
      // to prevent disengaging, to keep polling, return false
    },
    // [optional] percentage of area of the context element to be visible in the viewport
    // default is 1, be careful with lower values because browsers
    // may scroll the element the into view
    area: 1,
  });
  // abort waiting for element to become visible
  handle.disengage();
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/when/focusable`](focusable.md)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/when/visible-area.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/when/visible-area.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/when.visible-area.test.js)


---

Back to the [API Documentation](../README.md).

