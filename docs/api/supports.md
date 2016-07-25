---
layout: doc-page.html
tags: internal
---

# Supports - Browser compatibility

The supports infrastructure is a set of tests determining browser behavior and compatibility at runtime. This piece of the infrastructure does for focus management what [Modernizr](https://modernizr.com/) does for the rest of the web platform.

The tests change focus to detect compatibility and thereby cause focus change announcements in screen readers, as well as [force the browser to perform layout / reflow operations](https://gist.github.com/paulirish/5d52fb081b3570c81e3a#what-forces-layout--reflow), commonly known as [layout thrashing](http://kellegous.com/j/2013/01/26/layout-performance/). To limit these effects, tests are performed in an iframe and cached in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), so only the first impression of a document on a given domain will have to live with the overhead.

For the tests to run properly, the document needs to have focus during execution. If it does not, e.g. because the browser's DevTools have focus, the cache is invalidated.


## Available compatibility tests

| Test Name | Return Type | Description |
| --------- | ----------- | ----------- |
| css-shadow-piercing-deep-combinator | string (`">>>"`, `"/deep/"` `""`) | the browser's support for [selecting through Shadow DOM](http://dev.w3.org/csswg/css-scoping/#deep-combinator), empty string if not supported |
| focus-area-img-tabindex | boolean | true if `<area>` is focusable for `<img tabindex="-1" usemap="…">` |
| focus-area-tabindex | boolean | true if `<area href="…" tabindex="-1">` is focusable |
| focus-area-without-href | boolean | true if `<area tabindex="-1">` is focusable |
| focus-audio-without-controls | boolean | true if `<audio>` is focusable (while only `<audio controls>` should be) |
| focus-broken-image-map | boolean | true if `<area>` is focusable although the `<img>` using the `<map>` is not properly loaded |
| focus-children-of-focusable-flexbox | boolean | true if `<span>` in `<a href="…" style="display:flex;"><span>` is focusable |
| focus-fieldset-disabled | boolean | true if `<fieldset tabindex="0" disabled>` is focusable |
| focus-fieldset | boolean | true if `<fieldset>` is focusable |
| focus-flexbox-container | boolean | true if `<span style="display: flex">` is focusable |
| focus-form-disabled | boolean | true if `<fieldset tabindex="0" disabled>` is focusable |
| focus-img-ismap | boolean | true if `<img>` in `<a href="–"><img ismap src="…">` is focusable |
| focus-img-usemap-tabindex | boolean | true if `<img usemap="#…">` is focusable |
| focus-in-hidden-iframe | boolean | true if content within `<iframe style="visibility: hidden">` is focusable |
| focus-in-zero-dimension-object | boolean | true if content within `<object height="0">` is focusable |
| focus-invalid-tabindex | boolean | true if `<div tabindex="invalid-value">` is focusable |
| focus-label-tabindex | boolean | true if `<label tabindex="-1">` is focusable |
| focus-object-svg | boolean | true if `<object type="image/svg+xml" data="…">` is focusable |
| focus-object-svg-hidden | boolean | true if `<object type="image/svg+xml" data="…" style="visibility: hidden">` is focusable |
| focus-object-swf | boolean | true if `<object type="application/x-shockwave-flash" data="…">` is focusable |
| focus-redirect-legend | string (`"focusable"`, `"tabbable"`, `""`) | the browser's query method for identifying the target for passing focus from `<legend>`  |
| focus-redirect-img-usemap | boolean | true if `img.focus()` passes focus to the first `<area>` of the associated element |
| focus-scroll-body | boolean | true if the child element of a scrollable area is focusable |
| focus-scroll-container-without-overflow | boolean | true if a scrollable element is focusable (without being made scrollable using the CSS property `overflow` ) |
| focus-scroll-container | boolean | true if a scrollable element is focusable |
| focus-summary | boolean | true if the browser implements `<details>` and `<summary>` is focusable |
| focus-svg | boolean | true if `<svg>` is focusable |
| focus-svg-focusable-attribute | boolean | true if `<text focusable="true">` is focusable |
| focus-svg-tabindex-attribute | boolean | true if `<text tabindex="-1">` is focusable |
| focus-tabindex-trailing-characters | boolean | true if `<div tabindex="3x">` is focusable |
| focus-table | boolean | true if `<table>`, `<tr>` and `<td>` are focusable |
| focus-video-without-controls | boolean | true if `<video>` is focusable (while only `<video controls>` should be) |
| tabsequence-area-at-img-position | boolean | true if `<area>` are tabbed at the DOM position of `<img usemap="…">` |


## Changes

* As of `v#master` *all* tests are run at once and within an iframe to limit layout thrashing.


## Contributing

Tests go in `src/supports` and results are used through the `src/supports/supports.js` module.

