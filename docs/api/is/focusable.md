---
layout: doc-api.html
---

# ally.is.focusable (`ally/is/focusable`)

Determines if an element is considered focusable.


## Notes

See [`ally/query/focusable`](../query/focusable.md#Notes)


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var element = document.getElementById('victim');
  var focusable = ally.is.focusable(element);
  // focusable is a boolean
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/is/focusable'
], function(isFocusable) {
  var element = document.getElementById('victim');
  var focusable = isFocusable(element);
  // focusable is a boolean
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/is/disabled`](disabled.md)
* [`ally/is/shadowed`](shadowed.md)
* [`ally/is/tabbable`](tabbable.md)
* [`ally/is/valid-area`](valid-area.md)
* [`ally/is/valid-tabindex`](valid-tabindex.md)
* [`ally/is/visible`](visible.md)
* [`ally/query/focusable`](../query/focusable.md) is using this to provide a higher level API


## Contributor Notes

* [module source](https://github.com/medialize/ally.js/blob/build-modules/src/is/focusable.js)
* [document source](https://github.com/medialize/ally.js/blob/build-modules/docs/api/is/focusable.md)


---

Back to the [API Documentation](../README.md).

