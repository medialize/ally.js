---
layout: doc-page.html
---

# Mutating the active element

This document explains the browsers' behaviors when the active element is hidden, disabled or removed completely.

The "active element" refers to the DOM element that currently has focus. It is accessible through the DOM property [`document.activeElement`](https://developer.mozilla.org/en/docs/Web/API/Document/activeElement) and can be queried via the CSS pseudo class [`:focus`](https://developer.mozilla.org/en/docs/Web/CSS/:focus).

The table of [what browsers consider focusable](../data-tables/focusable.md) shows that `<input disabled>` cannot receive focus. But what the table does not show is how browsers react when the `<input>` element has focus and is then disabled, or hidden, or even completely removed from the DOM.


## Specifications

The HTML specification features the sections [focusing steps](https://html.spec.whatwg.org/multipage/interaction.html#focusing-steps) and [unfocusing steps](https://html.spec.whatwg.org/multipage/interaction.html#unfocusing-steps) describing the procedure for shifting focus from one element to another. The section [Focus fixup rule one](https://html.spec.whatwg.org/multipage/interaction.html#focus-fixup-rule-one) was introduced in [February 2014](https://github.com/whatwg/html/commit/f96b1997) and describes how the browser should behave in case the active element is mutated so that it wouldn't receive focus anymore. Unfortunately the language used is not particularly easy to understand.

A simplified interpretation of that convoluted passage is that in case the focused element is no longer focusable, the first focusable element in that document should receive focus. However, that's not quite what happens in the real world, as we'll see below.


## Running tests

:::note
On macOS the browsers Safari and Firefox *will not* focus `<button>` and `<input type="radio|checkbox">` elements when they're clicked, but *will* shift focus to them when using the <kbd>Tab</kbd> key. These tests therefore show the result of keyboard interaction.
:::

@@@example /tutorials/mutating-active-element.example.html
@@@


## The results

Executing the test above in various browsers brings about the compatibility tables below. The results are fairly uniform, but there are a few interesting outliers in behavior that are worth discussing.

Regardless of the mutation method (disable, hide, remove) the Gecko, Blink and Webkit (Firefox, Chrome, Safari) always shift focus to the next focusable element in the document's [sequential navigation focus order](../concepts.md#sequential-navigation-focus-order) when the <kbd>Tab</kbd> key is pressed. This is obvious where the mutated element remains the activeElement. But any time the active element reverts to `<body>`, this is achieved because the browser sets the [sequential focus navigation starting point](https://html.spec.whatwg.org/multipage/interaction.html#sequential-focus-navigation-starting-point) appropriately.

When removing the active element from the DOM (also called "detaching the element") browsers return focus to `<body>`, while disabling, hiding or interting (removing the tabindex attribute from otherwise non-focusable elements) the active element it usually retains focus.

Internet Explorer and Microsoft Edge shift focus to the first focusable ancestor or `<body>` when the active element is disabled.

Internet Explorer 9 doesn't cope well when the active element is removed, as it simply sets `document.activeElement` to `null`, instead of shifting focus back to `<body>`. Internet Explorer 11 may still reference the element that was removed from the DOM, instead of shifting focus back to `<body>`. Both scenarios can cause havoc in scripts accessing `document.activeElement` without performing sanity checks. The [`ally.get.activeElement`](../api/get/active-element.md) utility is there to help with this.


### Disabling the active element

When the active element changes from `<button>` to `<button disabled>`:

| Browser | active after disabling | active after <kbd>Tab</kbd> |
|---------|-----------------------|-----------------------------|
| Safari 10 | unchanged | next focusable element |
| Firefox 49 | unchanged | next focusable element |
| Chrome 53 | `<body>` | next focusable element |
| Internet Explorer 9 | `#container` | first focusable element in `#container` |
| Internet Explorer 11 | `#container` | first focusable element in `#container` |
| Edge 14 | `#container` | first focusable element in `#container` |


### Hiding the active element

When the active element changes from `<button>` to `<button hidden>`:

| Browser | active after hiding | active after <kbd>Tab</kbd> |
|---------|-----------------------|-----------------------------|
| Safari 10 | unchanged | next focusable element |
| Firefox 49 | unchanged | next focusable element |
| Chrome 53 | `<body>` | next focusable element |
| Internet Explorer 9 | unchanged | next focusable element |
| Internet Explorer 11 | unchanged | next focusable element |
| Edge 14 | unchanged | next focusable element |


### Removing the active element

When the active element is removed from the DOM:

| Browser | active after removing | active after <kbd>Tab</kbd> |
|---------|-----------------------|-----------------------------|
| Safari 10 | `<body>` | next focusable element |
| Firefox 49 | `<body>` | next focusable element |
| Chrome 53 | `<body>` | next focusable element |
| Internet Explorer 9 | `null` | first focusable element of the document |
| Internet Explorer 11 | unchanged [1] or `<body>` | first focusable element of the document |
| Edge 14 | `<body>` | first focusable element of the document |

[1] document.activeElement still points to the detached element, but when reattaching the element it does not match `:focus` anymore.


### Removing tabindex from the active element

When the active element changes from `<div role="button" tabindex="0">` to `<div role="button">`:

| Browser | active after removing tabindex | active after <kbd>Tab</kbd> |
|---------|-----------------------|-----------------------------|
| Safari 10 | unchanged | next focusable element |
| Firefox 49 | unchanged | next focusable element |
| Chrome 53 | `<body>` | next focusable element |
| Internet Explorer 11 | unchanged | next focusable element |
| Edge 14 | unchanged | next focusable element |


## Tracked issues

* [Edge #9548332](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/9548332/): activeElement changes when button disabled during click
* [Chromium #660999](https://bugs.chromium.org/p/chromium/issues/detail?id=660999): mutating document.activeElement resets focus to document.body
* [whatwg/html #1972](https://github.com/whatwg/html/issues/1972): "Focus fixup rule one" not very clear, possibly wrong
