---
layout: doc-api.html
apiModuleName: ally/query/tabbable
apiBuiltName: ally.query.tabbable
---

# ally.query.tabbable

Finds keyboard focusable ("tabbable") elements in the DOM.

See [`ally/query/focusable`](./focusable.md) for an explanation on the different query strategies.

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) and what ally.js considers focusable in [`strategy: "strict"`](../../data-tables/focusable.strict.md) or [`strategy: "quick"`](../../data-tables/focusable.quick.md) to learn how HTML elements behave.


## Notes

See [`ally/is/focus-relevant`](../is/focus-relevant.md#Notes)


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
    // [optional] strategy used to find elements
    // can be "quick" or "strict"
    // defaults to "quick"
    strategy: "quick",
  });
</script>
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
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/query.tabbable.test.js)


