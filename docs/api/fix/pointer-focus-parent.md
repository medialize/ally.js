
# ally.fix.pointerFocusParent (`ally/fix/pointer-focus-parent`)

This *Browser Bug Workaround* targets an issue in old Blink and [WebKit](https://bugs.webkit.org/show_bug.cgi?id=139945) causing focus (by `MouseEvent` and `TouchEvent`) to be given to the next parent element accepting focus, rather than the element the event was
dispatched to.

Considering the following markup, clicking on the `<a>` element would focus the `<div>` instead:

```html
<div tabindex="-1">
  <a href="http://example.org/">Hello World</a>
</div>
```

---

> **Note:** CSS Transitions are disabled for any styles changed on <code>mousedown</code> (and <code>:active</code>) on the erroneously focusable child elements.

> **Node:** Only engaged for WebKit (detected via user agent sniffing).


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  // engage the workaround for the entire document
  var handle = ally.fix.pointerFocusParent();
  // disengage the workaround
  handle.disengage();

  // engage the workaround only for a sub-tree
  var handle = ally.fix.pointerFocusParent({
    // context can be: String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    context: document.getElementById('element-to-fix');
  });
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/fix/pointer-focus-children'
], function(fixPointerFocusParent) {
  // engage the workaround the entire document
  var handle = fixPointerFocusParent();
  // disengage the workaround
  handle.disengage();

  // engage the workaround only for a sub-tree
  var handle = fixPointerFocusParent({
    // context can be: String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    context: document.getElementById('element-to-fix');
  });
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules


## Related Resources

* [`ally/fix/pointer-focus-children`](pointer-focus-children.md)
* [`ally/fix/pointer-focus-input`](pointer-focus-input.md)


## Contributor Notes

* [module source](https://github.com/medialize/ally.js/blob/build-modules/src/fix/pointer-focus-parent.js)
* [document source](https://github.com/medialize/ally.js/blob/build-modules/docs/api/fix/pointer-focus-parent.md)

---

Back to the [API Documentation](../index.md).

