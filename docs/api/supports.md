---
layout: doc-page.html
tags: internal
---

# Supports - Browser compatibility

The supports infrastructure is a set of tests determining browser behavior and compatibility at runtime. Because the tests change focus to detect compatibility and load invalid `<video>` and `<audio>` sources, results are cached in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). For the tests to run properly, the document needs to have focus during execution. If it does not, e.g. because the browser's DevTools have focus, the cache is voided.


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
| focus-invalid-tabindex | boolean | true if `<div tabindex="invalid-value">` is focusable |
| focus-label-tabindex | boolean | true if `<label tabindex="-1">` is focusable |
| focus-object-svg | boolean | true if `<object type="image/svg+xml" data="…">` is focusable |
| focus-object-swf | boolean | true if `<object type="application/x-shockwave-flash" data="…">` is focusable |
| focus-redirect-legend | string (`"focusable"`, `"tabbable"`, `""`) | the browser's query method for identifying the target for passing focus from `<legend>`  |
| focus-redirect-img-usemap | boolean | true if `img.focus()` passes focus to the first `<area>` of the associated element |
| focus-scroll-body | boolean | true if the child element of a scrollable area is focusable |
| focus-scroll-container-without-overflow | boolean | true if a scrollable element is focusable (without being made scrollable using the CSS property `overflow` ) |
| focus-scroll-container | boolean | true if a scrollable element is focusable |
| focus-summary | boolean | true if the browser implements `<details>` and `<summary>` is focusable |
| focus-svg | boolean | true if `<svg>` is focusable |
| focus-svg-focusable-attribute | boolean | true if `<text focusable="true">` is focusable |
| focus-tabindex-trailing-characters | boolean | true if `<div tabindex="3x">` is focusable |
| focus-table | boolean | true if `<table>`, `<tr>` and `<td>` are focusable |
| focus-video-without-controls | boolean | true if `<video>` is focusable (while only `<video controls>` should be) |
| focusout-event | boolean | true if `focusout` is dispatched synchronously |
| tabsequence-area-at-img-position | boolean | true if `<area>` are tabbed at the DOM position of `<img usemap="…">` |
| svg-focus-method | boolean | true if `SVGElement.prototype.focus` exists natively |


## Contributing

Tests go in `src/supports` and either use the `./detect-focus.js` helper like most of the tests, or the `./supports-cache.js` API directly, like `./css-shadow-piercing-deep-combinator.js` shows.


