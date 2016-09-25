---
layout: doc-api.html
tags: browser-fix, service, argument-options
---

# ally.fix.pointerFocusInput

This *Browser Bug Workaround* targets an issue in Safari and Firefox **on Mac OS X**, where focus would not be given to certain form elements upon `mousedown`. This is *not* a browser bug, it is *desired behavior by the OSX platform*. Use this feature only if you require the elements to receive focus (e.g. for custom styling).


## Description

> In Firefox for Mac, Chrome and Safari, some types of form field don’t take the focus at all when clicked with the mouse; this behavior is limited to fields which have no typed input, such as radios, checkboxes, buttons, color-pickers and sliders.
> -- [When Do Elements Take the Focus?](https://www.sitepoint.com/when-do-elements-take-the-focus/)


## Usage

```js
// engage the workaround for the entire document
var handle = ally.fix.pointerFocusInput();
// disengage the workaround
handle.disengage();
```

```js
// engage the workaround only for a sub-tree
var handle = ally.fix.pointerFocusInput({
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

@@@example /api/fix/pointer-focus-input.example.html
### pointerFocusInput example
@@@


## Changes

* Since `v1.1.0` nested elements of `<button>` and `<label>` are targeted properly.
* In `v1.3.0` the `element.prototype.matches` was replaced by `util/element-matches`.


## Notes

:::note
In Firefox the `<label>` element causes form fields to get focus upon being clicked, even if the form field itself would not get focus because of the ominous platform conventions.
:::

:::note
Only engaged for Safari and Firefox on Mac OS X (detected via [platform.js](https://github.com/bestiejs/platform.js/)).
:::


## Related resources

* [`ally.fix.pointerFocusChildren`](pointer-focus-children.md)
* [`ally.fix.pointerFocusParent`](pointer-focus-parent.md)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/fix/pointer-focus-input.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/fix/pointer-focus-input.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/fix.pointer-focus-input.test.js)
* [functional test](https://github.com/medialize/ally.js/blob/master/test/functional/fix.pointer-focus-input.test.js)

