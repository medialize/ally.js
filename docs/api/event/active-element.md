---
layout: doc-api.html
tags: module-only
---

# `ally/event/active-element`

Observes changes to `document.activeElement` regardless of focus/blur events and emits `active-element` [CustomEvent](https://developer.mozilla.org/en/docs/Web/API/CustomEvent)s.

The property `document.activeElement` is visited on every [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame).

---

This event should not be abused because `FocusEvent`s do not bubble and are therefore unaccessible to [event delegation](http://davidwalsh.name/event-delegate), as the handling of `focus` and `blur` events *can* be delegated when using the [capture phase](http://www.quirksmode.org/js/events_order.html):

```js
document.addEventListener('focus', function(event) {
  // event.target: element that received focus
  // event.relatedTarget: element that lost focus
}, true);
```


## Notes

* **NOTE:** When you find yourself using this module in your application or library code, we should talk about what you're trying to achieve and how we could do that as part of the library instead. Get in touch, [file an issue](https://github.com/medialize/ally.js/issues) explaining what you're trying to achieve!
* **NOTE:** This modules is only available to be consumed via ES6, AMD or CommonJS directly, it is *not* exposed in the production bundle `ally.min.js`.


## Demo

TODO: figure out how to integrate demo


## Usage

```js
document.addEventListener('active-element', function(event) {
  // event.detail.focus: element that received focus
  // event.detail.blur: element that lost focus
}, false);

require([
  'ally/event/active-element'
], function(eventActiveElement) {
  var handle = eventActiveElement();
  // stop emitting active-element
  handle.disengage();
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/event/shadow-focus`](shadow-focus.md)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/event/active-element.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/event/active-element.md)
* uses [`ally/prototype/window.customevent.js`](https://github.com/medialize/ally.js/blob/master/src/prototype/window.customevent.js) for Internet Explorer compatibility


---

Back to the [API Documentation](../README.md).

