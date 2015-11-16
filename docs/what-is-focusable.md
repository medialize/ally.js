---
layout: doc-page.html
---

# What does "focusable" mean?

An HTML element can be a member of exactly one of the following five categories:

* **Inert:** The element is not interactive and thus not focusable.
* **Focusable:** The element can be focused by script ([`element.focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus)) and possibly the mouse (or pointer), but not the keyboard.
* **Tabbable:** The element is keyboard focusable ("tabbable"), as it is part of the document's sequential focus navigation order. The element is also focusable by script and possibly the mouse (or pointer).
* **Only Tabbable:** The element is *only* keyboard focusable, possibly by the mouse (or pointer), but it cannot be focused by script.
* **Forwards Focus:** The element will forward focus to another element instead of receiving focus itself.


The [Focusable Elements - Browser Compatibility Table](./data-tables/focusable.md) details in which category the various HTML elements fall per browser. [Focus Redirecting Elements](./data-tables/focusable.redirect.md) details the elements that forward focus to another element, instead of receiving focus themselves.

---

The functions pertaining to "focus" are grouped in two categories: `ally.is.*` represents the filters and `ally.query.*` the crawlers.


## Filtering elements

A filter takes an element ([`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element)) for input and returns a boolean result. Filters can be used to verify the state of a given element.

* [`ally.is.focusable`](./api/is/focusable.md) returns true for any element that passes `ally.is.focusRelevant`, is not [disabled](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XUL/Attribute/disabled), rendered (i.e. not visually hidden, e.g. by [`display: none`](https://developer.mozilla.org/en-US/docs/Web/CSS/display) or [`visibility: hidden`](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)) and does *not* pass `ally.is.onlyTabbable`.
* [`ally.is.focusRelevant`](./api/is/focus-relevant.md) returns true for any *potentially* focusable element.
* [`ally.is.tabbable`](./api/is/tabbable.md) *expects `ally.is.focusable` has already passed for the given element* and returns true in case the element is keyboard focusable.
* [`ally.is.onlyTabbable`](./api/is/only-tabbable.md) returns true for any element that can only be focused by keyboard, but not by script.


## Finding elements

A crawler (or "DOM walker") traverses the DOM in order to find elements matching the desired focusable state.

* [`ally.query.focusable`](./api/query/focusable.md) finds all the elements that are script focusable or keyboard focusable, but not only tabbable. By providing the strategies `"quick"` and `"strict"` the user can choose to trade performance for accuracy. The difference in accuracy is detailed by the compatibility tables for [quick](./data-tables/focusable.quick.md) and [strict](./data-tables/focusable.strict.md). Internally the `ally.is.focusable` filter is used to verify each element's state. Internally a third strategy called "all" is available to find elements that are either focus relevant (regardless of disabled and visual state) or only tabbable.
* [`ally.query.tabbable`](./api/query/tabbable.md) finds all the elements that are keyboard focusable, but not only tabbable.

