---
layout: doc-api.html
apiModuleName: ally/when/focusable
apiBuiltName: ally.when.focusable
---

# ally.when.focusable (`ally/when/focusable`)

Executes a callback once an element fulfills `ally/is/focusable` and is visible in the viewport

[`Element.focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.focus) scrolls the element into view if it isn't already. In situations where content is not revealed immediately, but through a transition
or animation this can be a problem if the element is focused to early.

The callback executes once the predicates [`ally/is/visible`](../is/visible.md), [`ally/is/focusable`](../is/focusable.md) and [`ally/util/visible-area`](../util.md#Calculate-An-Element-s-Visible-Area) return positive. Visibility detection works regardless of the technical way an element was made invisible. The predicates are evaluated on every [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame).

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
  // wait until context element is focusable
  var handle = ally.when.focusable({
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '#element-to-focus',
    // callback and filter function
    callback: function(element) {
      // the context is passed back as element for convenience
      element.focus();
      // upon return of the callback handle.disengage() is executed internally,
      // to prevent disengaging, to keep polling, return false
    },
    // [optional] percentage of area of the context element to be visible in the viewport
    // default is 1, be careful with lower values because browsers
    // may scroll the element the into view
    area: 1,
  });
  // abort waiting for element to become focusable
  handle.disengage();
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/when/focusable'
], function(whenFocusable) {
  // wait until context element is focusable
  var handle = whenFocusable({
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '#element-to-focus',
    // callback and filter function
    callback: function(element) {
      // the context is passed back as element for convenience
      element.focus();
      // upon return of the callback handle.disengage() is executed internally,
      // to prevent disengaging, to keep polling, return false
    },
    // [optional] percentage of area of the context element to be visible in the viewport
    // default is 1, be careful with lower values because browsers
    // may scroll the element the into view
    area: 1,
  });
  // abort waiting for element to become focusable
  handle.disengage();
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/when/key`](key.md)
* [`ally/when/visible-area`](visible-area.md) is used internally to wait until element is visible in viewport, before checking if it is focusable


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/when/focusable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/when/focusable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/when.focusable.test.js)


---

Back to the [API Documentation](../README.md).

