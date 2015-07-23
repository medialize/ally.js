---
layout: doc-api.html
tags: module-only
---

# `ally/get/parents`

Identifies the parent elements

Like [`jQuery.parents()`](http://api.jquery.com/parents/), except `ally/get/parents` doesn't have a filter arguments.


## Notes

* **NOTE:** When you find yourself using this module in your application or library code, we should talk about what you're trying to achieve and how we could do that as part of the library instead. Get in touch, [file an issue](https://github.com/medialize/ally.js/issues) explaining what you're trying to achieve!
* **NOTE:** This modules is only available to be consumed via ES6, AMD or CommonJS directly, it is *not* exposed in the production bundle `ally.min.js`.


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
  // elements is an array of HTMLElement
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/get/active-element`](active-element.md)
* [`ally/get/focus-target`](focus-target.md)
* [`ally/get/parents`](parents.md)
* [`ally/get/shadow-host-parents`](shadow-host-parents.md)
* [`ally/get/shadow-host`](shadow-host.md)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/get/parents.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/get/parents.md)


---

Back to the [API Documentation](../README.md).

