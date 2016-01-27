---
layout: doc-api.html
tags: argument-list, shadow-dom
---

# ally.is.activeElement

Determines if an element is the activeElement of its host context, i.e. its document, iFrame or ShadowHost.


## Description


## Usage

```js
var element = document.getElementById('victim');
var isActiveElement = ally.is.activeElement(element);
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| element | [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | *required* | The Element to test. |

### Returns

Boolean, `true` if the element is the activeElement of its host context.

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `element` argument is not of type `HTMLElement`.


## Examples


## Changes

* Added in `v#master`.


## Notes



## Related resources


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/active-element.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/active-element.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/is.active-element.test.js)

