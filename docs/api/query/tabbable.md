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
  strategy: 'quick',
});
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#selector) | [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement) | The scope of the DOM in which to search. The first element of a collection is used. |
| includeContext | boolean | `false` | Prepend the `context` element if it is focusable. |
| includeOnlyTabbable | boolean | `false` | Include elements that would otherwise be ignored because they're considered only tabbable, |
| strategy | `"quick"`, `"strict"`, `"all"` | `"quick"` | The approach used to find elements. |

### Returns

Array of [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement).

### Throws


## Examples

@@@example /api/query/focusable.example.html
### focusable example
@@@

@@@example /api/query/tabbable.example.html
### tabbable example
@@@


## Changes

* Since `v1.1.0` the option `includeOnlyTabbable` allows to skip the internal filter preventing this module from returning elements that cannot be focused by script.


## Notes

See [`ally.is.focusRelevant`](../is/focus-relevant.md#notes)


## Related resources

* [`ally.is.tabbable`](../is/tabbable.md) is used to filter focusable elements
* [`ally.query.focusable`](focusable.md) is used to find focusable elements
* [`ally.query.firstTabbable`](first-tabbable.md) finds the first keyboard focusable element in a context
* [`ally.query.tabsequence`](tabbable.md) finds keyboard focusable elements in [Sequential Navigation Focus Order](../../concepts.md#sequential-navigation-focus-order)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/query/tabbable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/query/tabbable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/query.tabbable.test.js)

