---
layout: doc-api.html
apiModuleName: ally/query/tabsequence
apiBuiltName: ally.query.tabsequence
---

# ally.query.tabsequence (`ally/query/tabsequence`)

Finds keyboard focusable ("tabbable") elements in the DOM and returns them in the order calculated based on `tabindex` attribute values.

See [`ally/query/focusable`](./focusable.md) for an explanation on the different query strategies.

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) and what ally.js considers focusable in [`strategy: "strict"`](../../data-tables/focusable.strict.md) or [`strategy: "quick"`](../../data-tables/focusable.quick.md) to learn how HTML elements behave.


## Notes

See [`ally/is/focus-relevant`](../is/focus-relevant.md#Notes)

* **WARNING:** `<area>` elements are provided in DOM order they occur, not in DOM order of the `<img>` elements that use them, see [Sequential Navigation Focus Order for Image Maps](https://www.w3.org/Bugs/Public/show_bug.cgi?id=27787), [Blink 447289](https://code.google.com/p/chromium/issues/detail?id=447289), [WebKit 140259](https://bugs.webkit.org/show_bug.cgi?id=140259)


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var sequence = ally.query.tabsequence({
    // [optional] limit search to given DOM Element
    // defaults to document.documentElement
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '.within-filter-selector',
    // [optional] prepend the context DOM Element if it is keyboard focusable
    // NOTE: the context is NOT sorted, but simply prepended
    // defaults to false
    includeContext: true,
    // [optional] strategy used to find elements
    // can be "quick" or "strict"
    // defaults to "quick"
    strategy: "quick",
  });
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/query/tabsequence'
], function(queryTabsequence) {
  var sequence = queryTabsequence({
    // [optional] limit search to given DOM Element
    // defaults to document.documentElement
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '.within-filter-selector',
    // [optional] prepend the context DOM Element if it is keyboard focusable
    // NOTE: the context is NOT sorted, but simply prepended
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
* [`ally/query/focusable`](focusable.md)
* [`ally/query/tabbable`](tabbable.md)
* [`ally/is/tabbable`](../is/tabbable.md) used to filter focusable elements
* [`ally/util/sort-elements-by-tabindex`](../util.md#sort-elements-by-tabindex) used to order positive `[tabindex]` values
* [HTML5 7.4.1 The `tabindex` attribute](http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/query/tabsequence.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/query/tabsequence.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/query.tabsequence.test.js)


---

Back to the [API Documentation](../README.md).

