---
layout: doc-api.html
tags: argument-list
---

# ally.is.focusRelevant

Determines if an element is considered focusable by script.


## Description

Consult the data tables [what browsers consider focusable](../../data-tables/focusable.md) and [what ally.js considers focusable](../../data-tables/focusable.strict.md) to learn how HTML elements behave.


## Usage

```js
var element = document.getElementById('victim');
var isFocusRelevant = ally.is.focusRelevant(element);
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| element | [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | *required* | The Element to test. |

### Returns

Boolean, `true` if the element is focus relevant.

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `element` argument is not of type `HTMLElement`.


## Examples


## Changes

* Since `v#master` the `<embed>` and `<keygen>` elements are considered focus-relevant, but *not* focusable.
* Since `v#master` the `element.prototype.matches` polyfill is re-applied to allow elements from other documents (e.g. from an iframe).
* Since `v#master` the `<object>` element properly distinguishes between SVG and SWF content.
* Since `v#master` elements using Flexbox layout are properly identified in IE10 and IE11.
* Since `v#master` the Shadow DOM hosts are considered focus-relevant, but *not* focusable.
* Since `v#master` scrollable containers are properly identified in Internet Explorer.
* Since `v#master` all `<area>` elements are considered focus-relevant.

## Notes

* **NOTE:** The `<body>` element may mistakenly considered focusable, because it is the default activeElement if no other element has focus - but it is not focusable, unless made so by adding the `tabindex` attribute.
* **NOTE:** Because the `<keygen>` element is poorly supported, practically never used and has seen [intent to deprecate](https://groups.google.com/a/chromium.org/forum/m/#!msg/blink-dev/pX5NbX0Xack/kmHsyMGJZAMJ), ally considers all `<keygen>` elements focus-relevant but *not* focusable.
* **NOTE:** Because the behavior of the `<embed>` element depends on the content type and browser plugin, ally considers all `<embed>` elements focus-relevant but *not* focusable.
* **WARNING:** Firefox and Internet Explorer cannot focus `SVGElement`s by script, thus no SVG element is considered focusable, see [Gecko 1116966](https://bugzilla.mozilla.org/show_bug.cgi?id=1116966)
* **WARNING:** WebKit and Blink make any `SVGElement` focusable that has a `focus` event listener attached, see [Blink 445798](https://code.google.com/p/chromium/issues/detail?id=445798), [WebKit 140024](https://bugs.webkit.org/show_bug.cgi?id=140024)


## Related resources

* [`ally.is.focusable`](focusable.md) tests focus-relevant elements if they're also visible and not disabled
* [`ally.is.tabbable`](tabbable.md) tests elements if they're keyboard focusable
* [`ally.is.validTabindex`](valid-tabindex.md) is used to verify the element's `tabindex` value is valid
* [`ally.query.focusable`](../query/focusable.md) finds focusable elements in the DOM

* [What Browsers Consider Focusable](../../data-tables/focusable.md)
* [What ally.js Considers Focusable](../../data-tables/focusable.strict.md)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/focus-relevant.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/focus-relevant.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/is.focus-relevant.test.js)

