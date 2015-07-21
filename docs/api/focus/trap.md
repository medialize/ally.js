---
layout: doc-api.html
tags: deprecated
use-instead: api/focus/disable.md
---

# ally.focus.trap (`ally/focus/trap`)

Traps focus in a sub-tree of the document.

This make sure only descendants of a given element (`context`) can be focused. This behavior is [considered best practice by WAI ARIA by when presenting modal dialogs](http://www.w3.org/WAI/PF/aria-practices/#dialog_modal).

Browsers that support the `focusout` event (Blink, WebKit, Trident) redirect `focus` upon the *focus target* leaving the `context` that focus should be contained in. Browser that do not support this event (Gecko) will listen for the `KeyEvent` <kbd>Tab</kbd> and <kbd>Shift Tab</kbd> to achieve the same.


## Notes

* **WARNING:** It may be possible to break out of the given `context` by means of script or `MouseEvent`. It is the developer's responsibility to prevent that from happening, should they wish to.
* **WARNING:** Trapping focus is **deprecated** and superseded by [ally/focus/disable](disable.md). Although this pattern is considered best practice by WAI ARIA, it cannot be implemented properly (in a robust way) with the tools available in current browsers. Working with inert subtrees has its own set of problems, but they seem far less likely to break for any given user than trapping focus could and would.


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  // trap focus in the sub-tree specified by options.context
  var handle = ally.focus.trap({
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '#element-to-keep-focus-in',
    // focusing the first tabbable element in context
    focusFirst: true,
  });
  // un-inert all elements
  handle.disengage();
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/focus/trap'
], function(focusTrap) {
  // trap focus in the sub-tree specified by options.context
  var handle = focusTrap({
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    context: document.getElementById('element-to-keep-focus-in'),
    // focusing the first tabbable element in context
    focusFirst: true,
  });
  // release focus trap
  handle.disengage();
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/focus/disable`](disable.md)


## Contributor Notes

* [module source](https://github.com/medialize/ally.js/blob/build-modules/src/focus/trap.js)
* [document source](https://github.com/medialize/ally.js/blob/build-modules/docs/api/focus/trap.md)

The module consists of several components:

* [`trap/focusevent`](https://github.com/medialize/ally.js/blob/build-modules/src/focus/trap/capture-body.js) to react to `focusout` events and intercept focus change
* [`trap/keyevent`](https://github.com/medialize/ally.js/blob/build-modules/src/focus/trap/capture-body.js) to react to <kbd>Tab</kbd> and <kbd>Shift Tab</kbd> and intercept focus change (in Firefox)
* [`trap/observe-body`](https://github.com/medialize/ally.js/blob/build-modules/src/focus/trap/observe-body.js) to observe the document's `focus` events to intercept focus changes caused by `script` and `MouseEvent` (in Firefo)
* [`trap/capture-body`](https://github.com/medialize/ally.js/blob/build-modules/src/focus/trap/capture-body.js) to wait for any element to get focus in order to redirect focus back into the context (to allow nothing being focused as a valid state of the trap)


---

Back to the [API Documentation](../README.md).

