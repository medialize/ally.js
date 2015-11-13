---
layout: doc-api.html
tags: argument-options
---

# ally.query.focusable

Finds focusable elements in the DOM.


## Description

The query infrastructure provides two different implementations. The `"quick"` strategy uses [`document.querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) and is able to find *most* focusable elements. Elements that are made focusable by way of CSS properties cannot be queried that way, though. To allow finding *more* focusable elements, the `"strict"` strategy makes use of [TreeWalker](https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker) to "manually" iterate over the DOM. While the `"strict"` strategy provides more accurate results, it is slower than the `"quick"` strategy. The default strategy is `"quick"`.

The `"all"` strategy, used internally by [`ally.maintain.disabled`](../maintain/disabled.md) will find *all* the elements that are either [focus relevant](../is/focus-relevant.md) or [only tabbable](../is/only-tabbable.md) - including elements that *would* be focusable, were they not visually hidden or disabled.

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) to learn how HTML elements behave across browsers and what ally.js considers focusable in [`strategy: "strict"`](../../data-tables/focusable.strict.md) or [`strategy: "quick"`](../../data-tables/focusable.quick.md).


## Usage

```js
var elements = ally.query.focusable({
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

* **EXAMPLE:** [`ally.query.focusable` Example](./focusable.example.html)
* **EXAMPLE:** [`ally.query.tabbable` Example](./tabbable.example.html)


## Notes

See [`ally.is.focusRelevant`](../is/focus-relevant.md#Notes)

* **WARNING:** Any element marked `only-tabbable` in the [focusable browser compatibility tables](../../data-tables/focusable.md) is *not* identified by [`ally.is.focusable`](../is/focusable.md) or [`ally.is.tabbable`](../is/tabbable.md), only by [`ally.is.onlyTabbable`](../is/only-tabbable.md). That is because these elements cannot be interacted with via script, i.e. calling `element.focus()` does not have any effect.


## Related Resources

* [`ally.query.firstTabbable`](first-tabbable.md) finds the first keyboard focusable element
* [`ally.query.tabbable`](tabbable.md) finds keyboard focusable elements
* [`ally.query.tabsequence`](tabsequence.md) finds keyboard focusable elements in the [sequential navigation focus order](../../concepts.md#Sequential-Navigation-Focus-Order)
* [`ally.is.focusable`](../is/focusable.md) used to filter focusable elements

* [HTML5: The `tabindex` attribute](http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute)
* [HTML5: Focus Management](http://www.w3.org/TR/html5/editing.html#focus-management)

* [What Browsers Consider Focusable](../../data-tables/focusable.md)
* [What ally.js Considers Focusable in `strategy: "strict"`](../../data-tables/focusable.strict.md)
* [What ally.js Considers Focusable in `strategy: "quick"`](../../data-tables/focusable.quick.md)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/query/focusable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/query/focusable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/query.focusable.test.js)

