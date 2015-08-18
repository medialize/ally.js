---
layout: doc-api.html
---

# ally.query.firstTabbable (`ally/query/first-tabbable`)

Finds the first keyboard focusable ("tabbable") element in the DOM.

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) and what ally.js considers focusable in [`strategy: "strict"`](../../data-tables/focusable.strict.md) or [`strategy: "quick"`](../../data-tables/focusable.quick.md) to learn how HTML elements behave.


## Notes

See [`ally/is/focus-relevant`](../is/focus-relevant.md#Notes)

* **NOTE:** Google Chrome's `<dialog>` implementation will focus the first keyboard focusable element, even if it has `[tabindex="1"]`, ally.js does not.
* **WARNING:** Elements with a positive `tabindex` attribute (e.g. `[tabindex="123"]`) are ignored.


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var element = ally.query.firstTabbable({
    // [optional] limit search to given DOM Element
    // defaults to document.body
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '.within-filter-selector',
    // [optional] do not try to find the first element
    // with autofocs regardless of its DOM position
    // defaults to false
    ignoreAutofocus: true,
    // [optional] return context DOM Element if it is focusable
    // and no other keyboard focusable element could be found
    // defaults to false
    defaultToContext: true,
  });
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/query/first-tabbable'
], function(queryFirstTabbable) {
  var element = queryFirstTabbable({
    // [optional] limit search to given DOM Element
    // defaults to document.body
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '.within-filter-selector',
    // [optional] do not try to find the first element
    // with autofocs regardless of its DOM position
    // defaults to false
    ignoreAutofocus: true,
    // [optional] return context DOM Element if it is focusable
    // and no other keyboard focusable element could be found
    // defaults to false
    defaultToContext: true,
  });
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/query/focusable`](focusable.md)
* [`ally/query/tabbable`](tabbable.md)
* [`ally/query/tabsequence`](tabsequence.md)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/query/first-tabbable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/query/first-tabbable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/query.first-tabbable.test.js)


---

Back to the [API Documentation](../README.md).

