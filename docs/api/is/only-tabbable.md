---
layout: doc-api.html
tags: argument-list
---

# ally.is.onlyTabbable

Determines if an element is considered tabbable and not focusable.


## Description

An element is considered tabbable and not focusable if the element is part of the document's focus navigation sequence, but cannot be focused by script.

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) and [what ally.js fails to consider focusable](../../data-tables/focusable.is.md) to learn how HTML elements behave.


## Usage

```js
var element = document.getElementById('victim');
var isOnlyTabbable = ally.is.onlyTabbable(element);
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| element | [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | *required* | The Element to test. |

The underlying rules can also be accessed in the [`options` argument style](../concepts.md#single-options-argument) by calling `ally.is.onlyTabbable.rules(options)`:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#selector) | *required* | The element to examine. The first element of a collection is used. |
| except | [`<focus identification exception>`](../concepts.md#focus-identification-exceptions) | `{}` | The Element to test. |

### Returns

Boolean, `true` if the element is only tabbable.

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `element` argument is not of type `HTMLElement`.


## Examples


## Changes

* Since `v1.1.0` all `<object>` elements in Internet Explorer are not considered only tabbable anymore.
* Since `v1.1.0` exceptions can be passed to `ally.is.onlyTabbable.rules(options)`.
* Since `v1.1.0` the state of the `<iframe>` or `<object>` element in which the currently examined element is hosted in is considered.
* Since `v1.1.0` elements must be [visible](./visible.md) to be considered only tabbable.
* Since `v1.4.0` SVG elements are no longer considered *only tabbable* in IE9+, Edge12+ and Firefox 51+.


## Notes

See [`ally.is.focusRelevant`](./focus-relevant.md#notes)

:::note
There is no way to feature detect if an element is tabbable or not. The `Element.tabIndex` property gives some indication, but ultimately user agent sniffing (via [platform.js](https://github.com/bestiejs/platform.js/)) is done internally to fix mismatches.
:::

:::warning
Even though SVG elements are focusable by script in Internet Explorer, they may lack the `.focus()` and `.blur()` methods. In order to safely manage focus for these elements use [`ally.element.focus`](../element/focus.md) and [`ally.element.blur`](../element/blur.md).
:::


## Related resources

* [`ally.is.focusRelevant`](focus-relevant.md) is used to identify elements that can receive focus
* [`ally.is.focusable`](focusable.md) identifies focusable elements
* [`ally.is.tabbable`](tabbable.md) identifies keyboard focusable elements

* [What Browsers Consider Focusable](../../data-tables/focusable.md)
* [What ally.js fails to consider focusable](../../data-tables/focusable.is.md)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/only-tabbable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/only-tabbable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/is.only-tabbable.test.js)

