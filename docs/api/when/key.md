---
layout: doc-api.html
---

# ally.when.key (`ally/when/key`)

Executes a callback when a given key has been pressed.


## Notes

* **NOTE:** Firefox has a long standing issue with keyboard events propagating to the document while browser UI like autocomplete is being interacted with [Gecko 286933](https://bugzilla.mozilla.org/show_bug.cgi?id=286933).


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  // wait until key is pressed
  var handle = ally.when.key({
    // the key can either be the numeric keyCode (e.g. 13 for enter)
    // or a name off the ally/map/keycode map
    enter: function(event, disengage) {
      // react to <kbd>enter</kbd>
      // event contains the original KeyboardEvent object
      // disengage the key listener handle right from the callback
      // this disengages all handlers that were registered for this handle
      disengage();
    },
  });
  // abort waiting for key to be pressed
  handle.disengage();
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/when/key'
], function(whenKey) {
  // wait until key is pressed
  var handle = whenKey({
    // the key can either be the numeric keyCode (e.g. 13 for enter)
    // or a name off the ally/map/keycode map
    enter: function(event, disengage) {
      // react to <kbd>enter</kbd>
      // event contains the original KeyboardEvent object
      // disengage the key listener handle right from the callback
      // this disengages all handlers that were registered for this handle
      disengage();
    },
  });
  // abort waiting for key to be pressed
  handle.disengage();
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/when/focusable`](focusable.md)
* [`ally/when/visible-area`](visible-area.md)
* [`ally/map/keycode`](../map/keycode.md) used for resolving named keys


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/when/key.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/when/key.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/when.key.test.js)


---

Back to the [API Documentation](../README.md).

