---
layout: doc-api.html
---

# ally.is.shadowed (`ally/is/shadowed`)

Determines if an element is the descendant of a `ShadowRoot`.


## Notes

Requires [Shadow DOM](http://caniuse.com/#feat=shadowdom) support


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var element = document.getElementById('victim');
  var shadowed = ally.is.shadowed(element);
  // shadowed is a boolean
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/is/shadowed'
], function(isShadowed) {
  var element = document.getElementById('victim');
  var shadowed = isShadowed(element);
  // shadowed is a boolean
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/is/disabled`](disabled.md)
* [`ally/is/focusable`](focusable.md)
* [`ally/is/tabbable`](tabbable.md)
* [`ally/is/valid-area`](valid-area.md)
* [`ally/is/valid-tabindex`](valid-tabindex.md)
* [`ally/is/visible`](visible.md)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/shadowed.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/shadowed.md)


---

Back to the [API Documentation](../README.md).

