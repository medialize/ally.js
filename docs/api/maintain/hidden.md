---
layout: doc-api.html
tags: service, argument-object
---

# ally.maintain.disabled

Sets `aria-hidden="true"` on insignificant branches.


## Description

This allows an application to make sure no elements *other than the exempted* are exposed to the Accessibility Tree. This is necessary when rendering modal dialogs to prevent screen readers from accessing supposedly inert content.

`ally.maintain.hidden` observes DOM manipulations and automatically hides newly added elements when necessary.


## Usage

```js
var handle = ally.maintain.hidden({
  context: '.within-filter-selector',
  filter: '.except-filter-selector'
});

handle.disengage();
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| context | [`<selector>`](../concepts.md#Selector) | [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement) | The scope of the DOM in which to search. The first element of a collection is used. |
| filter | [`<selector>`](../concepts.md#Selector) | `null` | The *significant elements* to exclude from being disabled. |

### Returns

A [`<service>`](../concepts.md#Service) interface, providing the `handle.disengage()` method to stop the service.

### Throws


## Examples

* **EXAMPLE:** [`ally.maintain.hidden` Example](./hidden.example.html)


## Notes

* **NOTE:** Internet Explorer 10 will not update changes made to elements within the inert sub-trees, because it does not support [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) and [Mutation Events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events) are too much of a burden.


## Related resources

* [`ally.maintain.disabled`](disabled.md) is a [service](../concepts.md#Service) disabling interactive elements in the DOM
* [`ally.get.insignificantBranches`](../get/insignificant-branches.md) is used to identify the elements to hide


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/maintain/hidden.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/maintain/hidden.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/maintain.hidden.test.js)

