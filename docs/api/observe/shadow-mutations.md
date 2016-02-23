---
layout: doc-api.html
tags: internal, shadow-dom, service
---

# ally.observe.shadowMutations

Registers `MutationObserver`s across nested `ShadowRoot`s.


## Description

This service registers a [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) so that all `ShadowRoot`s within the given `context` are observed as well.


## Usage

```js
var handle = ally.observe.shadowMutations({
  context: '.within-filter-selector',
  callback: function(mutations) {
    console.log(mutations);
  },
  config: {
    childList: true,
    subtree: true,
  },
});
// stop observing
handle.disengage();
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement) | The scope of the DOM in which to search. The first element of a collection is used. |
| callback | function | *required* | The callback to be invoked by the observer. |
| config | [`MutationObserverInit`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#MutationObserverInit) | *required* | The configuration to be used by the observer. |

### Returns

A [`<service>`](../concepts.md#Service) interface, providing the `handle.disengage()` method to stop the service.

### Throws

* [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `context` option is not an `HTMLElement`.
* [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `callback` option is not specified or not a `function`.
* [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `config` option is not specified or not an `object`.


## Callback signature

The callback is invoked with one argument, an `array` of [`MutationRecord`s](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord).


## Examples


## Changes

* Added in `v#master`.


## Notes

* **NOTE:** In browsers that do not support [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) (e.g. Internet Explorer 9 and 10) this service does nothing. [Mutation Events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events) are too much of a burden on the browser, so not an option to fill the gap.
* **NOTE:** The creation of `ShadowRoots` cannot be detected reliably,  [w3c/webcomponents#390](https://github.com/w3c/webcomponents/issues/390).


## Related resources

* [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/observe/shadow-mutations.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/observe/shadow-mutations.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/observe.shadow-mutations.test.js)

