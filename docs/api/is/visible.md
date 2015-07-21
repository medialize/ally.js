---
layout: doc-api.html
---

# ally.is.visible (`ally/is/visible`)

Determines if an element is rendered.

An element must be visible ([`ally/is/visible`](visible.md)) and may not be disabled ([`ally/is/disabled`](disabled.md)) to be considered focusable.


## Notes


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var element = document.getElementById('victim');
  var visible = ally.is.visible(element);
  // visible is a boolean
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/is/visible'
], function(isVisible) {
  var element = document.getElementById('victim');
  var visible = isVisible(element);
  // visible is a boolean
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/is/disabled`](disabled.md)
* [`ally/is/focusable`](focusable.md)
* [`ally/is/shadowed`](shadowed.md)
* [`ally/is/tabbable`](tabbable.md)
* [`ally/is/valid-area`](valid-area.md)
* [`ally/is/valid-tabindex`](valid-tabindex.md)
* [`ally/util/visible-area`](../util.md#Calculate-An-Element-s-Visible-Area) can be used to determine how much of an element is actually visible in the viewport


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/build-modules/src/is/visible.js)
* [document source](https://github.com/medialize/ally.js/blob/build-modules/docs/api/is/visible.md)


---

Back to the [API Documentation](../README.md).

