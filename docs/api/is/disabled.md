---
layout: doc-api.html
---

# ally.is.disabled (`ally/is/disabled`)

Determines if an element is [`:disabled`](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Adisabled), i.e. not editable.


## Notes

* **NOTE:** While the name suggests the same thing may be going on, [`ally/focus/disable`](../focus/disable) does *not* set the formal disabled state on form elements, so `ally/is/disabled` will *not* return true for inerted elements.
* **NOTE:** The `<fieldset>` element can be disabled, inheriting the state onto all form elements it contains.
* **NOTE:** WebKit and Blink do not properly support disabling `<fieldset tabindex="0" disabled>` elements themself, while descendant form elements are properly disabled, see [Blink 453847](https://code.google.com/p/chromium/issues/detail?id=453847), [Webkit 141086](https://bugs.webkit.org/show_bug.cgi?id=141086)


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var element = document.getElementById('victim');
  var disabled = ally.is.disabled(element);
  // disabled is a boolean
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/is/disabled'
], function(isDisabled) {
  var element = document.getElementById('victim');
  var disabled = isDisabled(element);
  // disabled is a boolean
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/is/focusable`](focusable.md)
* [`ally/is/shadowed`](shadowed.md)
* [`ally/is/tabbable`](tabbable.md)
* [`ally/is/valid-area`](valid-area.md)
* [`ally/is/valid-tabindex`](valid-tabindex.md)
* [`ally/is/visible`](visible.md)
* [HTML5 4.13 Disabled Elements](http://www.w3.org/TR/html5/disabled-elements.html#disabled-elements)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/build-modules/src/is/disabled.js)
* [document source](https://github.com/medialize/ally.js/blob/build-modules/docs/api/is/disabled.md)


---

Back to the [API Documentation](../README.md).

