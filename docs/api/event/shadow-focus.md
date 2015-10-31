---
layout: doc-api.html
tags: module-only, shadow-dom
apiModuleName: ally/event/shadow-focus
apiBuiltName:
---

# `ally/event/shadow-focus`

Observes focus changes within Shadow DOMs and emits `shadow-focus` [CustomEvent](https://developer.mozilla.org/en/docs/Web/API/CustomEvent)s.


## Notes

* **NOTE:** When you find yourself using this module in your application or library code, we should talk about what you're trying to achieve and how we could do that as part of the library instead. Get in touch, [file an issue](https://github.com/medialize/ally.js/issues) explaining what you're trying to achieve!
* **NOTE:** This modules is only available to be consumed via ES6, AMD or CommonJS directly, it is *not* exposed in the production bundle `ally.min.js`.


## Demo

* **HELP:** Feel free to create and submit a demo for this component.


## Usage

```js
document.addEventListener('shadow-focus', function(event) {
  // event.detail.elements: complete focus ancestry (array of nodes)
  // event.detail.active: the actually focused element within the Shadow DOM
  // event.detail.hosts: the shadow host ancestry of the active element
}, false);

require([
  'ally/event/shadow-focus'
], function(eventShadowFocus) {
  var handle = eventShadowFocus();
  // stop emitting shadow-focus
  handle.disengage();
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/event/active-element`](active-element.md)
* [`ally/get/active-elements`](../get/active-elements.md) used to identify the parent `ShadowHost`s
* [Focus Observer](https://github.com/cdata/focus-observer)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/event/shadow-focus.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/event/shadow-focus.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/event.shadow-focus.test.js)
* does *not* use [`ally/prototype/window.customevent.js`](https://github.com/medialize/ally.js/blob/master/src/prototype/window.customevent.js) for Internet Explorer compatibility because IE does not support Shadow DOM


---

Back to the [API Documentation](../README.md).

