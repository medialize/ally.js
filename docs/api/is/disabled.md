---
layout: doc-api.html
tags: argument-list
---

# ally.is.disabled

Determines if an element is [`:disabled`](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Adisabled), or was disabled by [`ally.element.disabled`](../element/disabled.md) - i.e. the element is not focusable and editable.


## Description

Only form controls (`<input>`, `<select>`, `<textarea>`, `<button>`) and the `<fieldset>` element know the `disabled` attribute. While `<fieldset disabled>` inherits the `disabled` state onto descendant form controls, that does not affect the value of the descendant's `disabled` property. Even the detection of inherited `disabled` state via the `:disabled` pseudo does not work reliably cross browser. To make matters worse, Internet Explorer 9 - 11 also support the `disabled` state for `<form>` elements, with the same inheritance scheme `<fieldset>` provides.


## Usage

```js
var element = document.getElementById('victim');
var isDisabled = ally.is.disabled(element);
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| element | [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | *required* | The Element to test. |

### Returns

Boolean, `true` if the element is disabled.

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `element` argument is not of type `HTMLElement`.


## Examples


## Changes

* Since `v#master` the `<form disabled>` is handled properly in Internet Explorer 9 - 11.


## Notes

* **NOTE:** The `<fieldset>` element can be disabled, inheriting the state onto all form elements it contains.
* **NOTE:** WebKit and Blink do not properly support disabling `<fieldset tabindex="0" disabled>` elements themselves, while descendant form elements are properly disabled, see [Blink 453847](https://code.google.com/p/chromium/issues/detail?id=453847), [Webkit 141086](https://bugs.webkit.org/show_bug.cgi?id=141086)


## Related resources

* [`ally.element.disabled`](../element/disabled.md) can disable *any* interactive element

* [HTML5: Disabled Elements](http://www.w3.org/TR/html5/disabled-elements.html#disabled-elements)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/disabled.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/disabled.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/is.disabled.test.js)

