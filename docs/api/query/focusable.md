---
layout: doc-api.html
---

# ally.query.focusable (`ally/query/focusable`)

Finds focusable elements in the DOM.

The query infrastructure provides two different implementations. The `"quick"` strategy uses [`document.querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) and is able to find *most* focusable elements. Elements that are made focusable by way of CSS properties cannot be queried that way, though. To allow finding *more* focusable elements, the `"strict"` strategy makes use of [TreeWalker](https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker) to "manually" iterate over the DOM. While the `"strict"` strategy provides more accurate results, it is slower than the `"quick"` strategy. The default strategy is `"quick"`.

The `"all"` strategy, used internally by [`ally/focus/disable`](../focus/disable.md) will find *all* the elements that are either [focus relevant](./focus-relevant.md) or [only tabbable](./only-tabbable.md) - including elements that *would* be focusable, were they not visually hidden or disabled.

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) to learn how HTML elements behave across browsers and what ally.js considers focusable in [`strategy: "strict"`](../../data-tables/focusable.strict.md) or [`strategy: "quick"`](../../data-tables/focusable.quick.md).


## Notes

See [`ally/is/focus-relevant`](../is/focus-relevant.md#Notes)

* **WARNING:** Any element marked `only-tabbable` in the [focusable browser compatibility tables](../../data-tables/focusable.md) is *not* identified by [`is/focusable`](../is/focusable.md) or [`is/tabbable`](../is/tabbable.md), only by [`is/only-tabbable`](../is/only-focusable.md). That is because these elements cannot be interacted with via script, i.e. calling `element.focus()` does not have any effect.


## Demo

TODO: figure out how to integrate demo

## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var element = ally.query.focusable({
    // [optional] limit search to given DOM Element
    // defaults to document.documentElement
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '.within-filter-selector',
    // [optional] prepend the context DOM Element if it is focusable
    // defaults to false
    includeContext: true,
    // [optional] strategy used to find elements
    // can be "quick" or "strict" or "all"
    // defaults to "quick"
    strategy: "quick",
  });
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/query/focusable'
], function(queryFocusable) {
  var element = queryFocusable({
    // [optional] limit search to given DOM Element
    // defaults to document.documentElement
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '.within-filter-selector',
    // [optional] prepend the context DOM Element if it is focusable
    // defaults to false
    includeContext: true,
    // [optional] strategy used to find elements
    // can be "quick" or "strict"
    // defaults to "quick"
    strategy: "quick",
  });
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/query/first-tabbable`](first-tabbable.md)
* [`ally/query/tabbable`](tabbable.md)
* [`ally/query/tabsequence`](tabsequence.md)
* [`ally/is/focusable`](../is/focusable.md) used to filter focusable elements
* [HTML5 7.4.1 The `tabindex` attribute](http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute)
* [HTML5 7.4.2 Focus Management](http://www.w3.org/TR/html5/editing.html#focus-management)
* [Which Elements Are Focusable, which are Tabbable?](http://medialize.github.io/ally.js/tests/focusable/table.html#browser-support-tabbable)
* [Which Elements Are Considered Focusable By ally.js?](http://medialize.github.io/ally.js/tests/focusable/table.html#javascript-support)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/query/focusable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/query/focusable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/query.focusable.test.js)


---

Back to the [API Documentation](../README.md).

