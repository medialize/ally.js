---
layout: doc-api.html
tags: shadow-dom
apiModuleName: ally/maintain/disabled
apiBuiltName: ally.maintain.disabled
---

# ally.maintain.disabled (`ally/maintain/disabled`)

Disables any type of user interaction - including the ability to focus elements - essentially rendering elements *inert*.

This allows an application to make sure no element *other than the exempted* can be focused. This is method is superior to [trapping focus](./focus-trapped.md) because it allows cycling through the browser UI and is not as prone to break for spatial focus navigation (i.e. any sort of focus navigation that does not use the <kbd>Tab</kbd> key). The major benefit of disabling focus of elements is that in turn we do not have to meddle with the user's interaction to actually change focus - we can leave that to the browser.

The proposed `inert` attribute was [removed from HTML5](https://html5.org/r/8536), because people thought [inert subtrees](http://www.w3.org/html/wg/drafts/html/master/editing.html#inert-subtrees) by way of the `<dialog>` element would suffice. While we believe *it doesn't*, the `inert` attribute would only have solved half of the problem, because there's no way to avoid inheriting the inert state onto children. This behavior can be observed in the [Google Chrome Inert Attribute Polyfill](https://github.com/GoogleChrome/inert-polyfill).

`maintain/disabled` observes DOM manipulations and automatically disables newly added elements when necessary.


## Notes

* **NOTE:** `ShadowHost`s are pierced and `ShadowRoot` content is made inert as well (except for closed shadow trees).
* **NOTE:** Internet Explorer 10 will not update changes made to elements within the inert sub-trees, because it does not support [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) and [Mutation Events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events) are too much of a burden.
* **WARNING:** Any element not identified as focus relevant by [`ally/is/focus-relevant`](../is/focus-relevant.md#Notes) and not identified as only tabbable by [`ally/is/only-tabbable`](../is/only-tabbable.md#Notes) is *not* made inert either. See the [identified elements using `strategy: "strict"` compatibility table](../../data-tables/focusable.strict.md).


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  // render elements inert so they can't be interacted with
  var handle = ally.maintain.disabled({
    // [optional] inerting elements within this sub-tree (default: document)
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '.within-filter-selector',
    // [optional] prevent inerting elements within these sub-trees (default: null)
    // filter can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    filter: '.except-filter-selector'
  });
  // un-inert all elements
  handle.disengage();
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/maintain/disabled'
], function(maintainDisabled) {
  // render elements inert so they can't be interacted with
  var handle = maintainDisabled({
    // [optional] inerting elements within this sub-tree (default: document)
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '.within-filter-selector',
    // [optional] prevent inerting elements within these sub-trees (default: null)
    // filter can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    filter: '.except-filter-selector'
  });
  // un-inert all elements
  handle.disengage();
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/maintain/focus-trapped`](focus-trapped.md)
* [`ally/maintain/hidden`](hidden.md)
* [`ally/query/focusable`](../query/focusable.md) used to identify the elements to make inert
* [`ally/element/disabled`](../element/disabled.md) used to make elements inert


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/maintain/disabled.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/maintain/disabled.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/maintain.disabled.test.js)


---

Back to the [API Documentation](../README.md).

