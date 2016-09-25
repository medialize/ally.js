---
layout: doc-api.html
tags: service, argument-object
---

# ally.when.focusable

Executes a callback once an element fulfills [`ally.is.focusable`](../is/focusable.md) and is visible in the viewport


## Description

[`Element.focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.focus) scrolls the element into view if it isn't already. In situations where content is not revealed immediately, but through a transition
or animation this can be a problem if the element is focused to early.

The callback executes once the predicates [`ally.is.visible`](../is/visible.md), [`ally.is.focusable`](../is/focusable.md) and [`ally/util/visible-area`](../util.md#calculate-an-elements-visible-area) return positive. Visibility detection works regardless of the technical way an element was made invisible. The predicates are evaluated on every [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame).

The callback function executes exactly once, meaning the callback won't execute every time the element comes into view. Waiting for the callback to execute is aborted automatically should another element have gotten focus prior to the context element coming fully into view. The callback is executed immediately if the context element is already fully visible and focusable.

The callback may return `false` to indicate that another predicate (handled by the callback function) has not been fulfilled yet and the callback should be executed again on the next animation frame.


## Usage

```js
var handle = ally.when.focusable({
  context: '#element-to-focus',
  callback: function(element) {
    element.focus();
  },
});

handle.disengage();
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#selector) | *required* | The element to observe. The first element of a collection is used. |
| callback | function | *required* | The callback to execute when context element is visible in viewport and focusable. See [Callback Signature](#callback-signature) for details. |
| area | number | `1` | The percentage (0 - 1) of area of the context element has to be visible in the viewport. |

### Returns

A [`<service>`](../concepts.md#service) interface, providing the `handle.disengage()` method to stop the service.

### Throws

* [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `context` option is not specified or not a `HTMLElement`.
* [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `callback` option is not specified or not a `function`.


## Callback signature

The callback is invoked with one argument, the `HTMLElement` identified by `context`. The callback can return `false` to signal that the service needs to keep observing `context`, to allow additional state verification to be performed within the callback. If nothing is returned, the service disengages after the callback finished processing.


## Examples

@@@example /api/when/focusable.example.html
### focusable example
@@@


## Notes

:::note
This method *may* cause [layout thrashing](http://wilsonpage.co.uk/preventing-layout-thrashing/).
:::


## Related resources

* [`ally.is.visible`](../is/visible.md) is used to identify if the element is focusable
* [`ally.when.visibleArea`](visible-area.md) is used internally to wait until element is visible in viewport, before checking if it is focusable
* [Managing focus in animated UI](../../tutorials/focusing-in-animated-ui.md)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/when/focusable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/when/focusable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/when.focusable.test.js)

