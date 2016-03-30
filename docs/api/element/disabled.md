---
layout: doc-api.html
tags: argument-list, svg
---

# ally.element.disabled

Makes an element inert, i.e. not editable.


## Description

HTML knows the [`:disabled`](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Adisabled) state for form elements, but lacks something similar for all the other interactive elements. This utility makes a form of this convenient state available to every element.

Elements that were made inert by [`ally.element.disabled`](#ally.element.disabled) can be identified in the DOM by the attribute `[data-ally-disabled="true"]` to align with styling of other `:disabled` elements.

The following things are done in order to make an element inert:

* adding `tabindex="-1"` attribute to remove element from document's focus navigation sequence
* adding the `focusable="false"` attribute on `SVGElement`
* removing the `controls` attribute from `<audio>` and `<video>` elements
* overwriting `element.focus()` to prevent focusing the element by script
* adding the CSS property `pointer-events: none;` to prevent any interaction from mouse and touch
* adding `aria-disabled="true"` to inform the AccessibilityTree of the element's state


## Usage

```js
var element = document.getElementById('victim');
// disable the element
ally.element.disabled(element, true);
// enable the element
ally.element.disabled(element, false);
// check the elements disabled state
var isDisabled = ally.element.disabled(element);
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| element | [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | *required* | The Element to modify |
| state | boolean, `undefined` | `undefined` | `true` to disable the element, `false` |


### Returns

* [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) if the `state` argument is a boolean.
* Boolean if the `state` argument is `undefined`, being `true` if the element is disabled, `false` if not.

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `element` argument is not of type `HTMLElement`.


## Examples

* **EXAMPLE:** [`ally.element.disabled` Example](./disabled.example.html)


## Changes

* As of `v#master` `<a xlink:href="…">` is demoted to `<a>` in order to remove the element from the document's tabbing order in Firefox.


## Notes

* **WARNING:** Internet Explorer 10 - 11 leave a few disabled elements focusable and thus editable to the mouse, but not keyboard focusable [Trident 962368](https://connect.microsoft.com/IE/feedbackdetail/view/962368), [Trident 817488](https://connect.microsoft.com/IE/feedbackdetail/view/817488) (ally.js does not fix that). One can prevent this wrong behavior by adding `:disabled { pointer-events: none; }`.
* **NOTE:** In Google Chrome `<audio controls>` and `<video controls>` elements are made inert by removing the `controls` attribute - [Blink 512133](https://code.google.com/p/chromium/issues/detail?id=512133)


## Related resources

* [`ally.is.disabled`](../is/disabled.md) is able to identify elements disabled by [`ally.element.disabled`](#ally.element.disabled)
* [`ally.maintain.disabled`](../maintain/disabled.md) is a [service](../concepts.md#Service) finding focusable elements and disabling them within the DOM

* [HTML5: Disabled Elements](http://www.w3.org/TR/html5/disabled-elements.html#disabled-elements)
* [WICG: Adding a [disabled] attribute to `<a>`s](http://discourse.wicg.io/t/adding-a-disabled-attribute-to-a-s/1116)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/element/disabled.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/element/disabled.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/element.disabled.test.js)
* [functional test](https://github.com/medialize/ally.js/blob/master/test/functional/element.disabled.test.js)

