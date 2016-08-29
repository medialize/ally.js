---
layout: doc-api.html
tags: shadow-dom, service, argument-options
---

# ally.maintain.disabled

Disables any type of user interaction - including the ability to focus elements - essentially rendering elements *inert*.


## Description

This allows an application to make sure no element *other than the exempted* can be focused. This is method is superior to the idea of trapping focus by intercepting <kbd>Tab</kbd>, because it allows cycling through the browser UI and is not as prone to break for spatial focus navigation (i.e. any sort of focus navigation that does not use the <kbd>Tab</kbd> key). The major benefit of disabling focus of elements is that in turn we do not have to meddle with the user's interaction to actually change focus - we can leave that to the browser.

Elements are disabled by [`ally.element.disabled`](../element/disabled.md) and can be identified in the DOM by the attribute `[data-ally-disabled="true"]` to align with styling of other `:disabled` elements.

The proposed `inert` attribute was [removed from HTML5](https://html5.org/r/8536), because people thought [inert subtrees](http://www.w3.org/html/wg/drafts/html/master/editing.html#inert-subtrees) by way of the `<dialog>` element would suffice. While we believe *it doesn't*, the `inert` attribute would only have solved half of the problem, because there's no way to avoid inheriting the inert state onto children. This behavior can be observed in the [Google Chrome Inert Attribute Polyfill](https://github.com/GoogleChrome/inert-polyfill).

* **NOTE:** The [WICG](https://wicg.io/) (Web Incubater Community Group) is working on [reviving the inert attribute](https://github.com/wicg/inert) (including a polyfill).
* **NOTE:** There [WHATWG](http://whatwg.org/) is discussing a [blockElements API](https://github.com/whatwg/html/issues/897) that would cover the primary use-case of `ally.maintain.disabled` in a much better way.

`ally.maintain.disabled` observes DOM manipulations and automatically disables newly added elements when necessary.


## Usage

```js
var handle = ally.maintain.disabled({
  context: '.within-filter-selector',
  filter: '.except-filter-selector',
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

* **EXAMPLE:** [`ally.maintain.disabled` Example](./disabled.example.html)


## Changes

* Since `v1.1.0` changing `tabindex` attribute values are properly handled.
* Since `v1.1.0` the `disengage()` method reverts elements within ShadowHosts to their previous state.
* Since `v1.1.0` DOM mutations within `ShadowRoot`s are properly observed.
* Since `v1.1.0` initially disabled elements are not accidentally enabled when disengaging the service.
* Since `v1.1.1` ancestors of exempted sub-trees (defined by `filter` option) are *not* disabled anymore.


## Notes

* **NOTE:** `ShadowHost`s are pierced and `ShadowRoot` content is made inert as well (except for closed shadow trees).
* **NOTE:** Internet Explorer 10 will not update changes made to elements within the inert sub-trees, because it does not support [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) and [Mutation Events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events) are too much of a burden.
* **WARNING:** Any element not identified as focus relevant by [`ally.is.focusRelevant`](../is/focus-relevant.md#Notes) and not identified as only tabbable by [`ally.is.onlyTabbable`](../is/only-tabbable.md#Notes) is *not* made inert either. See the [identified elements using `strategy: "strict"` compatibility table](../../data-tables/focusable.strict.md).


## Related resources

* [`ally.maintain.hidden`](../maintain/hidden.md) is a [service](../concepts.md#Service) hiding insignificant branches from the [Accessibility Tree](../../concepts.md#Accessibility-tree)
* [`ally.query.focusable`](../query/focusable.md) is used to identify the elements to disable
* [`ally.element.disabled`](../element/disabled.md) is used to disable the elements


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/maintain/disabled.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/maintain/disabled.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/maintain.disabled.test.js)

