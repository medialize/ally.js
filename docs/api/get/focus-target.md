---
layout: doc-api.html
tags: module-only
apiModuleName: ally/get/focus-target
apiBuiltName:
---

# `ally/get/focus-target`

Identifies the element that would get focus upon click


When clicking on the `<span>` element, focus is given to the `<div>`, because it's the first focusable parent element.

```html
<div tabindex="-1">
  <p>Hello <span>World</span>!</p>
</div>
```


## Notes

* **NOTE:** When you find yourself using this module in your application or library code, we should talk about what you're trying to achieve and how we could do that as part of the library instead. Get in touch, [file an issue](https://github.com/medialize/ally.js/issues) explaining what you're trying to achieve!
* **NOTE:** This modules is only available to be consumed via ES6, AMD or CommonJS directly, it is *not* exposed in the production bundle `ally.min.js`.


## Demo

* **HELP:** Feel free to create and submit a demo for this component.


## Usage

```js
require([
  'ally/get/focus-target'
], function(getFocusTarget) {
  var element = getFocusTarget({
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '#element-to-start-from',
  });
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/get/active-elements`](active-elements.md)
* [`ally/get/parents`](parents.md)
* [`ally/get/shadow-host-parents`](shadow-host-parents.md)
* [`ally/get/shadow-host`](shadow-host.md)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/get/focus-target.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/get/focus-target.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/get.focus-target.test.js)


---

Back to the [API Documentation](../README.md).

