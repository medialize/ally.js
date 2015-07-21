---
layout: doc-api.html
---

# ally.query.firstTabbable (`ally/query/first-tabbable`)

Finds the first keyboard focusable ("tabbable") element in the DOM.


## Notes

* **NOTE:** Google Chrome's `<dialog>` implementation will focus the first keyboard focusable element, even if it has `[tabindex="1"]`.
* **WARNING:** Elements with a positive `tabindex` attribute (e.g. `[tabindex="123"]`) are ignored. Since `[tabindex="1"]` is considered bad practice we'll ignore it until someone complains.
* **WARNING:** Any element not found focusable by [`ally/query/focusable`](focusable.md#Notes) is not found here either

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

* [module source](https://github.com/medialize/ally.js/blob/build-modules/src/query/first-tabbable.js)
* [document source](https://github.com/medialize/ally.js/blob/build-modules/docs/api/query/first-tabbable.md)


---

Back to the [API Documentation](../README.md).

