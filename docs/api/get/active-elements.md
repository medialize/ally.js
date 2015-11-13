---
layout: doc-api.html
tags: internal, shadow-dom
---

# ally.get.activeElements

Identifies the `ShadowHost` ancestry of the active element


## Description


## Usage

```js
var elements = ally.get.activeElements();
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement) | The scope of the DOM in which to search. The first element of a collection is used. |
| filter | [`<selector>`](../concepts.md#Selector) | *required* | The *significant elements* to exclude from the search. |

### Returns

Array of [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement).

### Throws


## Examples


## Notes


## Related Resources

* [`ally.get.shadowHostParents`](shadow-host-parents.md) is used to identify an elements `ShadowHost` ancestry


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/get/active-elements.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/get/active-elements.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/get.active-elements.test.js)

