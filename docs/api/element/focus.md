---
layout: doc-api.html
tags: argument-list
---

# ally.element.focus

Shifts focus to an element if it does not already have focus.


## Description

The [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) method is available on all [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement). Considering the following HTML, applying `focus()` to the `<span>` element does not do anything. `ally.element.focus()` uses [`ally.get.focusTarget`](../get/focus-target.md) to identify the nearest focusable ancestor, in this case the `<a>`, and shifts focus to that.

```html
<a href="#victim">
  <span>click me</span>
</a>
```

While `focus()` is available on `HTMLElement`, this is not necessarily true for [`SVGElement`](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement). Only Blink and WebKit expose the `focus()` method on SVG elements, Gecko, Trident and Edge do not. This will likely change once [SVG 2](http://www.w3.org/TR/SVG2/interact.html#Focus) is a thing. Until then `ally.element.focus()` tries to apply `HTMLElement.prototoype.focus` to `SVGElement`s. This only works for Internet Explorer 9 - 11, as Gecko and Edge actively prevent this.


## Usage

```js
var element = document.getElementById('victim');
var result = ally.element.focus(element);
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| element | [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | *required* | The Element to focus |

### Returns

[`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) that received focus or `null` if focus could not be shifted.

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `element` argument is not of type `HTMLElement`.


## Examples


## Changes

* Added in `v#master`.


## Notes


## Related resources


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/element/focus.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/element/focus.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/element.focus.test.js)
