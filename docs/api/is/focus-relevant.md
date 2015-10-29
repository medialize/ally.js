---
layout: doc-api.html
apiModuleName: ally/is/focus-relevant
apiBuiltName: ally.is.focusRelevant
---

# ally.is.focusRelevant (`ally/is/focus-relevant`)

Determines if an element is considered focusable by script.

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) and [what ally.js considers focusable](../../data-tables/focusable.strict.md) to learn how HTML elements behave.


## Notes

* **NOTE:** The `<body>` element is generally considered focusable, because it is the default activeElement if no other element has focus.
* **NOTE:** Because the `<keygen>` element is poorly supported, practically never used and has seen [intent to deprecate](https://groups.google.com/a/chromium.org/forum/m/#!msg/blink-dev/pX5NbX0Xack/kmHsyMGJZAMJ), it is *not* considered focusable by ally.js.
* **WARNING:** Firefox and Internet Explorer cannot focus `SVGElement`s by script, thus no SVG element is considered focusable, see [Gecko 1116966](https://bugzilla.mozilla.org/show_bug.cgi?id=1116966)
* **WARNING:** WebKit and Blink make any `SVGElement` focusable that has a `focus` event listener attached, see [Blink 445798](https://code.google.com/p/chromium/issues/detail?id=445798), [WebKit 140024](https://bugs.webkit.org/show_bug.cgi?id=140024)


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

