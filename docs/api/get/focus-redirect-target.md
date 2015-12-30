---
layout: doc-api.html
tags: internal, argument-options
---

# ally.get.focusRedirectTarget

Identifies the element that would get focus passed to when `element.focus()` is executed


## Description

Some elements forward focus to another element instead of taking focus themselves.

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) and [what ally.js considers focusable](../../data-tables/focusable.strict.md) to learn how HTML elements behave.


## Usage

```js
var element = ally.get.focusRedirectTarget({
  context: '#element-to-test',
});
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | *required* | The element to identify the target for. |

### Returns

[`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement).

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `context` option is not specified.


## Examples


## Changes

* Added in `v#master`.


## Notes

* **NOTE:** Focus redirection is only tested and evaluated for situations where *script* shift focus, not pointer (mouse, touch) or keyboard. Identifying pointer focus behavior is an [open issue](https://github.com/medialize/ally.js/issues/99). The `<label>` element is exempted from this limitation.


## Related resources

* [`ally.is.focusRelevant`](../isfocus-relevant.md) is used to identify elements that can receive focus
* [`ally.is.focusable`](../is/focusable.md) identifies keyboard focusable elements

* [What Browsers Consider Focusable](../../data-tables/focusable.md)
* [What ally.js Considers Focusable](../../data-tables/focusable.strict.md)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/get/focus-redirect-target.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/get/focus-redirect-target.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/get.focus-redirect-target.test.js)

