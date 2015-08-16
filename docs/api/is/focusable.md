---
layout: doc-api.html
---

# ally.is.focusable (`ally/is/focusable`)

Determines if an element is considered focusable.

An element is considered focusable if it is script focusable ([is/focus-relevant](./focus-relevant.md)), visible and not disabled.


## Notes

See [`ally/is/focus-relevant`](./focus-relevant.md#Notes)


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
* [`ally/is/focus-relevant`](focus-relevant.md) is used to identify elements that can receive focus
* [`ally/is/shadowed`](shadowed.md)
* [`ally/is/tabbable`](tabbable.md)
* [`ally/is/valid-area`](valid-area.md)
* [`ally/is/valid-tabindex`](valid-tabindex.md)
* [`ally/is/visible`](visible.md)
* [`ally/query/focusable`](../query/focusable.md) is using this to provide a higher level API


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/focusable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/focusable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/is.focusable.test.js)


---

Back to the [API Documentation](../README.md).

