---
layout: doc-api.html
tags: shadow-dom, global-service, argument-object
---

# ally.style.focusSource

Differentiate the causes of focus change for when different visual styles need to applied.


## Description

The utility identifies `pointer` (mouse, touch), `key` (keyboard) and `script` as sources for an element being focused. The information is made available to CSS via `<html data-focus-source="key">`. The classes `.focus-source-key`, `.focus-source-pointer`, `.focus-source-script` are made available on `<html>` when the respective focus source occurs for the first time. When the utility is initialized, the focus source is `<html data-focus-source="initial">`.

This module allows the document to style `:focus` as follows:

```css
body :focus {
  /* default styling in case JS broke */
  background: yellow;
}
html[data-focus-source="initial"] > body :focus {
  /* styling for when focus was not changed yet */
  background: green;
}
html[data-focus-source="pointer"] > body :focus {
  /* styling for when focus was given by pointer (mouse, touch) */
  background: red;
}
html[data-focus-source="key"] > body :focus {
  /* styling for when focus was given by keyboard */
  background: blue;
}
html[data-focus-source="script"] > body :focus {
  /* styling for when focus was given by neither pointer nor keyboard */
  background: orange;
}

html.focus-source-key > body :focus {
  /* styling for when focus was changed at least once using the keyboard */
  background: magenta;
}
```

The focus changes are also observed within the Shadow DOM, allowing the document styles to descend into the dark:

```css
html[data-focus-source="pointer"] >>> :focus {
  /* styling for when focus was given by pointer (mouse, touch) */
  background: red;
}

/* older shadow-piercing-combinator notation */
html[data-focus-source="pointer"] /deep/ :focus {
  /* styling for when focus was given by pointer (mouse, touch) */
  background: red;
}
```


## Usage

```js
var handle = ally.style.focusSource();

handle.disengage();

// get current focus source
handle.current(); // "key", "pointer", "script"

// test if a focus source has occured before
handle.used("key"); // true, false

// make the next focus event set a specified source
// regardless of the identified interaction type
// false acts as a reset
handle.next("pointer");

// make the next focus event set the current source
// alias for: focusSource.next(focusSource.current());
// false acts as a reset
handle.repeat();

// make all focus events set a specified source
// regardless of the identified interaction type
// false acts as a reset
handle.lock("pointer");
```

### Arguments


### Returns

A [`<global-service>`](../concepts.md#Global-Service) interface, providing the `handle.disengage()` method to stop the service.

### Throws


## Service Handle

The `handle` is returned when engaging the service. As the [`<global-service>`](../concepts.md#Global-Service) interface describes, the `handle.disengage()` method is provided to stop the service. Additionally the following methods are made available:

### handle.current()

The `handle.current()` method does not accept any arguments and returns one of the following strings `"key"`, `"pointer"`, `"script"`, depending on the current interaction type.

### handle.used(`<string>`)

The `handle.used()` method accepts one string argument and returns `true` if it matches the current interaction type.

### handle.next(`<string>`)

The `handle.next()` method accepts one string argument and sets that as the interaction type available to the next (and only the next) `handle.current()` invocation.

### handle.repeat()

The `handle.repeat()` method does not accept any arguments and sets the current interaction to be returned by the next (and only the next) `handle.current()` invocation.

### handle.lock(`<string>`)

The `handle.lock()` method accepts one string argument and sets that as the interaction type for all subsequent `handle.current()` invocations. The lock is reset when `false` is passed.


## Examples

* **EXAMPLE:** [`ally/style/focus-source` Example](./focus-source.example.html)


## Notes


## Related Resources

* [WICG: Exposing a user’s input modality](https://discourse.wicg.io/t/exposing-a-users-input-modality/1067) and accompanying [prollyfill](https://github.com/alice/modality)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/style/focus-source.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/style/focus-source.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/style.focus-source.test.js)

