---
layout: doc-api.html
tags: shadow-dom, svg
apiModuleName: ally/style/focus-within
apiBuiltName: ally.style.focusWithin
---

# ally.style.focusWithin (`ally/style/focus-within`)

Polyfill the CSS Selectors Level 4 pseudo-class [`:focus-within`](http://dev.w3.org/csswg/selectors-4/#the-focus-within-pseudo)

Since we cannot (easily) shim pseudo-classes, this function applies the class `.ally-focus-within` to all the elements that would match `:focus-within`. This method pierces the ShadowDOM and works with SVG.

This module allows the document to style `:focus` as follows:

```css
body :focus {
  /* default styling in case JS broke */
  background: yellow;
}

body .ally-focus-within {
  /* styling parent elements of :focus */
  background: rgba(0, 0, 0, 0.3);
}

body .ally-focus-within:focus {
  /* styling :focus itself */
  background: red;
}
```

The `:focus-within` polyfill also works within the Shadow DOM, allowing the document styles to descend into the dark:

```css
body >>> .ally-focus-within {
  /* styling parent elements of :focus */
  background: rgba(0, 0, 0, 0.3);
}
body >>> .ally-focus-within:focus {
  /* styling :focus itself */
  background: red;
}

/* older shadow-piercing-combinator notation */
body /deep/ .ally-focus-within {
  /* styling parent elements of :focus */
  background: rgba(0, 0, 0, 0.3);
}
```


## Notes

* **NOTE:** In Firefox the [setting](about:config) `dom.webcomponents.enabled` needs to be set to `true` to enable ShadowDOM support.
* **NOTE:** Firefox 34 does not expose `ShadowRoot.host`, coupled with `document.activeElement` pointing to the wrong element, we cannot find the first ShadowHost and can thus not apply `focus-within` properly. The `ShadowRoot.host` issue has been fixed in Firefox 37 (at the latest).
* **NOTE:** The focus-within class is added asynchronously in Shadow DOM, but synchronously for the document.


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  // engage focus within style for the entire document
  var handle = ally.style.focusWithin();
  // disengage focus source within
  handle.disengage();
</script>
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/style/focus-source`](focus-source.md)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/style/focus-within.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/style/focus-within.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/style.focus-within.test.js)


---

Back to the [API Documentation](../README.md).

