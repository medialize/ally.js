---
layout: doc-api.html
tags: internal, shadow-dom, argument-list
---

# ally.get.shadowHostParents

Identifies the `ShadowHost` ancestry of an element


## Description


## Usage

```js
var elements = ally.get.shadowHostParents({
  context: '#element-to-start-from',
});
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | *required* | The element to start searching from. The first element of a collection is used. |

### Returns

Array of [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) that is sorted `[element, ShadowHost, …].

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `context` option is not specified.


## Examples


## Notes


## Related resources

* [`ally.get.shadowHost`](shadow-host.md) is used to find individual `ShadowHost`s


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/get/shadow-host-parents.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/get/shadow-host-parents.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/get.shadow-host-parents.test.js)

