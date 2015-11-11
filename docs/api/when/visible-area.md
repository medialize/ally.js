---
layout: doc-api.html
tags: service, argument-object
---

# ally.when.visibleArea

Executes a callback once an element is visible in the viewport


## Description

The callback is executed once the predicates [`ally/is/visible`](../is/visible.md) and [`ally/util/visible-area`](../util.md#Calculate-An-Element-s-Visible-Area) return positive. Visibility detection works regardless of the technical way an element was made invisible. The predicates are evaluated on every [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame).

The callback function executes exactly once, meaning the callback won't execute every time the element comes into view. The callback is executed immediately if the context element is already fully visible.

The callback may return `false` to indicate that another predicate (handled by the callback function) has not been fulfilled yet and the callback should be executed again on the next animation frame.


## Usage

```js
var handle = ally.when.visibleArea({
  context: '#element-to-focus',
  callback: function(element) {
    console.log("element is visible", element)
  },
});

handle.disengage();
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | *required* | The element to observe. The first element of a collection is used. |
| callback | function | *required* | The callback to execute when context element is visible in viewport and focusable. See [Callback Signature](#Callback-Signature) for details. |
| area | number | `1` | The percentage (0 - 1) of area of the context element has to be visible in the viewport. |

### Returns

A [`<service>`](../concepts.md#Service) interface, providing the `handle.disengage()` method to stop the service.

### Throws

* [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `context` option is not specified or not a `HTMLElement`.
* [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `callback` option is not specified or not a `function`.


## Callback Signature

The callback is invoked with one argument, the `HTMLElement` identified by `context`. The callback can return `false` to signal that the service needs to keep observing `context`, to allow additional state verification to be performed within the callback. If nothing is returned, the service disengages after the callback finished processing.


## Examples

TODO: figure out how to integrate demo


## Notes

* **NOTE:** This method *may* cause [layout thrashing](http://wilsonpage.co.uk/preventing-layout-thrashing/)


## Related Resources


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/when/visible-area.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/when/visible-area.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/when.visible-area.test.js)

