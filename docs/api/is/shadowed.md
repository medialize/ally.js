---
layout: doc-api.html
tags: argument-list, shadow-dom
---

# ally.is.shadowed

Determines if an element is the descendant of a `ShadowRoot`.


## Description


## Usage

```js
var element = document.getElementById('victim');
var isShadowed = ally.is.shadowed(element);
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

* **NOTE:** Requires [Shadow DOM](http://caniuse.com/#feat=shadowdom) support


## Related resources


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/shadowed.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/shadowed.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/is.shadowed.test.js)

