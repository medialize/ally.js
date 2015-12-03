---
layout: doc-api.html
tags: argument-options
---

# ally.get.insignificantBranches

Identifies all the branches of the DOM that do *not* contain any of the target elements


## Description

The insignificant branches contain all *highest level* nodes (looking from the root `context`) that do not contain any target elements (specified in `filter`). For the following HTML, the insignificant branches of `#target` are `[#sibling, #uncle-1, #uncle-2]`. The insignificant branches of `[#target, #target-2]` are `[#sibling, #uncle-1, #cousin-2]`:

```html
<div id="uncle-1">
  <div id="cousin-1"></div>
</div>
<div id="parent">
  <div id="target"></div>
  <div id="sibling"></div>
</div>
<div id="uncle-2">
  <div id="cousin-2"></div>
  <div id="target-2"></div>
</div>
```


## Usage

```js
var elements = ally.get.insignificantBranches({
  filter: '#target',
});
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement) | The scope of the DOM in which to search. The first element of a collection is used. |
| filter | [`<selector>`](../concepts.md#Selector) | *required* | The *significant elements* to exclude from the search. |

### Returns

Array of [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement).

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `filter` option is not specified.


## Examples


## Changes

* Since `v#master` the `context` option can point to another document (e.g. `<body>` in an iframe)


## Notes



## Related resources

* [`ally.maintain.hidden`](../maintain/hidden.md) is a [service](../concepts.md#Service) hiding insignificant branches from the [Accessibility Tree](../../concepts.md#Accessibility-tree)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/get/insignificant-branches.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/get/insignificant-branches.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/get.insignificant-branches.test.js)

