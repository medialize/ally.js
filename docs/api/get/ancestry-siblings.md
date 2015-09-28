---
layout: doc-api.html
---

# ally.get.ancestrySiblings (`ally/get/ancestry-siblings`)

Identifies the sibling elements of all parent elements

The ancestry siblings contain *all* first nodes (looking from the root `html`) that do not contain the target element. For the following tree, the ancestry siblings of `"#target"` are `["#sibling", "#uncle-1", "#uncle-2"]`:

```html
<div id="uncle-1">
  <div id="cousin-1"></div>
</div>
<div id="parent">
  <div id="target"></div>
  <div id="sibling"></div>
</div>
<div id="uncle-2">
  <div id="cousin-2"></div>
</div>
```


## Notes


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var elements = ally.get.ancestrySiblings({
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '#element-to-start-from',
  });
  // elements is an array of HTMLElement
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/get/ancestry-siblings'
], function(getAncestrySiblings) {
  var elements = getAncestrySiblings({
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '#element-to-start-from',
  });
  // elements is an array of HTMLElement
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/get/active-elements`](active-elements.md)
* [`ally/get/focus-target`](focus-target.md)
* [`ally/get/parents`](parents.md)
* [`ally/get/shadow-host-parents`](shadow-host-parents.md)
* [`ally/get/shadow-host`](shadow-host.md)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/get/parents.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/get/parents.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/get.parents.test.js)


---

Back to the [API Documentation](../README.md).

