---
layout: doc-api.html
tags: argument-list
---

# ally.is.visible

Determines if an element is rendered.


## Description

An element is considered visible if it satisfies all of the following rules:

* Neither the element nor an element of its ancestry has [`display: none;`](https://developer.mozilla.org/en/docs/Web/CSS/display) applied.
* Neither the element nor an element of its ancestry has [`visibility: hidden;`](https://developer.mozilla.org/en/docs/Web/CSS/visibility) applied, unless a closer relative in the ancestry reverts that directive by defining `visibility: visible`.
* The element is not a descendant of a collapsed [`<details>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details).
* The element is not hosted in an `<object>` or `<iframe>` element that is considered invisible by `ally.is.visible`

An element can be visible, but not visible within the viewport.


## Usage

```js
var element = document.getElementById('victim');
var isVisible = ally.is.visible(element);
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| element | [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | *required* | The Element to test. |

The underlying rules can also be accessed in the [`options` argument style](../concepts.md#Single-options-argument) by calling `ally.is.visible.rules(options)`:

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | *required* | The element to examine. The first element of a collection is used. |
| except | [`<focus identification exception>`](../concepts.md#Focus-identification-exceptions) | `{}` | The Element to test. |

### Returns

Boolean, `true` if the element is visible (i.e. not hidden by CSS).

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `element` argument is not of type `HTMLElement`.


## Examples


## Changes

* Since `v#master` exceptions can be passed to `ally.is.visible.rules(options)`.
* Since `v#master` the state of the hosting `<iframe>` or `<object>` element is considered.


## Notes

* **NOTE:** `<area>` elements are not rendered by themselves, so they are *always* considered visible.


## Related resources


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/visible.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/visible.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/is.visible.test.js)
