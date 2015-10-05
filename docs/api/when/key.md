---
layout: doc-api.html
---

# ally.when.key (`ally/when/key`)

Executes a callback when a given key has been pressed.


## Notes


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  // wait until key is pressed
  var handle = ally.when.key({

  });
  // abort waiting for key to be pressed
  handle.disengage();
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/when/key'
], function(whenKey) {
  // wait until key is pressed
  var handle = whenKey({

  });
  // abort waiting for key to be pressed
  handle.disengage();
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/when/focusable`](focusable.md)
* [`ally/when/visible-area`](visible-area.md)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/when/key.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/when/key.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/when.key.test.js)


---

Back to the [API Documentation](../README.md).

