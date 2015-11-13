---
layout: doc-api.html
tags: argument-options
---

# ally.query.tabbable

Finds keyboard focusable ("tabbable") elements in the DOM.


## Description

See [`ally.query.focusable`](./focusable.md) for an explanation on the different query strategies.

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) and what ally.js considers focusable in [`strategy: "strict"`](../../data-tables/focusable.strict.md) or [`strategy: "quick"`](../../data-tables/focusable.quick.md) to learn how HTML elements behave.


## Usage

```js
var elements = ally.query.tabbable({
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

See [`ally.is.focusRelevant`](../is/focus-relevant.md#Notes)


## Related Resources

* [`ally.is.tabbable`](../is/tabbable.md) is used to filter focusable elements
* [`ally.query.focusable`](focusable.md) is used to find focusable elements
* [`ally.query.firstTabbable`](tabbable.md) finds the first keyboard focusable element in a context
* [`ally.query.tabsequence`](tabbable.md) finds keyboard focusable elements in the [Sequential Navigation Focus Order](../../concepts.md#Sequential-Navigation-Focus-Order)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/query/tabbable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/query/tabbable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/query.tabbable.test.js)

