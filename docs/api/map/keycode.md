---
layout: doc-api.html
tags: data
---

# ally.map.keycode

Map human readable names for [`event.keyCode`](https://developer.mozilla.org/en-US/docs/Web/API/event.keyCode)s.


## Description

```js
// example structure
var map = {
  // Element Focus
  tab: 9,

  // Navigation
  left: 37,
  up: 38,
  // ...
  home: 36,

  // Action
  enter: 13,
  escape: 27,
  space: 32,

  // Function keys
  f1: 112,
  // ...

  // Numeric keys
  0: 48,
  1: 49,
  // ...
  'num-0': 96,
  'num-1': 97,
  // ...

  // Latin characters
  a: 65,
  // ...
  z: 90,
};
```

The map knows the following keys:

* `a` - `z`
* `0` - `9`
* `num-0` - `num-9` (number block)
* `f1` - `f25` (function keys)
* `down`, `left`, `right`, `up` (arrow keys)
* `end`, `home`, `pageDown`, `page-down`, `pageUp`, `page-up`
* `enter`, `escape`, `space`, `tab`
* `alt`, `capsLock`, `caps-lock`, `ctrl`, `meta`, `shift`
* `pause`, `insert`, `delete`, `backspace`


## Usage

```js
console.log('keycode of enter', ally.map.keycode.enter);
```


## Changes

* `v1.1.0` replaced the key `command` by `meta`.
* `v1.1.0` added `a` - `z`, `0` - `9`, `num-0` - `num-9`, `f13` - `f25`, `page-down`, `page-up`, `caps-lock`.
* `v1.1.0` added `_alias` to resolve multiple keyCodes for the same logical key.


## Notes

* **NOTE:** The key `meta` is known by different keyCodes: `91`, `92`, `93`, `224` - which `ally.map.keycodes.alias.91` helps to resolve. The same is true for numeric keys (0-9) and their counterparts on the numblock.


## Related resources

* [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) may help deal with this mess in the future.


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/map/keycode.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/map/keycode.md)

