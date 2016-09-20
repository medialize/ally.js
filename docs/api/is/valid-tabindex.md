---
layout: doc-api.html
tags: argument-list
---

# ally.is.validTabindex

Determines if an element's `tabindex` attribute value is sound


## Description


## Usage

```js
var element = document.getElementById('victim');
var isValidTabindex = ally.is.validTabindex(element);
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| element | [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | *required* | The Element to test. |

### Returns

Boolean, `true` if the element is has a valid tabindex attribute specified.

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `element` argument is not of type `HTMLElement`.


## Examples


## Notes

* **NOTE:** empty tabindex `[tabindex=""]` parsed and exposed as `[tabindex="-32768"]` - [Trident 1072965](https://connect.microsoft.com/IE/feedback/details/1072965)
* **WARNING:** invalid `tabindex` value makes element focusable - [Gecko 1128054](https://bugzilla.mozilla.org/show_bug.cgi?id=1128054)
* **WARNING:** Gecko, Blink and WebKit consider `[tabindex="3x"]` valid
* **WARNING:** only Blink and WebKit respect the `tabindex` attribute on SVGElements (defined in [SVG 2](https://svgwg.org/svg2-draft/access.html#AccessibilityAndSVG))


## Related resources

* [HTML5: The `tabindex` attribute](https://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/valid-tabindex.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/valid-tabindex.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/docs/test/is.valid-tabindex.test.js)

