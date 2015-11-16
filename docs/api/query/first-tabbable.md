---
layout: doc-api.html
tags: argument-options
---

# ally.query.firstTabbable

Finds the first keyboard focusable ("tabbable") element in the DOM.


## Description

See [`ally.query.focusable`](./focusable.md) for an explanation on the different query strategies.

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) and what ally.js considers focusable in [`strategy: "strict"`](../../data-tables/focusable.strict.md) or [`strategy: "quick"`](../../data-tables/focusable.quick.md) to learn how HTML elements behave.


## Usage

```js
var element = ally.query.firstTabbable({
  context: '.within-filter-selector',
  defaultToContext: true,
  strategy: "quick",
});
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement) | The scope of the DOM in which to search. The first element of a collection is used. |
| ignoreAutofocus | boolean | `false` | Do not give elements with `autofocs` attribute precedence. |
| defaultToContext | boolean | `false` | Return the `context` element if it is focusable and no other keyboard focusable element could be found. |
| strategy | `"quick"`, `"strict"`, `"all"` | `"quick"` | The approach used to find elements. |

### Returns

[`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) that is the first keyboard focusable element in the given `context`.

### Throws


## Examples

* **EXAMPLE:** [`ally.query.firstTabbable` Example](./first-tabbable.example.html)
* **EXAMPLE:** [`ally.query.firstTabbable` ignoring autofocus Example](./first-tabbable.example-2.html)


## Notes

See [`ally.is.focusRelevant`](../is/focus-relevant.md#Notes)

* **NOTE:** Google Chrome's `<dialog>` implementation will focus the first keyboard focusable element, even if it has `[tabindex="1"]`, ally.js does not.
* **WARNING:** Elements with a positive `tabindex` attribute (e.g. `[tabindex="123"]`) are ignored.


## Related resources

* [`ally.query.tabbable`](tabbable.md) is used to find keyboard focusable elements
* [`ally.query.tabsequence`](tabbable.md) finds keyboard focusable elements in the [Sequential Navigation Focus Order](../../concepts.md#Sequential-navigation-focus-order)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/query/first-tabbable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/query/first-tabbable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/query.first-tabbable.test.js)

