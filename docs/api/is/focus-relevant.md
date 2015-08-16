---
layout: doc-api.html
---

# ally.is.focusRelevant (`ally/is/focus-relevant`)

Determines if an element is considered focusable by script.


## Notes

* **NOTE:** In WebKit and Blink `SVGElements` that have been made focusable by adding a focus event listener are not identified as focusable
* **NOTE:** Because the `<keygen>` element is poorly supported, practically never used and has seen [intent to deprecate](https://groups.google.com/a/chromium.org/forum/m/#!msg/blink-dev/pX5NbX0Xack/kmHsyMGJZAMJ), it is *not* considered focusable by ally.js.


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var element = document.getElementById('victim');
  var focusRelevant = ally.is.focusRelevant(element);
  // focusRelevant is a boolean
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/is/focus-relevant'
], function(isFocusRelevant) {
  var element = document.getElementById('victim');
  var focusRelevant = isFocusRelevant(element);
  // focusRelevant is a boolean
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/is/disabled`](disabled.md)
* [`ally/is/focusable`](focusable.md) is using this to identify what's focusable before validating further constraints
* [`ally/is/shadowed`](shadowed.md)
* [`ally/is/tabbable`](tabbable.md)
* [`ally/is/valid-area`](valid-area.md)
* [`ally/is/valid-tabindex`](valid-tabindex.md)
* [`ally/is/visible`](visible.md)
* [`ally/query/focusable`](../query/focusable.md) is using this to provide a higher level API


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/focus-relevant.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/focus-relevant.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/is.focus-relevant.test.js)


---

Back to the [API Documentation](../README.md).

