---
layout: doc-api.html
tags: internal, argument-list
---

# ally.get.focusTarget

Identifies the element that would get focus upon click


## Description

When clicking on the `<span>` element, focus is given to the `<div>`, because it's the first focusable parent element.

```html
<div tabindex="-1">
  <p>Hello <span>World</span>!</p>
</div>
```

When clicking on the `<label>` element, focus is given to the `<input>`, because it's the referenced form control.

```html
<label for="world">Hello</label>
<input id="world" type="text">
```


## Usage

```js
var element = ally.get.focusTarget({
  context: '#element-to-start-from',
});
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | *required* | The element to start searching from. The first element of a collection is used. |
| except | [`<focus identification exception>`](../concepts.md#Focus-identification-exceptions) | `{}` | The Element to test. |

### Returns

[`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement).

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `context` option is not specified.


## Examples


## Changes

* Since `v#master` elements redirecting focus return their target elements.
* Since `v#master` exceptions can be passed through to `ally.is.focusable` via the `except` argument.


## Notes

See [`ally.get.focusRedirectTarget`](./focus-redirect-target.md#Notes)


## Related resources


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/get/focus-target.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/get/focus-target.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/get.focus-target.test.js)

