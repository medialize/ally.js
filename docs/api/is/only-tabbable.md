---
layout: doc-api.html
tags: argument-list
---

# ally.is.onlyTabbable

Determines if an element is considered tabbable and not focusable.


## Description

An element is considered tabbable and not focusable if the element is part of the document's focus navigation sequence, but cannot be focused by script.

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) and [what ally.js considers focusable](../../data-tables/focusable.strict.md) to learn how HTML elements behave.


## Usage

```js
var element = document.getElementById('victim');
var isOnlyTabbable = ally.is.onlyTabbable(element);
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| element | [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | *required* | The Element to test. |

### Returns

Boolean, `true` if the element is focus relevant.

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `element` argument is not of type `HTMLElement`.


## Examples


## Changes

* Since `v#master` all `<object>` elements in Internet Explorer are not considered only tabbable anymore.

## Notes

See [`ally.is.focusRelevant`](./focus-relevant.md#Notes)

* **NOTE:** there is no way to feature detect if an element is tabbable or not. The `Element.tabIndex` property gives some indication, but ultimately user agent sniffing (via [platform.js](https://github.com/bestiejs/platform.js/)) is done internally to fix mismatches.


## Related resources

* [`ally.is.focusRelevant`](focus-relevant.md) is used to identify elements that can receive focus
* [`ally.is.focusable`](focusable.md) identifies focusable elements
* [`ally.is.tabbable`](tabbable.md) identifies keyboard focusable elements

* [What Browsers Consider Focusable](../../data-tables/focusable.md)
* [What ally.js Considers Focusable](../../data-tables/focusable.strict.md)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/only-tabbable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/only-tabbable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/is.only-tabbable.test.js)

