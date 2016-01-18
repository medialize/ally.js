---
layout: doc-api.html
tags: data
---

# ally.map.attribute

Map of all [WAI-ARIA states and properties](http://www.w3.org/TR/wai-aria/states_and_properties).


## Description

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
};
```

## Usage

```js
console.log(ally.map.attribute['aria-busy']);
```


## Related resources


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/map/attribute.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/map/keycode.md)

