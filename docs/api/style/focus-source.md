---
layout: doc-api.html
tags: shadow-dom
apiModuleName: ally/style/focus-source
apiBuiltName: ally.style.focusSource
---

# ally.style.focusSource

Differentiate the causes of focus change for when different visual styles need to applied.

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

What ally.js calls "focus source" has been proposed (by others) as [`modality: keyboard` media query](https://github.com/bkardell/modality/blob/master/docs/modality-mq.md) and a [prollyfill](https://github.com/alice/modality) is available, too.


## Notes

* **NOTE:** We are unaware of any best practices concerning different focus outline styling depending on user interaction device


## Demo

TODO: figure out how to integrate demo


## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  // engage focus source style for the entire document
  var handle = ally.style.focusSource();
  // disengage focus source style
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
</script>
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/style/focus-within`](focus-within.md)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/style/focus-source.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/style/focus-source.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/style.focus-source.test.js)


