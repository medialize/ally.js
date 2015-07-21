---
layout: doc-api.html
---

# ally.fix.pointerFocusChildren (`ally/fix/pointer-focus-children`)

This *Browser Bug Workaround* targets an issue in Internet Explorer 10 and 11 where the children of a focusable element styled with `display: flex` become focusable and react to being clicked on.

Considering the following markup, clicking on one of the `<span>` elements would focus the `<span>` instead of the `<a>`:

```html
<style>
  .fancy-link {
    display: flex;
  }
  .fancy-link > span {
    flex: 1 1 10px;
    display: block;
  }
</style>

<a href="http://example.org/" class="fancy-link">
  <span>Hello</span>
  <span>World</span>
</a>
```


## Notes

* **NOTE:** CSS Transitions are disabled for any styles changed on `mousedown` (and `:active`) on the erroneously focusable child elements.
* **NOTE:** Only engaged for Internet Explorer 10 and 11 (detected via user agent sniffing).


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  // engage the workaround for the entire document
  var handle = ally.fix.pointerFocusChildren();
  // disengage the workaround
  handle.disengage();

  // engage the workaround only for a sub-tree
  var handle = ally.fix.pointerFocusChildren({
    // context can be: String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    context: document.getElementById('element-to-fix');
  });
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/fix/pointer-focus-children'
], function(fixPointerFocusChildren) {
  // engage the workaround the entire document
  var handle = fixPointerFocusChildren();
  // disengage the workaround
  handle.disengage();

  // engage the workaround only for a sub-tree
  var handle = fixPointerFocusChildren({
    // context can be: String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    context: document.getElementById('element-to-fix');
  });
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/fix/pointer-focus-input`](pointer-focus-input.md)
* [`ally/fix/pointer-focus-parent`](pointer-focus-parent.md)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/fix/pointer-focus-children.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/fix/pointer-focus-children.md)


---

Back to the [API Documentation](../README.md).

