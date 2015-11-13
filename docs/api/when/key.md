---
layout: doc-api.html
tags: service, argument-object
---

# ally.when.key

Executes a callback when a given key has been pressed.


## Description

This is a convenience API to avoid adding and removing keyboard event handlers and having to filter for specific keys in application code. Callbacks are executed on `keydown`.


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

The method accepts an object of `<key>: <callback>` mappings. See [Callback Signature](#Callback-Signature) for details

`<key>`s can be specified as a numeric code ([`keyCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)) e.g. `13` for the <kbd>Enter</kbd> key, or as the string name `enter` which is resolved to the numeric code internally using [`ally.map.keycode`](../map/keycode.md). Multiple `<key>: <callback>` combinations can be passed.

### Returns

A [`<service>`](../concepts.md#Service) interface, providing the `handle.disengage()` method to stop the service.

### Throws

* [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `<ke>` is neither numeric, nor found in [`ally.map.keycode`](../map/keycode.md).
* [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `<callback>` is not a `function`.
* [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) when no `<key>: <callback>` combinations were passed.

## Callback Signature

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| event | [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) | *required* | The original `keydown` event. |
| disengage | function | *required* | The service's `handle.disengage()` method. |

The callback is executed in the context of `document.documentElement` (that's where `this` inside the callback points to). The callback is passed the `handle.disengage()` method to allow simplified "execute once" behaviors. The callback's return value is ignored.


## Examples

* **EXAMPLE:** [`ally.when.key` Example](./key.example.html)


## Notes

* **NOTE:** Firefox has a long standing issue with keyboard events propagating to the document while browser UI like autocomplete is being interacted with [Gecko 286933](https://bugzilla.mozilla.org/show_bug.cgi?id=286933).


## Related Resources

* [`ally.map.keycode`](../map/keycode.md) used for resolving named keys


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/when/key.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/when/key.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/when.key.test.js)

