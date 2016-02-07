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

The underlying rules can also be accessed in the [`options` argument style](../concepts.md#Single-options-argument) by calling `ally.is.onlyTabbable.rules(options)`:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | *required* | The element to examine. The first element of a collection is used. |
| except | [`<focus identification exception>`](../concepts.md#Focus-identification-exceptions) | `{}` | The Element to test. |

### Returns

Boolean, `true` if the element is only tabbable.

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `element` argument is not of type `HTMLElement`.


## Examples


## Changes

* Since `v#master` all `<object>` elements in Internet Explorer are not considered only tabbable anymore.
* Since `v#master` exceptions can be passed to `ally.is.onlyTabbable.rules(options)`.


## Notes

See [`ally.is.focusRelevant`](./focus-relevant.md#Notes)

* **NOTE:** there is no way to feature detect if an element is tabbable or not. The `Element.tabIndex` property gives some indication, but ultimately user agent sniffing (via [platform.js](https://github.com/bestiejs/platform.js/)) is done internally to fix mismatches.


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

