---
layout: doc-api.html
tags: shadow-dom
apiModuleName: ally/maintain/hidden
apiBuiltName: ally.maintain.hidden
---

# ally.maintain.disabled (`ally/maintain/disabled`)

sets `aria-hidden="true"` on insignificant branches.

This allows an application to make sure no elements *other than the exempted* are exposed to the Accessibility Tree. This is necessary when rendering modal dialogs to prevent screen readers from accessing supposedly inert content.

`maintain/disabled` observes DOM manipulations and automatically hides newly added elements when necessary.


## Notes

* **NOTE:** Internet Explorer 10 will not update changes made to elements within the inert sub-trees, because it does not support [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) and [Mutation Events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events) are too much of a burden.


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  // render elements inert so they can't be interacted with
  var handle = ally.maintain.hidden({
    // [optional] hiding elements within this sub-tree (default: document)
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '.within-filter-selector',
    // pervent hiding elements within these sub-trees
    // filter can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    filter: '.except-filter-selector'
  });
  // un-inert all elements
  handle.disengage();
</script>
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/maintain/disabled`](disabled.md)
* [`ally/get/insignificant-branches`](../get/insignificant-branches.md) to identify the branches to hide


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/maintain/hidden.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/maintain/hidden.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/maintain.hidden.test.js)


---

Back to the [API Documentation](../README.md).

