---
layout: doc-api.html
tags: argument-list
---

# ally.is.tabbable

Determines if an element is considered keyboard focusable ("tabbable").


## Description

The function does *not* verify if an element is focusable. It expects input that is considered focusable, so `isTabbable(element)` does *not always* equal `isFocusable(element) && isTabbable(element)`.

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) and [what ally.js fails to consider focusable](../../data-tables/focusable.is.md) to learn how HTML elements behave.


## Usage

```js
var element = document.getElementById('victim');
var isTabbable = ally.is.tabbable(element);
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| element | [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | *required* | The Element to test. |

The underlying rules can also be accessed in the [`options` argument style](../concepts.md#single-options-argument) by calling `ally.is.tabbable.rules(options)`:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#selector) | *required* | The element to examine. The first element of a collection is used. |
| except | [`<focus identification exception>`](../concepts.md#focus-identification-exceptions) | `{}` | The Element to test. |

### Returns

Boolean, `true` if the element is tabbable.

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `element` argument is not of type `HTMLElement`.


## Examples


## Changes

* Since `v1.1.0` matching of `SVGElement`s is done document-independent, to allow elements from other documents (e.g. from an iframe).
* Since `v1.1.0` all `<iframe>` elements are considered focusable, not tabbable - except for IE9.
* Since `v1.1.0` exceptions can be passed to `ally.is.tabbable.rules(options)`.
* Since `v1.1.0` the state of the `<iframe>` or `<object>` element in which the currently examined element is hosted in is considered.
* Since `v1.3.0` the `except.scrollable` properly filters elements with CSS property `overflow` in Firefox.
* Since `v#master` SVG elements can be tabbable in Firefox and Internet Explorer.
* Since `v#master` SVG elements within `<object>` or `<iframe>` can be tabbable in Blink.
* Since `v#master` SVG elements with negative tabindex attribute within browsing contexts (`<iframe>` or `<object>`) are considered tabbable since Edge 14.


## Notes

See [`ally.is.focusRelevant`](./focus-relevant.md#notes)

:::note
There is no way to feature detect if an element is tabbable or not. The `Element.tabIndex` property gives some indication, but ultimately user agent sniffing (via [platform.js](https://github.com/bestiejs/platform.js/)) is done internally to fix mismatches.
:::


## Related resources

* [`ally.is.focusRelevant`](focus-relevant.md) identifies elements that can receive focus
* [`ally.is.focusable`](focusable.md) identifies elements that are focusable
* [`ally.is.onlyTabbable`](focusable.md) identifies elements that are keyboard focusable but not focusable by script
* [`ally.query.tabbable`](../query/tabbable.md) finds keyboard focusable elements in the DOM

* [What Browsers Consider Focusable](../../data-tables/focusable.md)
* [What ally.js fails to consider focusable](../../data-tables/focusable.is.md)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/tabbable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/tabbable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/is.tabbable.test.js)
