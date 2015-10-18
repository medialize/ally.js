---
layout: doc-api.html
---

# ally.get.insignificantBranches (`ally/get/insignificant-branches`)

Identifies all the branches of the DOM that do *not* contain any of the target elements

The insignificant branches contain *all* first nodes (looking from the root `context`) that do not contain the target elements (`filter`). For the following tree, the insignificant branches of `"#target"` are `["#sibling", "#uncle-1", "#uncle-2"]`. The insignificant branches of `["#target", "#target-2"]` are `["#sibling", "#uncle-1", "#cousin-2"]`:

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
  <div id="target-2"></div>
</div>
```

## Notes


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var elements = ally.get.insignificantBranches({
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: document.documentElement,
    // the significant elements to exclude from the search
    filter: '#target',
  });
  // elements is an array of HTMLElement
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/get/insignificant-branches'
], function(getInsignificantBranches) {
  var elements = getInsignificantBranches({
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: document.documentElement,
    // the significant elements to exclude from the search
    filter: '#target',
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

* [module source](https://github.com/medialize/ally.js/blob/master/src/get/insignificant-branches.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/get/insignificant-branches.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/get.insignificant-branches.test.js)


---

Back to the [API Documentation](../README.md).

