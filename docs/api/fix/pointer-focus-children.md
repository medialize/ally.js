---
layout: doc-api.html
tags: browser-fix, service, argument-options
---

# ally.fix.pointerFocusChildren

This *Browser Bug Workaround* targets an issue in Internet Explorer 10 and 11 where the children of a focusable element styled with `display: flex` become focusable and react to being clicked on.


## Description

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

<a href="https://example.org/" class="fancy-link">
  <span>Hello</span>
  <span>World</span>
</a>
```


## Usage

```js
// engage the workaround for the entire document
var handle = ally.fix.pointerFocusChildren();
// disengage the workaround
handle.disengage();
```

```js
// engage the workaround only for a sub-tree
var handle = ally.fix.pointerFocusChildren({
  context: '#element-to-fix',
});
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#selector) | [`document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) | The scope of the DOM in which to apply the fix. All elements of the collections are used. |

### Returns

A [`<service>`](../concepts.md#service) interface, providing the `handle.disengage()` method to stop the service.

### Throws


## Examples

* **EXAMPLE:** [`ally.fix.pointerFocusChildren` Example](./pointer-focus-children.example.html)


## Changes

* Since `v1.1.0` the module is executed on `mousdown` instead of `pointerdown`.


## Notes

:::note
CSS Transitions are disabled for any styles changed on `mousedown` (and `:active`) on the erroneously focusable child elements.
:::

:::note
Only engaged for Internet Explorer 10 and 11 (detected via [platform.js](https://github.com/bestiejs/platform.js/)).
:::


## Related resources

* [`ally.fix.pointerFocusInput`](pointer-focus-input.md)
* [`ally.fix.pointerFocusParent`](pointer-focus-parent.md)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/fix/pointer-focus-children.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/fix/pointer-focus-children.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/fix.pointer-focus-children.test.js)
* [functional test](https://github.com/medialize/ally.js/blob/master/test/functional/fix.pointer-focus-children.test.js)

