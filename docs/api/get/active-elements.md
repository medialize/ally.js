---
layout: doc-api.html
tags: module-only, shadow-dom
---

# `ally/get/active-elements`

Identifies the `ShadowHost` ancestry of the active element


## Notes

* **NOTE:** When you find yourself using this module in your application or library code, we should talk about what you're trying to achieve and how we could do that as part of the library instead. Get in touch, [file an issue](https://github.com/medialize/ally.js/issues) explaining what you're trying to achieve!
* **NOTE:** This modules is only available to be consumed via ES6, AMD or CommonJS directly, it is *not* exposed in the production bundle `ally.min.js`.


## Demo

TODO: figure out how to integrate demo


## Usage

```js
require([
  'ally/get/active-elements'
], function(getActiveElements) {
  var elements = getActiveElements();
  // elements is an array of HTMLElement
  // elements[0] points to the actual active element (even within a ShadowRoot)
  // [0+n] is the hierarchy of ShadowHosts with [length -1] being the top most shadow-host
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/get/focus-target`](focus-target.md)
* [`ally/get/parents`](parents.md)
* [`ally/get/shadow-host-parents`](shadow-host-parents.md)
* [`ally/get/shadow-host`](shadow-host.md)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/get/active-elements.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/get/active-elements.md)


---

Back to the [API Documentation](../README.md).

