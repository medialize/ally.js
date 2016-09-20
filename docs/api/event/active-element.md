---
layout: doc-api.html
tags: internal, global-service
---

# ally.event.activeElement

Observes changes to `document.activeElement` regardless of focus/blur events and emits `active-element` [CustomEvent](https://developer.mozilla.org/en/docs/Web/API/CustomEvent)s.


## Description

The property `document.activeElement` is visited on every [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame).

This event should not be abused because `FocusEvent`s do not bubble and are therefore unaccessible to [event delegation](https://davidwalsh.name/event-delegate), as the handling of `focus` and `blur` events *can* be delegated when using the [capture phase](http://www.quirksmode.org/js/events_order.html):

```js
document.addEventListener('focus', function(event) {
  // event.target: element that received focus
  // event.relatedTarget: element that lost focus
}, true);
```


## Usage

```js
document.addEventListener('active-element', function(event) {
  // event.detail.focus: element that received focus
  // event.detail.blur: element that lost focus
}, false);

// start emitting active-element
var handle = ally.event.activeElement();
// stop emitting active-element
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
| event.detail.focus | [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | The element that received focus. |
| event.detail.blur | [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | The element that lost focus. |

## Examples


## Notes


## Related resources


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/event/active-element.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/event/active-element.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/event.active-element.test.js)
* uses [`ally/prototype/window.customevent.js`](https://github.com/medialize/ally.js/blob/master/src/prototype/window.customevent.js) for Internet Explorer compatibility


