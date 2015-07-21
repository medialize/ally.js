---
layout: doc-api.html
---

# ally.query.tabbable (`ally/query/tabbable`)

Finds keyboard focusable ("tabbable") elements in the DOM.


## Notes

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
    // defaults to false
    includeContext: true,
  });
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/query/first-tabbable`](first-tabbable.md)
* [`ally/query/focusable`](focusable.md)
* [`ally/query/tabsequence`](tabsequence.md)
* [`ally/is/tabbable`](../is/tabbable.md) used to filter focusable elements


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/query/tabbable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/query/tabbable.md)


---

Back to the [API Documentation](../README.md).

