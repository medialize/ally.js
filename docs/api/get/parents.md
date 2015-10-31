---
layout: doc-api.html
tags: module-only
apiModuleName: ally/get/parents
apiBuiltName:
---

# `ally/get/parents`

Identifies the parent elements

Like [`jQuery.parents()`](http://api.jquery.com/parents/), except `ally/get/parents` doesn't have a filter arguments.

The returned list is sorted as follows `[element, element.parent, element.parent.parent, …]`


## Notes


## Demo

TODO: figure out how to integrate demo


## Usage

```js
require([
  'ally/get/parents'
], function(getParents) {
  var elements = getParents({
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '#element-to-start-from',
  });
  // elements is an array of HTMLElement and looks like
  // [context, context.parent, context.parent.parent, …]
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

