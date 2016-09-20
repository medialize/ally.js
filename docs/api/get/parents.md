---
layout: doc-api.html
tags: internal, argument-list
---

# ally.get.parents

Identifies the parent elements


## Description

Like [`jQuery.parents()`](https://api.jquery.com/parents/), except [`ally.get.parents`](#ally.get.parents) doesn't have a filter arguments.

The returned list is sorted as follows `[element, element.parent, element.parent.parent, …]`


## Usage

```js
var elements = ally.get.parents({
  context: '#element-to-start-from',
});
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | *required* | The element to start searching from. The first element of a collection is used. |

### Returns

Array of [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) that is sorted `[element, element.parent, …].

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `context` option is not specified.


## Examples


## Changes

* Since `v1.1.0` parents can be resolved for `SVGElements` in Internet Explorer.


## Notes



## Related resources

* [`ally.get.shadowHostParents`](shadow-host-parents.md) finds the `ShadowHost` ancestry of an element


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/get/parents.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/get/parents.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/get.parents.test.js)

