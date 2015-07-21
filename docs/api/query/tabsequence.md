---
layout: doc-api.html
---

# ally.query.tabbable (`ally/query/tabbable`)

Finds keyboard focusable ("tabbable") elements in the DOM and returns them in the order calculated based on `tabindex` attribute values.


## Notes

* **WARNING:** `<area>` elements are provided in DOM order they occur, not in DOM order of the `<img>` elements that use them, see [Sequential Navigation Focus Order for Image Maps](https://www.w3.org/Bugs/Public/show_bug.cgi?id=27787), [Blink 447289](https://code.google.com/p/chromium/issues/detail?id=447289), [WebKit 140259](https://bugs.webkit.org/show_bug.cgi?id=140259)
* **WARNING:** Any element not found focusable by [`ally/query/focusable`](focusable.md#Notes) is not found here either


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var element = ally.query.tabbable({
    // [optional] limit search to given DOM Element
    // defaults to document.documentElement
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '.within-filter-selector',
    // [optional] prepend the context DOM Element if it is keyboard focusable
    // NOTE: the context is NOT sorted, but simply prepended
    // defaults to false
    includeContext: true,
  });
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/query/tabbable'
], function(queryTabbable) {
  var element = queryTabbable({
    // [optional] limit search to given DOM Element
    // defaults to document.documentElement
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '.within-filter-selector',
    // [optional] prepend the context DOM Element if it is keyboard focusable
    // NOTE: the context is NOT sorted, but simply prepended
    // defaults to false
    includeContext: true,
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


---

Back to the [API Documentation](../README.md).

