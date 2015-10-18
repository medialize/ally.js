---
layout: doc-listing.html
---

# API Index

When creating web applications or UI widgets these modules may come in handy.


## `ally/fix/*` Countering Browser Bugs

Every software has its problems - so do browsers. The `ally/fix` namespace contains utilities to combat things browsers get wrong.

* [`ally/fix/pointer-focus-children`](fix/pointer-focus-children.md) (Internet Explorer 10 - 11)
* [`ally/fix/pointer-focus-input`](fix/pointer-focus-input.md) (Safari and Firefox on Mac OS X)
* [`ally/fix/pointer-focus-parent`](fix/pointer-focus-parent.md) (WebKit and old Blink)


## `ally/style/*` Extended `:focus` Styling

Sometimes `:focus` is not enough for communicating your application's intentions properly.

* [`ally/style/focus-source`](style/focus-source.md) provides `html[focus-source="pointer|key|script"]`
* [`ally/style/focus-within`](style/focus-within.md) polyfills `:focus-within` with `.ally-focus-within`


## `ally/maintain/*` Altering Browser Focus Behavior

While it's best to use standardized features and leave browsers to figure things out, specifications sometimes leave us hanging in limbo.

* [`ally/maintain/disabled`](maintain/disabled.md) renders elements inert to prevent any user interaction
* [`ally/maintain/focus-trapped`](maintain/focus-trapped.md) contains focus in a given sub-tree of the document


## `ally/query/*` Finding Elements

In order to work with focusable elements, we must first know which elements we're supposed to work with. See [what does "focusable" mean?](../what-is-focusable.md) for a differentiation.

* [`ally/query/first-tabbable`](query/first-tabbable.md) finds the first keyboard focusable element
* [`ally/query/focusable`](query/focusable.md) finds all focusable elements
* [`ally/query/tabbable`](query/tabbable.md) finds all keyboard focusable elements
* [`ally/query/tabsequence`](query/tabsequence.md) finds all keyboard focusable elements respecting the `[tabindex]` order


## `ally/is/*` Element State

Unlike any other ally modules, the `is/*` components do not take take `options.context` argument, but expect the `element` as first argument, allowing easy use in [`.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). See [what does "focusable" mean?](../what-is-focusable.md) for a differentiation.

* [`ally/is/disabled`](is/disabled.md) returns true if the element is `:disabled`
* [`ally/is/focus-releavnt`](is/focus-relevant.md) returns true if the element is considered theoretically focusable
* [`ally/is/focusable`](is/focusable.md) returns true if the element is considered focusable by script
* [`ally/is/only-tabbable`](is/only-tabbable.md) returns true if the element is tabbable but not focusable
* [`ally/is/shadowed`](is/shadowed.md) returns true if the element is the descendant of a `ShadowRoot`
* [`ally/is/tabbable`](is/tabbable.md) returns true if the element is considered keyboard focusable ("tabbable")
* [`ally/is/valid-area`](is/valid-area.md) returns true if the `<area>` element is properly used via `<map>` by an `<img>`
* [`ally/is/valid-tabindex`](is/valid-tabindex.md) returns true if the element's `tabindex` attribute value is sound
* [`ally/is/visible`](is/visible.md) returns true if the element is rendered (but not necessarily visible in the viewport)


## `ally/element/*` Manipulating Element State

Making up for missing or lacking DOM mutation APIs.

* [`ally/element/disabled`](element/disabled.md) disables all elements, not only form controls


## `ally/when/*` Reacting To Element State

Especially when dealing with transitional user interfaces we need to know when an element can be safely focused.

* [`ally/when/focusable`](when/focusable.md) executes a callback once an element fulfills `ally/is/focusable` and is visible in the viewport
* [`ally/when/key`](when/key.md) executes a callback when a given key has been pressed
* [`ally/when/visible-area`](when/visible-area.md) executes a callback once an element is visible in the viewport


## `ally/get/*` DOM Traversal

Sometimes you need some DOM traversal utilities

* [`ally/get/insignificant-branches`](get/insignificant-branches.md) returns an array containing the branches of the DOM that do contain any of the target elements
* [`ally/get/parents`](get/parents.md) returns an array containing all parent elements


## `ally/map/*` Values

* [`ally/map/attribute`](map/attribute.md) maps WAI-ARIA states and properties
* [`ally/map/keycode`](map/keycode.md) maps control keys to readable names


---

## Developer Modules

When creating libraries these modules may come in handy.

* **NOTE:** When you find yourself using one of these in your application code, we should talk about what you're trying to achieve and how we could do that as part of the library instead. Get in touch, [file an issue](https://github.com/medialize/ally.js/issues) explaining what you're trying to achieve!
* **NOTE:** These modules are only available to be consumed via ES6, AMD or CommonJS directly, they are *not* exposed in the production bundle `ally.min.js`.


### `ally/get/*` DOM Traversal (extended)

Sometimes you need some DOM traversal utilities

* [`ally/get/active-elements`](get/active-elements.md) identifies the `ShadowHost` ancestry of the active element
* [`ally/get/insignificant-branches`](get/insignificant-branches.md)
* [`ally/get/focus-target`](get/focus-target.md)
* [`ally/get/parents`](get/parents.md)
* [`ally/get/shadow-host-parents`](get/shadow-host-parents.md)
* [`ally/get/shadow-host`](get/shadow-host.md)


### `ally/event/*` Event Dispatchers

Emitting events when there's no standardized equivalent

* [`ally/event/active-element`](event/active-element.md)
* [`ally/event/shadow-focus`](event/shadow-focus.md)


### `ally/observe/*` Event Listeners

Translate volatile events to stateful interfaces

* [`ally/observe/interaction-type`](observe/interaction-type.md) observes user interaction method to distinguish pointer and keyboard actions


---

## Contributor Modules

When working on ally.js these modules may come in handy.

* **NOTE:** When you find yourself using one of these in your application or library code, we should talk about what you're trying to achieve and how we could do that as part of the library instead. Get in touch, [file an issue](https://github.com/medialize/ally.js/issues) explaining what you're trying to achieve!
* **NOTE:** These modules are only available to be consumed via ES6, AMD or CommonJS directly, they are *not* exposed in the production bundle `ally.min.js`.

The internal tools are documented in a less accessible way to make it just a tiny bit harder for someone not working on ally to use them. This is intentional. The stability of these APIs is not guaranteed.

* [`ally/prototype/*`](prototype.md)
* [`ally/selector/*`](selector.md)
* [`ally/supports/*`](supports.md)
* [`ally/util/*`](util.md)
