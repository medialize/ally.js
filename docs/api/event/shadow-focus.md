---
layout: doc-api.html
tags: internal, shadow-dom, global-service
---

# ally.event.shadowFocus

Observes focus changes within Shadow DOMs and emits `shadow-focus` [CustomEvent](https://developer.mozilla.org/en/docs/Web/API/CustomEvent)s.


## Description


## Usage

```js
document.addEventListener('shadow-focus', function(event) {
  // event.detail.elements: complete focus ancestry (array of nodes)
  // event.detail.active: the actually focused element within the Shadow DOM
  // event.detail.hosts: the shadow host ancestry of the active element
}, false);

// start emitting shadow-focus
var handle = ally.event.shadowFocus();
// stop emitting shadow-focus
handle.disengage();
```

### Arguments


### Returns

A [`<global-service>`](../concepts.md#Global-service) interface, providing the `handle.disengage()` method to stop the service.

### Throws


## Event data

The `event.detail` property provides the following data:

| Name | Type | Description |
| ---- | ---- | ----------- |
| event.detail.active | [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | The actually focused element *within* the Shadow DOM. |
| event.detail.elements | array of [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | The complete focus ancestry |
| event.detail.hosts | array of [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | The ShadowHost ancestry of the active element. |


## Examples


## Changes

* Since `v#master` the module does not access `document.body` at load time anymore.


## Notes


## Related resources

* [`ally.get.activeElements`](../get/active-elements.md) is used to identify the parent `ShadowHost`s

* [Focus Observer](https://github.com/cdata/focus-observer) is an alternative implementation of this module


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/event/shadow-focus.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/event/shadow-focus.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/event.shadow-focus.test.js)
* this module does *not* use [`ally/prototype/window.customevent.js`](https://github.com/medialize/ally.js/blob/master/src/prototype/window.customevent.js) for Internet Explorer compatibility because IE does not support Shadow DOM

