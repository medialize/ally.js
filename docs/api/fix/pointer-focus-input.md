---
layout: doc-api.html
---

# ally.fix.pointerFocusInput (`ally/fix/pointer-focus-input`)

This *Browser Bug Workaround* targets an issue in Safari and Firefox **on Mac OS X**, where focus would not be given to certain form elements upon `mousedown`. This is *not* a browser bug, it is *desired behavior by the OSX platform*. Use this feature only if you require the elements to receive focus (e.g. for custom styling).

> In Firefox for Mac, Chrome and Safari, some types of form field don’t take the focus at all when clicked with the mouse; this behavior is limited to fields which have no typed input, such as radios, checkboxes, buttons, color-pickers and sliders.
> -- [When Do Elements Take the Focus?](http://www.sitepoint.com/when-do-elements-take-the-focus/)


## Notes

* **NOTE:** In Firefox the `<label>` element causes form fields to get focus upon being clicked,
even if the form field itself would not get focus because of the ominous platform conventions.
* **NOTE:** Only engaged for Safari and Firefox on Mac OS X (detected via user agent sniffing).


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  // engage the workaround for the entire document
  var handle = ally.fix.pointerFocusInput();
  // disengage the workaround
  handle.disengage();

  // engage the workaround only for a sub-tree
  var handle = ally.fix.pointerFocusInput({
    // context can be: String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    context: document.getElementById('element-to-fix');
  });
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/fix/pointer-focus-input'
], function(fixPointerFocusInput) {
  // engage the workaround the entire document
  var handle = fixPointerFocusInput();
  // disengage the workaround
  handle.disengage();

  // engage the workaround only for a sub-tree
  var handle = fixPointerFocusInput({
    // context can be: String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    context: document.getElementById('element-to-fix');
  });
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/fix/pointer-focus-children`](pointer-focus-children.md)
* [`ally/fix/pointer-focus-parent`](pointer-focus-parent.md)


## Contributor Notes

* [module source](https://github.com/medialize/ally.js/blob/build-modules/src/fix/pointer-focus-input.js)
* [document source](https://github.com/medialize/ally.js/blob/build-modules/docs/api/fix/pointer-focus-input.md)

---

Back to the [API Documentation](../README.md).

