---
layout: doc-api.html
tags: module-only
---

# `ally/observe/interaction-type`

Observes user interaction method to distinguish pointer and keyboard actions

Observes keyboard-, pointer-, mouse- and touch-events so that a query for the current interaction type can be made at any time. For pointer interaction this observer is limited to pointer button down/up - move is not observed!


## Notes

* **NOTE:** When you find yourself using this module in your application or library code, we should talk about what you're trying to achieve and how we could do that as part of the library instead. Get in touch, [file an issue](https://github.com/medialize/ally.js/issues) explaining what you're trying to achieve!
* **NOTE:** This modules is only available to be consumed via ES6, AMD or CommonJS directly, it is *not* exposed in the production bundle `ally.min.js`.


## Demo

TODO: figure out how to integrate demo


## Usage

```js
require([
  'ally/observe/interactionType'
], function(observeInteractionType) {
  var handle = observeInteractionType();
  // stop observing
  handle.disengage();

  // query current interaction type
  var type = handle.get();
  // type is a an object with
  // { key: true, pointer: true }
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/observe/interaction-type.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/observe/interaction-type.md)


---

Back to the [API Documentation](../README.md).

