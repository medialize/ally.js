---
layout: doc-api.html
tags: internal, shadow-dom, argument-list
---

# ally.get.shadowHost

Identifies the `ShadowHost` of an element


## Description


## Usage

```js
var element = ally.get.shadowHost({
  context: '#element-to-start-from',
});
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | *required* | The element to start searching from. The first element of a collection is used. |

### Returns

[`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement).

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `context` option is not specified.


## Examples


## Notes


## Related Resources

* [`ally.get.shadowHostParents`](shadow-host-parents.md) uses this module to identify the `ShadowHost` ancestry


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/get/shadow-host.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/get/shadow-host.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/get.shadow-host.md.js)

