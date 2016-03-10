---
layout: doc-api.html
tags: argument-options, shadow-dom
---

# ally.query.shadowHosts

finds all elements hosting a `ShadowRoot`.


## Description


## Usage

```js
var elements = ally.query.shadowHosts({
  context: '.within-filter-selector',
});
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement) | The scope of the DOM in which to search. The first element of a collection is used. |

### Returns

Array of [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement).

### Throws


## Examples


## Changes

* Added in `v#master`.


## Notes


## Related resources


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/query/shadow-hosts.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/query/shadow-hosts.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/query.shadow-hosts.test.js)

