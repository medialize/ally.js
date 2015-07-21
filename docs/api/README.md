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


## `ally/focus/*` Altering Browser Focus Behavior

While it's best to use standardized features and leave browsers to figure things out, specifications sometimes leave us hanging in limbo.

* [`ally/focus/disable`](focus/disable.md) renders elements inert to prevent any user interaction
* [`ally/focus/trap`](focus/trap.md) contains focus in a given sub-tree of the document


## `ally/query/*` Finding Elements

In order to work with focusable elements, we must first know which elements we're supposed to work with.

* [`ally/query/first-tabbable`](query/first-tabbable.md) finds the first keyboard focusable element
* [`ally/query/focusable`](query/focusable.md) finds all focusable elements
* [`ally/query/tabbable`](query/tabbable.md) finds all keyboard focusable elements
* [`ally/query/tabsequence`](query/tabsequence.md) finds all keyboard focusable elements respecting the `[tabindex]` order


## `ally/is/*` Element State

Unlike any other ally modules, the `is/*` components do not take take `options.context` argument, but expect the `element` as first argument, allowing easy use in [`.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

* [`ally/is/disabled`](is/disabled.md) returns true if the element is `:disabled`
* [`ally/is/focusable`](is/focusable.md) returns true if the element is considered focusable
* [`ally/is/shadowed`](is/shadowed.md) returns true if the element is the descendant of a `ShadowRoot`
* [`ally/is/tabbable`](is/tabbable.md) returns true if the element is considered keyboard focusable ("tabbable")
* [`ally/is/valid-area`](is/valid-area.md) returns true if the `<area>` element is properly used via `<map>` by an `<img>`
* [`ally/is/valid-tabindex`](is/valid-tabindex.md) returns true if the element's `tabindex` attribute value is sound
* [`ally/is/visible`](is/visible.md) returns true if the element is rendered (but not necessarily visible in the viewport)


## `ally/when/*` Reacting To Element State

Especially when dealing with transitional user interfaces we need to know when an element can be safely focused.

* [`ally/when/focusable`](when/focusable.md) executes a callback once an element fulfills `ally/is/focusable` and is visible in the viewport
* [`ally/when/visible`](when/visible.md) executes a callback once an element is visible in the viewport


## `ally/map/*` Values

* [`ally/map/attribute`](map/attribute.md) maps WAI-ARIA states and properties
* [`ally/map/keycode`](map/keycode.md) maps control keys to readable names


---

## Developer Modules

When creating libraries these modules may come in handy.

* **NOTE:** When you find yourself using one of these in your application code, we should talk about what you're trying to achieve and how we could do that as part of the library instead. Get in touch, [file an issue](https://github.com/medialize/ally.js/issues) explaining what you're trying to achieve!
* **NOTE:** These modules are only available to be consumed via ES6, AMD or CommonJS directly, they are *not* exposed in the production bundle `ally.min.js`.

### ally/get/* {context}

* `active-elements() : Array<Node>`
* `focus-target(Node) : Node|null`
* `parents(Node) : Array<Node>`
* `shadow-host-ancestors(Node) : Array<Node>`
* `shadow-host(Node) : Node|null`

### ally/event/*

* `active-element() : {Function}`
* `shadow-focus() : {Function}`

### ally/observe/*

* `interaction-type() : {Function, Function}`

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
