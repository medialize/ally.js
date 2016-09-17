---
layout: doc-api.html
tags: shadow-dom
---

# ally.get.activeElement

Identifies the element that currently has focus


## Description

This utility is a safeguard for `document.activeElement` presenting invalid references.


## Usage

```js
var element = ally.get.activeElement();

var iframeElement = ally.get.activeElement({
  context: iframeDocument,
});
```

### Arguments


### Returns

[`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement).

### Throws


## Examples


## Changes

* Added in `v1.3.0`.


## Notes


## Related resources

* [`ally.get.activeElements`](active-elements.md)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/get/active-element.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/get/active-element.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/get.active-element.test.js)

