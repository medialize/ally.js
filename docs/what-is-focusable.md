---
layout: doc-page.html
---

# What Does "Focusable" Mean?

An HTML element can be a member of exactly one of the following five categories:

* **inert**: the element is not interactive and thus not focusable.
* **focusable**: the element can be focused by script ([`element.focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)) and possibly the mouse (or pointer), but not the keyboard.
* **tabbable**: the element is keyboard focusable ("tabbable"), as it is part of the document's sequential focus navigation order. The element is also focusable by script and possibly the mouse (or pointer).
* **only-tabbable**: The element is *only* keyboard focusable, possibly by the mouse (or pointer), but it cannot be focused by script.
* **forwards focus**: The element will forward focus to another element instead of receiving focus itself.


The [Focusable Elements - Browser Compatibility Table](./data-tables/focusable.md) details in which category the various HTML elements fall per browser. [Focus Redirecting Elements](./data-tables/focusable.redirect.md) details the elements that forward focus to another element, instead of receiving focus themselves.

---

The functions pertaining to "focus" are grouped in two categories: `ally/is/*` represents the filters and `ally/query/*` the crawlers.


## Filtering Elements

A filter takes an element ([`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element)) for input and returns a boolean result. Filters can be used to verify the state of a given element.

* [`ally/is/focusable`](./api/is/focusable.md) returns true for any element that passes `is/focus-relevant`, is not [disabled](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XUL/Attribute/disabled), rendered (i.e. not visually hidden, e.g. by [`display: none`](https://developer.mozilla.org/en-US/docs/Web/CSS/display) or [`visibility: hidden`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)) and does *not* pass `is/only-tabbable`.
* [`ally/is/focus-relevant`](./api/is/focus-relevant.md) returns true for any *potentially* focusable element.
* [`ally/is/tabbable`](./api/is/tabbable.md) *expects `is/focusable` has already passed for the given element* and returns true in case the element is keyboard focusable.
* [`ally/is/only-tabbable`](./api/is/only-tabbable.md) returns true for any element that can only be focused by keyboard, but not by script.


## Finding Elements

A crawler (or "DOM walker") traverses the DOM in order to find elements matching the desired focusable state.

* [`ally/query/focusable`](./api/query/focusable.md) finds all the elements that are script focusable or keyboard focusable, but not only tabbable. By providing the strategies `"quick"` and `"strict"` the user can choose to trade performance for accuracy. The difference in accuracy is detailed by the compatibility tables for [quick](./data-tables/focusable.quick.md) and [strict](./data-tables/focusable.strict.md). Internally the `is/focusable` filter is used to verify each element's state. Internally a third strategy called "all" is available to find elements that are either focus relevant (regardless of disabled and visual state) or only tabbable.
* [`ally/query/tabbable`](./api/query/tabbable.md) finds all the elements that are keyboard focusable, but not only tabbable.

