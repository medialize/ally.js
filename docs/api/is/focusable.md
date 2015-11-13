---
layout: doc-api.html
tags: argument-list
---

# ally.is.focusable

Determines if an element is considered focusable.


## Description

An element is considered focusable if it is script focusable ([is/focus-relevant](./focus-relevant.md)), visible and not disabled.

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) and [what ally.js considers focusable](../../data-tables/focusable.strict.md) to learn how HTML elements behave.


## Usage

```js
var element = document.getElementById('victim');
var isFocusable = ally.is.focusable(element);
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


## Notes

See [`ally.is.focusRelevant`](./focus-relevant.md#Notes)


## Related Resources

* [`ally.is.focusRelevant`](focus-relevant.md) is used to identify elements that can receive focus
* [`ally.is.tabbable`](tabbable.md) identifies keyboard focusable elements
* [`ally.query.focusable`](../query/focusable.md) finds focusable elements in the DOM

* [What Browsers Consider Focusable](../../data-tables/focusable.md)
* [What ally.js Considers Focusable](../../data-tables/focusable.strict.md)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/focusable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/focusable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/is.focusable.test.js)

