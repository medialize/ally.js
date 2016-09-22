---
layout: doc-page.html
---

# API concepts

This document explains the concepts, structures and data types used in ally.js

## Function signatures

By function signature we generally understand the combination of function name, arguments and return type. ally.js takes great care to provide consistent signatures across its components. Considering only a specific component, the generalized signatures may seem a bit over-engineered. But when considering the grander scheme the dogged application of the same concepts reduce guess-work on the API user's side.

### Single options argument

The components ally.js provides usually accept a single argument, a so call options object. By enforcing this pattern, it is becomes immediately clear what the individual arguments are intended to do:

```js
exampleWithoutOptions(document.body, '#gustav');

exampleWithOptions({
  context: document.body,
  filter: '#gustav',
});
```

Most components will accept or even require an option called `context`. Depending on the component in question, this is either the scope of the DOM to operate in, or the element to operate on. There are components that *only* accept the `context` option, but retain the option argument signature for consistency.

### Failing silently and throwing errors

When arguments passed to a function lead to a no-op ("no operation performed"), that function is required to fail silently. This means that it will simply return an empty set or `null`. However, when a function is passed arguments, or *not* passed required arguments, the function will throw a [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) to alert the API user to a possible issue in their code.


## Selector

Many components work on the DOM. Components ingest elements identified by various `<selector>` types:

* [CSS Selector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)
* [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement)
* array of [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement)
* [`NodeList`](https://developer.mozilla.org/en/docs/Web/API/NodeList)
* [`HTMLCollection`](https://developer.mozilla.org/en/docs/Web/API/HTMLCollection)
* [`jQuery`](https://api.jquery.com/jQuery/) instance


## Focus identification exceptions

Modules dealing with the focus identity of elements (e.g. the `rules()` functions of `ally.is.focusable`, `ally.is.tabbable`, …) may accept an options object called `except` to customize the way focus identity is determined.

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| flexbox | boolean | `false` | Prevent elements from being considered focus-relevant because of having Flexbox layout. |
| scrollable | boolean | `false` | Prevent elements from being considered focus-relevant because of being scrollable. |
| shadow | boolean | `false` | Prevent elements from being considered focus-relevant because of being a `ShadowHost`. |
| disabled | boolean | `false` | Prevent elements from *not* being considered focusable because they're disabled (e.g. `<input disabled>`). |
| visible | boolean | `false` | Prevent elements from *not* being considered focusable because they're hidden (e.g. `<input style="display: none">`). |
| onlyFocusableBrowsingContext | boolean `false` | Prevent elements from *not* being considered focusable if their browsing context host element (e.g. `<iframe>`, `<object>`) has `tabindex="-1"` set. |
| onlyTabbable | boolean | `false` | Prevent elements from *not* being considered focusable because they're only keyboard focusable. |
| notRendered | boolean | `false` | Prevent elements from being considered visible that can't be rendered (e.g. `<area>`). |
| cssDisplay | boolean | `false` | Prevent elements from being considered invisible because of `display: none`. |
| cssVisibility | boolean | `false` | Prevent elements from being considered invisible because of `visibility: hidden`. |
| detailsElement | boolean | `false` | Prevent elements from being considered invisible because of being nested in a closed `<details>` element. |
| browsingContext | boolean | `false` | Prevent elements from being considered invisible because of being nested in an invisible browsing context (`<iframe>` or `<object>`). |

## Service

A Service (`<service>`) is a utility that continuously performs an action. A service usually observes the DOM or waits for events to be processed. Services can be started and stopped. Think of services as event listeners that you attach and remove when necessary. But unlike disconnect between [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) and [`removeEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener), ally.js services make it easy to disengage (stop, remove, abort, …):

```js
// start a service
var handle = service({ options });
// stop the service
handle.disengage();
```

While most services will only return an object containing the `disengage()` function, some do provide more functionality. To maintain consistency, all services return a handle object.

### Global service

A Global Service (`<global-service>`) is a component that exposes [Service](#service) API, but will only start a single instance and keep track of its users. This allows ally.js to get by without a service registry in order to reduce complexity. Global Services don't have any arguments and always return the same handle object.

```js
// start the service
var handle = service();
// start the service again
var handle2 = service();
// stop the service - service is still running because of handle2
handle.disengage();
// stop the service - now the service actually stops
handle2.disengage();
// global services always return the same handle object
handle === handle2;
```
