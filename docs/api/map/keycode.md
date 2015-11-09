---
layout: doc-api.html
apiModuleName: ally/map/keycode
apiBuiltName: ally.map.keycode
---

# ally.map.keycode

Map of control [`event.keyCode`](https://developer.mozilla.org/en-US/docs/Web/API/event.keyCode)s

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
}
```

## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  console.log(ally.map.keycode.enter);
</script>
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/map/keycode`](keycode.md)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/map/keycode.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/map/keycode.md)


