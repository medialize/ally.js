---
layout: doc-api.html
tags: argument-list
---

# ally.is.focusable

Determines if an element is considered focusable.


## Description

An element is considered focusable if it is [`ally.is.focusRelevant`](./focus-relevant.md), [`ally.is.visible`](./visible.md) and not [`ally.is.disabled`](./disabled.md).

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) and [what ally.js fails to consider focusable](../../data-tables/focusable.is.md) to learn how HTML elements behave.


## Usage

```js
var element = document.getElementById('victim');
var isFocusable = ally.is.focusable(element);
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| element | [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | *required* | The Element to test. |

The underlying rules can also be accessed in the [`options` argument style](../concepts.md#Single-options-argument) by calling `ally.is.focusable.rules(options)`:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | *required* | The element to examine. The first element of a collection is used. |
| except | [`<focus identification exception>`](../concepts.md#Focus-identification-exceptions) | `{}` | The Element to test. |

### Returns

Boolean, `true` if the element is focusable.

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `element` argument is not of type `HTMLElement`.


## Examples


## Changes

* Since `v#master` all `<area>` elements are considered focus-relevant, but only valid `<area>` elements are considered focusable.
* Since `v#master` exceptions can be passed to `ally.is.focusable.rules(options)`.


## Notes

See [`ally.is.focusRelevant`](./focus-relevant.md#Notes)


## Related resources

* [`ally.is.focusRelevant`](focus-relevant.md) is used to identify elements that can receive focus
* [`ally.is.focusable`](focusable.md) identifies elements that are focusable
* [`ally.query.focusable`](../query/focusable.md) finds focusable elements in the DOM
* [`ally.is.validArea`](valid-area.md) is used to identify if `<area>` elements satisfy the requirements to be considered focusable

* [What Browsers Consider Focusable](../../data-tables/focusable.md)
* [What ally.js fails to consider focusable](../../data-tables/focusable.is.md)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/focusable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/focusable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/is.focusable.test.js)

