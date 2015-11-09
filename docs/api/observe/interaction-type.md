---
layout: doc-api.html
tags: internal
apiModuleName: ally/observe/interaction-type
apiBuiltName: ally.observe.interactionType
---

# ally.observe.interactionType

Observes user interaction method to distinguish pointer and keyboard actions

Observes keyboard-, pointer-, mouse- and touch-events so that a query for the current interaction type can be made at any time. For pointer interaction this observer is limited to pointer button down/up - move is not observed!


## Notes

* **NOTE:** When you find yourself using this module in your application or library code, we should talk about what you're trying to achieve and how we could do that as part of the library instead. Get in touch, [file an issue](https://github.com/medialize/ally.js/issues) explaining what you're trying to achieve!


## Demo

* **HELP:** Feel free to create and submit a demo for this component.


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var handle = ally.observe.interactionType();
  // stop observing
  handle.disengage();

  // query current interaction type
  var type = handle.get();
  // type is a an object with
  // { key: true, pointer: true }
</script>
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/observe/interaction-type.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/observe/interaction-type.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/observe.interaction-type.test.js)

