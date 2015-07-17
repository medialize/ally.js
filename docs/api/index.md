
# ally.js API

When creating web applications or UI widgets these modules may come in handy.

## ally/fix-browser/*          ("ally/fix/*")

* pointer-focus-children({NodeArray}) : {Function}
* pointer-focus-input({NodeArray}) : {Function}
* pointer-focus-parent({NodeArray}) : {Function}

## ally/style/*

* focus-source() : {Function}
* focus-within() : {Function}

## ally/focus/*

* disable({NodeArray, NodeArray}) : {Function}
* trap({NodeArray[1], bool}) : {Function}
  * trap/capture-body (contributor notes)
  * trap/focusevent (contributor notes)
  * trap/keyevent (contributor notes)
  * trap/observe-body (contributor notes)

## ally/query/* {context, …}

* first-tabbable({NodeArray[1], bool, bool}) : Node|null
* focusable({NodeArray[1], bool}) : Array<Node>
* tabbable({NodeArray[1], bool}) : Array<Node>
* tabsequence({NodeArray[1], bool}) : Array<Node>

## ally/is/* (Node)

* is-disabled(Node) : bool
* is-focusable(Node) : bool
* is-shadowed(Node) : bool
* is-tabbable(Node) : bool
* is-valid-area(Node) : bool
* is-valid-tabindex(Node) : bool
* is-visible(Node) : bool

## ally/when/*

* focusable({NodeArray[1], Function, decimal}) : {Function}
* visible({NodeArray[1], Function, decimal}) : {Function}

---

# ally.js API (Developer Modules)

When creating libraries these modules may come in handy.

**Note:** When you find yourself using one of these in your application code, we should talk about what you're trying to achieve and how we could do that as part of the library instead. Get in touch, [file an issue](https://github.com/medialize/ally.js/issues) explaining what you're trying to achieve!

## ally/get/* {context}

* active-elements() : Array<Node>
* focus-target(Node) : Node|null
* parents(Node) : Array<Node>
* shadow-host-ancestors(Node) : Array<Node>
* shadow-host(Node) : Node|null

## ally/event/*

* active-element() : {Function}
* shadow-focus() : {Function}

## ally/observe/*

* interaction-type() : {Function, Function}

## ally/map/*

* attribute : Object
* keycode : Object

---

# ally.js API (Contributor Modules)

When working on ally.js these modules may come in handy.

**Note:** When you find yourself using one of these in your application or library code, we should talk about what you're trying to achieve and how we could do that as part of the library instead. Get in touch, [file an issue](https://github.com/medialize/ally.js/issues) explaining what you're trying to achieve!

## ally/prototype/*

* element.prototype.matches : void
* svgelement.prototype.focus : void
* window.customevent : void

## ally/selector/*

* focusable : string

## ally/supports/*

* detect-focus({Node|Function, Function, Function}) : bool
* supports-cache : {Function, Function}
* css-shadow-piercing-deep-combinator : string
* * : bool

## ally/util/*

* decorate-context({Function, Function}) : {Function, …}
* decorate-singleton({Function, Function}) : {Function, …}
* node-array(mixed) : Array<Node>
* sort-elements-by-tabindex(Array<Node>) : Array<Node>
* visible-area(Node) : decimal
