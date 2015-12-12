---
layout: doc-api.html
tags: service, argument-object
---

# ally.when.key

Executes a callback when a given key has been pressed.


## Description

This is a convenience API to avoid adding and removing keyboard event handlers and having to filter for specific keys in application code. Callbacks are executed synchronously while handling [`keydown`](https://developer.mozilla.org/en-US/docs/Web/Events/keydown) events to maintain the ability to [`event.preventDefault()`](https://developer.mozilla.org/en/docs/Web/API/Event/preventDefault).

Keyboard events are dispatched to the currently focused element (`document.activeElement`). This allows us to handle keyboard events only when the user is engaged in a particular widget.

### Key binding syntax

In order to easily register keyboard events including modifier keys, `ally.when.key` understands the following `<key-binding>` syntax:

| `<key-binding>` | primary key | keyCode | alt | ctrl | meta | shift |
|-----------------|-------------|---------|-----|------|-------|------|
| `space` | <kbd>Space</kbd> | 32 | no | no | no | no |
| `*+space` | <kbd>Space</kbd> | 32 | ? | ? | ? | ? |
| `shift+space` | <kbd>Space</kbd> | 32 | no | no | no | yes |
| `shift+*+enter` | <kbd>Enter</kbd> | 13 | ? | ? | ? | yes |
| `!shift+*+enter` | <kbd>Enter</kbd> | 13 | ? | ? | ? | no |
| `?shift+ctrl+enter` | <kbd>Enter</kbd> | 13 | no | yes | no | ? |
| `enter shift+8` | <kbd>Enter</kbd> | 13 | no | no | no | no |
| *(continued)* | <kbd>Backspace</kbd> | 8 | no | no | no | yes |

Legend: `no` means the modifier key is not pressed, `yes` means the modifier key is pressed, `?` means the state of the modifier key is ignored.

The `<key-binding>` syntax is defined by the following [EBNF](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_Form) grammar, with `property of map/keycode` referring to the property names of [`ally.map.keycode`](../map/keycode.md):

```ebnf
token-list    = token, { " ", token } ;
token         = { modifier, "+" }, key ;
key           = named-key | keycode ;
named-key     = ? property of ally.map.keycode ? ;
keycode       = ? /[0-9]+/ ? ;
modifier      = ( [ "!" | "?" ], modifier-name ) | "*" ;
modifier-name = "alt" | "ctrl" | "meta" | "shift" ;
```

### Modifier keys

The modifier keys may have different names/symbols depending on operating system and physical keyboard:

| modifier key name | physical key on keyboard |
|-------------------|--------------------------|
| alt | <kbd>Alt</kbd>, <kbd>Option</kbd> or<kbd> ⌥</kbd> on Mac) |
| ctrl | <kbd>Ctrl</kbd>, <kbd>⌃</kbd> on Mac |
| meta | <kbd>Meta</kbd>, <kbd> ⌘</kbd> or <kbd></kbd> or <kbd>Command</kbd> on Mac, <kbd>⊞</kbd> or <kbd>Windows</kbd> on Windows |
| shift | <kbd>Shift</kbd>, <kbd>⇧</kbd> on Mac |


## Usage

```js
var handle = ally.when.key({
  enter: function(event, disengage) {
    // react to <kbd>Enter</kbd>
    console.log("enter pressed on", event.target);
    disengage();
  },
  32: function(event, disengage) {
    // react to <kbd>Space</kbd>
    console.log("space pressed on", event.target);
  },
});

handle.disengage();
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement) | The scope of the DOM in which keyboard events will be processed. The first element of a collection is used. |
| filter | [`<selector>`](../concepts.md#Selector) | `null` | The elements and descendants to exclude when processing keyboard events. |
| [`<key-binding>`](#Key-binding-syntax) | function | *required* | Mapping of `<key-binding>` to callback function. See [Callback Signature](#Callback-Signature) for details. This argument is expected one or more times. |

### Returns

A [`<service>`](../concepts.md#Service) interface, providing the `handle.disengage()` method to stop the service.

### Throws

* [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if no `<key-binding>: <callback>` combinations were passed.
* [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `<key-binding>` does not resolve to a keyCode.
* [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `<key-binding>` contains illegal modifier names.
* [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `<callback>` is not a `function`.


## Callback signature

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| event | [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) | *required* | The original `keydown` event. |
| disengage | function | *required* | The service's `handle.disengage()` method. |

The callback is executed in the context of `context` (that's where `this` inside the callback points to). The callback is passed the `handle.disengage()` method to allow simplified "execute once" behaviors. The callback's return value is ignored.


## Examples

* **EXAMPLE:** [`ally.when.key` Example](./key.example.html)


## Changes

* `v#master` introduced the extended `<key-binding>` syntax (thereby changing the default modifier key behavior).
* `v#master` introduced the options `context` and `filter`.


## Notes

* **NOTE:** Firefox has a long standing issue with keyboard events propagating to the document while browser UI like autocomplete is being interacted with [Gecko 286933](https://bugzilla.mozilla.org/show_bug.cgi?id=286933).
* **WARNING:** The callback for the `<key-binding>` `space` only executes if *no* modifier key was pressed. In order to make the callback execute regardless of modifier keys, use the `<key-binding>` `*+space`.
* **NOTE:** The modifiers `alt`, `ctrl`, `meta` usually engage system-level or browser-level functionality. Do not use these modifiers lightly. For example `alt+a` prints the letter `å` on a Mac with German keyboard layout, `meta+q` exits the application and `meta+space` engages Spotlight.


## Related resources

* [`ally.map.keycode`](../map/keycode.md) used for resolving named keys
* The `<key-binding>` syntax is inspired by [PolymerElements/iron-a11y-keys](https://github.com/PolymerElements/iron-a11y-keys#grammar)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/when/key.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/when/key.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/when.key.test.js)
* uses [when/key.binding](https://github.com/medialize/ally.js/blob/master/src/when/key.binding.js) to parse `<key-binding>`
