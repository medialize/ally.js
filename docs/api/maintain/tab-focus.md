---
layout: doc-api.html
tags: service, argument-object
---

# ally.maintain.tabFocus

Traps <kbd>TAB</kbd> focus in the tabsequence to prevent the browser from shifting focus to its UI (e.g. the location bar).


## Description

`ally.maintain.tabFocus` intercepts the keyboard events for <kbd>Tab</kbd> and <kbd>Shift Tab</kbd> in order to make sure the element receiving focus is part of the context element's tabsequence ([Sequential Navigation Focus Order](../../concepts.md#Sequential-navigation-focus-order)). The tabsequence is obtained via [`ally.query.tabsequence`](../query/tabsequence.md) in order to follow the browser's rules of sorting the sequence.

As focus can be shifted by various means, even other keyboard commands (e.g. via spatial navigation), it is also necessary to engage [`ally.maintain.disabled`](disabled.md), whenever `ally.maintain.tabFocus` is engaged.


## Usage

```js
var handle = ally.maintain.tabFocus({
  context: '.dialog',
});

handle.disengage();
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement) | The scope of the DOM in which to consider the tabsequence. The first element of a collection is used. |

### Returns

A [`<service>`](../concepts.md#Service) interface, providing the `handle.disengage()` method to stop the service.

### Throws


## Examples

* **EXAMPLE:** [`ally.maintain.tabFocus` Example](./tab-focus.example.html)


## Changes

* Added in `v1.1.0`.


## Notes

* **WARNING:** As SVG elements cannot be focused by script in Internet Explorer and Firefox, these elements will not be part of the tabsequence, thus not reachable when `ally.maintain.tabFocus` is active.


## Related resources

* [`ally.maintain.disabled`](disabled.md) is a [service](../concepts.md#Service) disabling interactive elements in the DOM


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/maintain/tab-focus.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/maintain/tab-focus.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/maintain.tab-focus.test.js)

