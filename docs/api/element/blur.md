---
layout: doc-api.html
tags: argument-list
---

# ally.element.blur

Shifts focus away from an element if it currently has focus.


## Description

The [`blur()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/blur) method is available on all [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement). But this is not necessarily true for [`SVGElement`](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement). Only Blink and WebKit expose the `blur()` method on SVG elements, Gecko, Trident and Edge do not. This will likely change once [SVG 2](https://www.w3.org/TR/SVG2/interact.html#Focus) is a thing. Until then `ally.element.blur()` tries to apply `HTMLElement.prototoype.blur` to `SVGElement`s. This only works for Internet Explorer 9 - 11, as Gecko and Edge actively prevent this.

According to [jQuery Bug 9420](https://bugs.jqueryui.com/ticket/9420) calling `blur()` on the `body` element may make the browser window lose focus. `ally.element.blur()` guards against this.


## Usage

```js
var element = document.getElementById('victim');
var result = ally.element.blur(element);
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| element | [`<selector>`](../concepts.md#selector) | *required* | The Element to blur. First element of the collections is used. |

### Returns

[`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) that received focus (usually `document.body`) or `null` if focus could not be shifted.

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `element` argument does not resolve to an `HTMLElement`.


## Examples


## Changes

* Added in `v1.3.0`.


## Notes


## Related resources

* [`ally.element.focus`](./focus.md) shifts focus to an element if it does not already have focus.


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/element/blur.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/element/blur.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/element.blur.test.js)
