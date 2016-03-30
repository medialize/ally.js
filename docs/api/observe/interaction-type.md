---
layout: doc-api.html
tags: internal, global-service
---

# ally.observe.interactionType

Observes user interaction method to distinguish pointer and keyboard actions.


## Description

Observes keyboard-, pointer-, mouse- and touch-events so that a query for the current interaction type can be made at any time. For pointer interaction this observer is limited to pointer button down/up - move is not observed!


## Usage

```js
var handle = ally.observe.interactionType();
// stop observing
handle.disengage();

// query current interaction type
var type = handle.get();
```

### Arguments


### Returns

A [`<global-service>`](../concepts.md#Global-service) interface, providing the `handle.disengage()` method to stop the service.

### Throws


## Service handle

The `handle` is returned when engaging the service. As the [`<global-service>`](../concepts.md#Global-service) interface describes, the `handle.disengage()` method is provided to stop the service. Additionally the following methods are made available:

### handle.get()

The `handle.get()` method does not accept any arguments and returns an object with the following properties:

| Name | Type | Description |
| ---- | ---- | ----------- |
| key | boolean | `true` if any key is currently pressed. |
| pointer | boolean | `true` if any mouse button (or pointer, or touch) is currently pressed. |


## Examples


## Notes


## Related resources


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/observe/interaction-type.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/observe/interaction-type.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/observe.interaction-type.test.js)
* [functional test](https://github.com/medialize/ally.js/blob/master/test/functional/observe.interaction-type.test.js)

