---
layout: doc-api.html
---

# ally.element.disabled (`ally/element/disabled`)

Makes an element inert, i.e. not editable.

HTML knows the [`:disabled`](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Adisabled) state for form elements, but lacks something similar for all the other interactive elements. This utility makes a form of this convenient state available to every element.

Elements that were made inert by `ally/element/disabled` can be identified in the DOM by the attribute `[data-ally-disabled="true"]` to align with styling of other `:disabled` elements.

The following things are done in order to make an element inert:

* adding `tabindex="-1"` attribute to remove element from document's focus navigation sequence
* adding the `focusable="false"` attribute on `SVGElement`
* removing the `controls` attribute from `<audio>` and `<video>` elements
* overwriting `element.focus()` to prevent focusing the element by script
* adding the CSS property `pointer-events: none;` to prevent any interaction from mouse and touch
* adding `aria-disabled="true"` to inform the AccessibilityTree of the element's state


## Notes

* **WARNING:** Internet Explorer 10 - 11 leave a few disabled elements focusable and thus editable to the mouse, but not keyboard focusable [Trident 962368](https://connect.microsoft.com/IE/feedbackdetail/view/962368), [Trident 817488](https://connect.microsoft.com/IE/feedbackdetail/view/817488) (ally.js does not fix that). One can prevent this wrong behavior by adding `:disabled { pointer-events: none; }`.
* **NOTE:** In Google Chrome `<audio controls>` and `<video controls>` elements are made inert by removing the `controls` attribute - [Blink 512133](https://code.google.com/p/chromium/issues/detail?id=512133)


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var element = document.getElementById('victim');
  // disable the element
  ally.element.disabled(element, true);
  // enable the element
  ally.element.disabled(element, false);
  // check the elements disabled state
  var disabled = ally.element.disabled(element);
  // disabled is a boolean
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/element/disabled'
], function(elementDisabled) {
  var element = document.getElementById('victim');
  // disable the element
  elementDisabled(element, true);
  // enable the element
  elementDisabled(element, false);
  // check the elements disabled state
  var disabled = elementDisabled(element);
  // disabled is a boolean
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/is/disabled`](../is/disabled.md)
* [`ally/maintain/disabled`](../maintain/disabled.md)
* [HTML5 4.13 Disabled Elements](http://www.w3.org/TR/html5/disabled-elements.html#disabled-elements)
* [WICG: Adding a [disabled] attribute to `<a>`s](http://discourse.wicg.io/t/adding-a-disabled-attribute-to-a-s/1116)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/element/disabled.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/element/disabled.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/element.disabled.test.js)


---

Back to the [API Documentation](../README.md).

