---
layout: doc-api.html
---

# ally.is.validTabindex (`ally/is/valid-tabindex`)

Determines if an element's `tabindex` attribute value is sound


## Notes

* empty tabindex `[tabindex=""]` parsed and exposed as `[tabindex="-32768"]` - [Trident 1072965](https://connect.microsoft.com/IE/feedback/details/1072965)
* invalid `tabindex` value makes element focusable - [Gecko 1128054](https://bugzilla.mozilla.org/show_bug.cgi?id=1128054)
* Gecko, Blink and WebKit consider `[tabindex="3x"]` valid

## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var element = document.getElementById('victim');
  var validTabindex = ally.is.validTabindex(element);
  // validTabindex is a boolean
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/is/valid-tabindex'
], function(isValidTabindex) {
  var element = document.getElementById('victim');
  var validTabindex = isValidTabindex(element);
  // validTabindex is a boolean
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
* [`ally/is/visible`](visible.md)
* [HTML5 7.4.1 The `tabindex` attribute](http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/valid-tabindex.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/valid-tabindex.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/docs/test/is.valid-tabindex.test.js)


---

Back to the [API Documentation](../README.md).

