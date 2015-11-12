---
layout: doc-api.html
tags: argument-options
---

# ally.query.tabsequence

Finds keyboard focusable ("tabbable") elements in the DOM and returns them in the order calculated based on `tabindex` attribute values.


## Description

See [`ally/query/focusable`](./focusable.md) for an explanation on the different query strategies.

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) and what ally.js considers focusable in [`strategy: "strict"`](../../data-tables/focusable.strict.md) or [`strategy: "quick"`](../../data-tables/focusable.quick.md) to learn how HTML elements behave.


## Usage

```js
var sequence = ally.query.tabsequence({
  context: '.within-filter-selector',
  includeContext: true,
  strategy: "quick",
});
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement) | The scope of the DOM in which to search. The first element of a collection is used. |
| includeContext | boolean | `false` | Prepend the `context` element if it is focusable. |
| strategy | `"quick"`, `"strict"`, `"all"` | `"quick"` | The approach used to find elements. |

### Returns

Array of [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement).

### Throws


## Examples

TODO: create example for ally/query/first-tabbable


## Notes

See [`ally/is/focus-relevant`](../is/focus-relevant.md#Notes)

* **WARNING:** `<area>` elements are provided in DOM order they occur, not in DOM order of the `<img>` elements that use them, see [Sequential Navigation Focus Order for Image Maps](https://www.w3.org/Bugs/Public/show_bug.cgi?id=27787), [Blink 447289](https://code.google.com/p/chromium/issues/detail?id=447289), [WebKit 140259](https://bugs.webkit.org/show_bug.cgi?id=140259)


## Related Resources

* [`ally/is/tabbable`](../is/tabbable.md) is used to filter focusable elements
* [`ally/query/focusable`](focusable.md) is used to find focusable elements
* [`ally/query/first-tabbable`](tabbable.md) finds the first keyboard focusable element in a context
* [`ally/query/tabsequence`](tabbable.md) finds keyboard focusable elements in the [Sequential Navigation Focus Order](../../concepts.md#Sequential-Navigation-Focus-Order)

* [HTML5: The `tabindex` attribute](http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/query/tabsequence.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/query/tabsequence.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/query.tabsequence.test.js)

