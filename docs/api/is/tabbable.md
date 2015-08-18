---
layout: doc-api.html
---

# ally.is.tabbable (`ally/is/tabbable`)

Determines if an element is considered keyboard focusable ("tabbable").

The function does *not* verify if an element is focusable. It expects input that is considered focusable, so `isTabbable(element)` does *not always* equal `isFocusable(element) && isTabbable(element)`.

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) and [what ally.js considers focusable](../../data-tables/focusable.strict.md) to learn how HTML elements behave.


## Notes

See [`ally/is/focus-relevant`](./focus-relevant.md#Notes)

* **NOTE:** there is no way to feature detect if an element is tabbable or not. The `Element.tabIndex` property gives some indication, but ultimately user agent string sniffing is done internally to fix mismatches.


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

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/tabbable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/tabbable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/is.tabbable.test.js)


---

Back to the [API Documentation](../README.md).

