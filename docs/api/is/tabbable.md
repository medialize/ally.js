---
layout: doc-api.html
---

# ally.is.tabbable (`ally/is/tabbable`)

Determines if an element is considered keyboard focusable ("tabbable").


## Notes

See [`ally/query/tabbable`](../query/tabbable.md#Notes)


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var element = document.getElementById('victim');
  var tabbable = ally.is.tabbable(element);
  // tabbable is a boolean
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/is/tabbable'
], function(isTabbable) {
  var element = document.getElementById('victim');
  var tabbable = isTabbable(element);
  // tabbable is a boolean
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/is/disabled`](disabled.md)
* [`ally/is/focusable`](focusable.md)
* [`ally/is/shadowed`](shadowed.md)
* [`ally/is/valid-area`](valid-area.md)
* [`ally/is/valid-tabindex`](valid-tabindex.md)
* [`ally/is/visible`](visible.md)
* [`ally/query/tabbable`](../query/tabbable.md) is using this to provide a higher level API


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/build-modules/src/is/tabbable.js)
* [document source](https://github.com/medialize/ally.js/blob/build-modules/docs/api/is/tabbable.md)


---

Back to the [API Documentation](../README.md).

