---
layout: doc-api.html
tags: internal
apiModuleName: ally/event/active-element
apiBuiltName: ally.event.activeElement
---

# `ally.event.activeElement` (`ally/event/active-element`)

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


## Demo

* **HELP:** Feel free to create and submit a demo for this component.


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  document.addEventListener('active-element', function(event) {
    // event.detail.focus: element that received focus
    // event.detail.blur: element that lost focus
  }, false);

  // start emitting active-element
  var handle = ally.event.activeElement();
  // stop emitting active-element
  handle.disengage();
</script>
```

Using the module instead of the production build:

```js
document.addEventListener('active-element', function(event) {
  // event.detail.focus: element that received focus
  // event.detail.blur: element that lost focus
}, false);

require([
  'ally/event/active-element'
], function(eventActiveElement) {
  // start emitting active-element
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
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/event.active-element.test.js)
* uses [`ally/prototype/window.customevent.js`](https://github.com/medialize/ally.js/blob/master/src/prototype/window.customevent.js) for Internet Explorer compatibility


---

Back to the [API Documentation](../README.md).

