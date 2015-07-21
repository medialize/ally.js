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


## `ally/query/*` Asking The DOM

In order to work with focusable elements, we must first know which elements we're supposed to work with.

* [`ally/query/first-tabbable`](query/first-tabbable.md) finds the first keyboard focusable element
* [`ally/query/focusable`](query/focusable.md) finds all focusable elements
* [`ally/query/tabbable`](query/tabbable.md) finds all keyboard focusable elements
* [`ally/query/tabsequence`](query/tabsequence.md) finds all keyboard focusable elements respecting the `[tabindex]` order


## ally/is/* (Node)

* `is-disabled(Node) : bool`
* `is-focusable(Node) : bool`
* `is-shadowed(Node) : bool`
* `is-tabbable(Node) : bool`
* `is-valid-area(Node) : bool`
* `is-valid-tabindex(Node) : bool`
* `is-visible(Node) : bool`

## ally/when/*

* `focusable({NodeArray[1], Function, decimal}) : {Function}`
* `visible({NodeArray[1], Function, decimal}) : {Function}`

## ally/map/*

* `attribute : Object`
* `keycode : Object`

---

# ally.js API (Developer Modules)

When creating libraries these modules may come in handy.

* **NOTE:** When you find yourself using one of these in your application code, we should talk about what you're trying to achieve and how we could do that as part of the library instead. Get in touch, [file an issue](https://github.com/medialize/ally.js/issues) explaining what you're trying to achieve!
* **NOTE:** These modules are only available to be consumed via ES6, AMD or CommonJS directly, they are *not* exposed in the production bundle `ally.min.js`.

## ally/get/* {context}

* `active-elements() : Array<Node>`
* `focus-target(Node) : Node|null`
* `parents(Node) : Array<Node>`
* `shadow-host-ancestors(Node) : Array<Node>`
* `shadow-host(Node) : Node|null`

## ally/event/*

* `active-element() : {Function}`
* `shadow-focus() : {Function}`

## ally/observe/*

* `interaction-type() : {Function, Function}`

---

# ally.js API (Contributor Modules)

When working on ally.js these modules may come in handy.

* **NOTE:** When you find yourself using one of these in your application or library code, we should talk about what you're trying to achieve and how we could do that as part of the library instead. Get in touch, [file an issue](https://github.com/medialize/ally.js/issues) explaining what you're trying to achieve!
* **NOTE:** These modules are only available to be consumed via ES6, AMD or CommonJS directly, they are *not* exposed in the production bundle `ally.min.js`.

## ally/prototype/*

* `element.prototype.matches : void`
* `svgelement.prototype.focus : void`
* `window.customevent : void`

## ally/selector/*

* `focusable : string`

## ally/supports/*

* `detect-focus({Node|Function, Function, Function}) : bool`
* `supports-cache : {Function, Function}`
* `css-shadow-piercing-deep-combinator : string`
* `* : bool`

## ally/util/*

* `decorate-context({Function, Function}) : {Function, …}`
* `decorate-singleton({Function, Function}) : {Function, …}`
* `node-array(mixed) : Array<Node>`
* `sort-elements-by-tabindex(Array<Node>) : Array<Node>`
* `visible-area(Node) : decimal`
