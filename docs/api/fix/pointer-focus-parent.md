---
layout: doc-api.html
tags: browser-fix, service, argument-options
---

# ally.fix.pointerFocusParent

This *Browser Bug Workaround* targets an issue in old Blink and [WebKit](https://bugs.webkit.org/show_bug.cgi?id=139945) causing focus (by `MouseEvent` and `TouchEvent`) to be given to the next parent element accepting focus, rather than the element the event was dispatched to.


## Description

Considering the following markup, clicking on the `<a>` element would focus the `<div>` instead:

```html
<div tabindex="-1">
  <a href="http://example.org/">Hello World</a>
</div>
```


## Usage

```js
// engage the workaround for the entire document
var handle = ally.fix.pointerFocusParent();
// disengage the workaround
handle.disengage();
```

```js
// engage the workaround only for a sub-tree
var handle = ally.fix.pointerFocusParent({
  context: '#element-to-fix',
});
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | [`document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) | The scope of the DOM in which to apply the fix. All elements of the collections are used. |

### Returns

A [`<service>`](../concepts.md#Service) interface, providing the `handle.disengage()` method to stop the service.

### Throws


## Examples

* **EXAMPLE:** [`ally.fix.pointerFocusParent` Example](./pointer-focus-parent.example.html)


## Notes

* **NOTE:** Only engaged for WebKit (detected via via [platform.js](https://github.com/bestiejs/platform.js/)).


## Related resources

* [`ally.fix.pointerFocusChildren`](pointer-focus-children.md)
* [`ally.fix.pointerFocusInput`](pointer-focus-input.md)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/fix/pointer-focus-parent.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/fix/pointer-focus-parent.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/fix.pointer-focus-parent.test.js)
* [functional test](https://github.com/medialize/ally.js/blob/master/test/functional/fix.pointer-focus-parent.test.js)

