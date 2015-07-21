---
layout: doc-api.html
---

# ally.is.validArea (`ally/is/valid-area`)

Determines if an `<area>` element is properly used via `<map>` by an `<img>`.


## Notes

* [object element usemap should be deprecated](https://www.w3.org/Bugs/Public/show_bug.cgi?id=27756)
* [Sequential Navigation Focus Order for Image Maps](https://www.w3.org/Bugs/Public/show_bug.cgi?id=27787)
* **NOTE:** Firefox only allows fully loaded images to reference image maps
* **NOTE:** Multiple use of same image map hides elements from tabbing sequence - [Gecko 1116126](https://bugzilla.mozilla.org/show_bug.cgi?id=1116126)


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var element = document.getElementById('victim');
  var validArea = ally.is.validArea(element);
  // validArea is a boolean
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/is/valid-area'
], function(isValidArea) {
  var element = document.getElementById('victim');
  var validArea = isValidArea(element);
  // validArea is a boolean
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/is/disabled`](disabled.md)
* [`ally/is/focusable`](focusable.md)
* [`ally/is/shadowed`](shadowed.md)
* [`ally/is/tabbable`](tabbable.md)
* [`ally/is/valid-tabindex`](valid-tabindex.md)
* [`ally/is/visible`](visible.md)
* [HTML5 4.7.11 The Map Element](http://www.w3.org/TR/html5/embedded-content-0.html#the-map-element)
* [HTML5 4.7.12 The Area Element](http://www.w3.org/TR/html5/embedded-content-0.html#the-area-element)
* [HTML5 4.7.13 Image Maps](http://www.w3.org/TR/html5/embedded-content-0.html#image-maps)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/build-modules/src/is/valid-area.js)
* [document source](https://github.com/medialize/ally.js/blob/build-modules/docs/api/is/valid-area.md)


---

Back to the [API Documentation](../README.md).

