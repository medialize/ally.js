---
layout: doc-api.html
tags: argument-list
---

# ally.is.visible

Determines if an element is rendered.


## Description

An element must be visible ([`ally.is.visible`](visible.md)) and may not be disabled ([`ally.is.disabled`](disabled.md)) to be considered focusable.


## Usage

```js
var element = document.getElementById('victim');
var isVisible = ally.is.visible(element);
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


## Notes


## Related Resources


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/visible.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/visible.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/is.visible.test.js)
