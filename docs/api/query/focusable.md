---
layout: doc-api.html
---

# ally.query.focusable (`ally/query/focusable`)

Finds focusable elements in the DOM.

The "full picture" of [which elements are considered focusable](http://medialize.github.io/ally.js/tests/static-results/focusable.html) may help understand what an utter mess this topic is. See the [by browser comparison](http://medialize.github.io/ally.js/tests/focusable/table.html#javascript-support) for the full story on what this functions can identify and what not.


## Notes

* **NOTE:** Internet Explorer 10 does not support the [`hidden` attribute](http://www.w3.org/TR/html51/editing.html#the-hidden-attribute), so those element will be considered focusable (unless the the elements were made invisible by CC, `*[hidden] { display: none; }`).
* **NOTE:** The `<body>` element is generally considered focusable, because it is the default activeElement if no other element has focus.
* **NOTE:** The `<fieldset>` element is considered focusable by Internet Explorer 10 - 11
* **NOTE:** WebKit and Blink consider `<fieldset tabindex="0" disabled>` keyboard focusable, see [Blink 453847](https://code.google.com/p/chromium/issues/detail?id=453847), [Webkit 141086](https://bugs.webkit.org/show_bug.cgi?id=141086)
* **NOTE:** Internet Explorer 10 - 11 consider the elements `<table>`, `<tr>`, `<td>` focusable.
* **WARNING:** Elements made editable using the CSS property [`user-modify`](http://www.w3.org/TR/1999/WD-css3-userint-19990916#user-modify) are undetectable, see [issue 17](https://github.com/medialize/ally.js/issues/17).
* **WARNING:** Internet Explorer 10 - 11, as well as Edge consider the `<img>` of `<a href="#"><img ismap></a>` keyboard focusable, see [issue 20](https://github.com/medialize/ally.js/issues/20).
* **WARNING:** Internet Explorer 10 - 11 consider the children of a focusable element focusable as well, if the container uses Flexbox layout (e.g. `display: flex`).
* **WARNING:** Internet Explorer 10 - 11 consider any scrollable element focusable, see [issue 21](https://github.com/medialize/ally.js/issues/21).
* **WARNING:** Firefox cannot focus `SVGElement`s by script, thus no SVG element is considered focusable, see [Gecko 1116966](https://bugzilla.mozilla.org/show_bug.cgi?id=1116966)
* **WARNING:** WebKit and Blink make any `SVGElement` focusable that has a `focus` event listener attached, see [Blink 445798](https://code.google.com/p/chromium/issues/detail?id=445798), [WebKit 140024](https://bugs.webkit.org/show_bug.cgi?id=140024)
* **WARNING:** The `<object>` element is not reliably focusable, SWF content won't focus in Firefox, SVG content is not focusable in Internet Explorer 10 - 11 and MS Edge

## Demo

TODO: figure out how to integrate demo

## Usage

```html
<script src="path/to/ally.min.js"></script>
<script>
  var element = ally.query.focusable({
    // [optional] limit search to given DOM Element
    // defaults to document.documentElement
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '.within-filter-selector',
    // [optional] prepend the context DOM Element if it is focusable
    // defaults to false
    includeContext: true,
  });
</script>
```

Using the module instead of the production build:

```js
require([
  'ally/query/focusable'
], function(queryFocusable) {
  var element = queryFocusable({
    // [optional] limit search to given DOM Element
    // defaults to document.documentElement
    // context can be String (query selector), Node, Array of Nodes, NodeList, HTMLCollection
    // the first element element of a collection is used
    context: '.within-filter-selector',
    // [optional] prepend the context DOM Element if it is focusable
    // defaults to false
    includeContext: true,
  });
});
```

See [Getting Started](../../getting-started.md) for how to use CommonJS, AMD or ES6 modules.


## Related Resources

* [`ally/query/first-tabbable`](first-tabbable.md)
* [`ally/query/tabbable`](tabbable.md)
* [`ally/query/tabsequence`](tabsequence.md)
* [`ally/is/focusable`](../is/focusable.md) used to filter focusable elements
* [HTML5 7.4.1 The `tabindex` attribute](http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute)
* [HTML5 7.4.2 Focus Management](http://www.w3.org/TR/html5/editing.html#focus-management)
* [Which Elements Are Focusable, which are Tabbable?](http://medialize.github.io/ally.js/tests/focusable/table.html#browser-support-tabbable)
* [Which Elements Are Considered Focusable By ally.js?](http://medialize.github.io/ally.js/tests/focusable/table.html#javascript-support)


## Contribution Notes

* [module source](https://github.com/medialize/ally.js/blob/master/src/query/focusable.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/query/focusable.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/query.focusable.test.js)


---

Back to the [API Documentation](../README.md).

