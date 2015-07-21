---
layout: doc-api.html
---

# ally.map.attribute (`ally/map/attribute`)

Map of all [WAI-ARIA states and properties](http://www.w3.org/TR/wai-aria/states_and_properties)

```js
// example structure
var map = {
  // http://www.w3.org/TR/wai-aria/states_and_properties#aria-invalid
  'aria-invalid': {
    'default': 'false',
    values: ['true', 'false', 'grammar', 'spelling'],
  },

  // http://www.w3.org/TR/wai-aria/states_and_properties#aria-relevant
  'aria-relevant': {
    'default': 'additions text',
    multiple: true,
    values: ['additions', 'removals', 'text', 'all'],
  },
}
```

## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  console.log(ally.map.attribute['aria-busy']);
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/map/attribute'
], function(attribute) {
  console.log(attribute['aria-busy']);
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/map/keycode`](keycode.md)


## Contributor Notes

* [module source](https://github.com/medialize/ally.js/blob/build-modules/src/map/attribute.js)
* [document source](https://github.com/medialize/ally.js/blob/build-modules/docs/api/map/keycode.md)


---

Back to the [API Documentation](../README.md).

