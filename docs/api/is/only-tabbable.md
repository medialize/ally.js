---
layout: doc-api.html
---

# ally.is.onlyTabbable (`ally/is/only-tabbable`)

Determines if an element is considered tabbable and not focusable.

An element is considered tabbable and not focusable if the element is part of the document's focus navigation sequence, but cannot be focused by script.


## Notes



## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var element = document.getElementById('victim');
  var onlyTabbable = ally.is.onlyTabbable(element);
  // onlyTabbable is a boolean
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/is/only-tabbable'
], function(isOnlyTabbable) {
  var element = document.getElementById('victim');
  var onlyTabbable = isOnlyTabbable(element);
  // onlyTabbable is a boolean
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/is/disabled`](disabled.md)
* [`ally/is/focus-relevant`](focus-relevant.md) is used to identify elements that can receive focus
* [`ally/is/focusable`](focusable.md)
* [`ally/is/shadowed`](shadowed.md)
* [`ally/is/tabbable`](tabbable.md)
* [`ally/is/valid-area`](valid-area.md)
* [`ally/is/valid-tabindex`](valid-tabindex.md)
* [`ally/is/visible`](visible.md)
* [`ally/query/focusable`](../query/focusable.md) is using this to provide a higher level API


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/only-tabbable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/only-tabbable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/is.only-tabbable.test.js)


---

Back to the [API Documentation](../README.md).

