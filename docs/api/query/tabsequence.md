---
layout: doc-api.html
tags: argument-options
---

# ally.query.tabsequence

Finds keyboard focusable ("tabbable") elements in the DOM and returns them in the order calculated based on `tabindex` attribute values.


## Description

The [Sequential Navigation Focus Order](../../concepts.md#sequential-navigation-focus-order) depends on a variety of factors:

* Value of the `tabindex` attribute. The sequence generally starts with all positive tabindex elements with `tabindex="1"` in DOM order, then all elements with `tabindex="2"` in DOM order, then all elements with `tabindex="3"`, … until the highest tabindex is reached, at which point the sequence continues with the `tabindex="0"` (which is set implicitly for a number of HTML elements, e.g. `<input>`).
* `<area>` elements may either be sorted in DOM order of the `<area>` itsel, *or* the `<img>` referencing the map.
* Within a [ShadowDOM](http://caniuse.com/#feat=shadowdom) positive tabindex elements may either be sorted localized to the `ShadowRoot`, *or* globally in the document.

`ally.query.tabsequence` uses [`ally.query.tabbable`](tabbable.md) to find keyboard focusable elements and then sorts the element positions respecting `ShadowDOM`, `<area>` vs `<img>` replacement and `tabindex` attribute value.


## Usage

```js
var sequence = ally.query.tabsequence({
  context: '.within-filter-selector',
  includeContext: true,
  strategy: 'quick',
});
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#selector) | [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement) | The scope of the DOM in which to search. The first element of a collection is used. |
| includeContext | boolean | `false` | Prepend the `context` element if it is focusable. |
| includeOnlyTabbable | boolean | `false` | Include elements that would otherwise be ignored because they're considered only tabbable, |
| strategy | `"quick"`, `"strict"`, `"all"` | `"quick"` | The approach used to find elements. |

### Returns

Array of [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement).

### Throws


## Examples

* **EXAMPLE:** [`ally.query.tabsequence` Example](./tabsequence.example.html)


## Changes

* Since `v1.1.0` the module can move `<area>` elements to the place of the `<img>` elements they're referenced from.
* Since `v1.1.0` the module can sort elements in [ShadowDOM](http://caniuse.com/#feat=shadowdom) localized to the `ShadowRoot`.
* Since `v1.1.0` the option `includeOnlyTabbable` allows to skip the internal filter preventing this module from returning elements that cannot be focused by script.


## Notes

See [`ally.is.focusRelevant`](../is/focus-relevant.md#notes)

:::note
In some browsers `<area>` elements are provided in DOM order they occur. Others provide them in DOM order of the `<img>` elements that use them. `ally.query.tabindex` handles this appropriately. See [Sequential Navigation Focus Order for Image Maps](https://www.w3.org/Bugs/Public/show_bug.cgi?id=27787), [Blink 447289](https://code.google.com/p/chromium/issues/detail?id=447289), [WebKit 140259](https://bugs.webkit.org/show_bug.cgi?id=140259)
:::

:::note
In some browsers positive tabindexes are sorted localized to [ShadowDOM](http://caniuse.com/#feat=shadowdom), in some they are sorted globally. `ally.query.tabindex` handles this appropriately.
:::

:::warning
In Firefox the Flexbox CSS property `order` affects the tabsequence, [Gecko 812687](https://bugzilla.mozilla.org/show_bug.cgi?id=812687), ally.js does not replicate this behavior.
:::

:::warning
In Firefox referencing the same `<map>` from multiple `<img>` elements can lead to elements missing from the tabsequence, [Gecko 1116126](https://bugzilla.mozilla.org/show_bug.cgi?id=1116126), ally.js does not replicate this behavior.
:::

:::warning
In Firefox `<label tabindex="0">` is part of the tabsequence, [Gecko 1240285](https://bugzilla.mozilla.org/show_bug.cgi?id=1240285), ally.js does not replicate this behavior.
:::


## Related resources

* [`ally.is.tabbable`](../is/tabbable.md) is used to filter focusable elements
* [`ally.query.focusable`](focusable.md) is used to find focusable elements
* [`ally.query.firstTabbable`](first-tabbable.md) finds the first keyboard focusable element in a context
* [`ally.query.tabbable`](tabbable.md) finds keyboard focusable elements in DOM order

* [HTML5: The `tabindex` attribute](https://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/query/tabsequence.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/query/tabsequence.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/query.tabsequence.test.js)

