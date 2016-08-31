---
layout: doc-api.html
tags: argument-list
---

# ally.element.focus

Shifts focus to an element if it does not already have focus.


## Description

The [`Element.focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) method is available on all [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement). Considering the following HTML, applying `focus()` to the `<span>` element does not do anything. `ally.element.focus()` can use [`ally.get.focusTarget`](../get/focus-target.md) to identify the nearest focusable ancestor, in this case the `<a>`, and shifts focus to that.

```html
<a href="#victim">
  <span>click me</span>
</a>
```

While `focus()` is available on `HTMLElement`, this is not necessarily true for [`SVGElement`](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement). Only Blink and WebKit expose the `focus()` method on SVG elements, Gecko, Trident and Edge do not. This will likely change once [SVG 2](http://www.w3.org/TR/SVG2/interact.html#Focus) is a thing. Until then `ally.element.focus()` tries to apply `HTMLElement.prototoype.focus` to `SVGElement`s. This only works for Internet Explorer 9 - 11, as Gecko and Edge actively prevent this.

Browsers [scroll the focused element into view](https://github.com/whatwg/html/issues/94), if it isn't already. However, this may interfere with widgets revealing content in an animated fashion. As there is no way to focus an element *without* the browser scrolling the element into view, `ally.element.focus()` provides the option `undoScrolling` to revert all scroll containers of the focused element to their state before the element got focus.

## Usage

```js
var element = document.getElementById('victim');
var result = ally.element.focus(element);
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| element | [`<selector>`](../concepts.md#Selector) | *required* | The Element to focus. First element of the collections is used. |
| options | [`<focus options>`](#Focus-options-argument) | `{defaultToAncestor: true}` | The Element to test. |

#### Focus options argument

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| defaultToAncestor | boolean | `false` | If the Element itself is not focusable the first focusable element in its ancestry is used instead. |
| undoScrolling | boolean | `false` | Revert the browser's native scrollIntoView upon focus behavior. |


### Returns

[`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) that received focus or `null` if focus could not be shifted.

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `element` argument does not resolve to an `HTMLElement`.


## Examples


## Changes

* Added in `v#master`.


## Notes


## Related resources

* [`ally.element.blur`](./blur.md) shifts focus away from an element if it currently has focus.
* [Managing focus in animated UI](../../tutorials/focusing-in-animated-ui.md)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/element/focus.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/element/focus.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/element.focus.test.js)
