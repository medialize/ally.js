---
layout: doc-page.html
---

# Supports - Browser compatibility

The supports infrastructure is a set of tests determining browser behavior and compatibility at runtime. Because the tests change focus to detect compatibility and load invalid `<video>` and `<audio>` sources, results are cached in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

For the tests to run properly, the document needs to have focus during execution. If it does not, e.g. because the browser's DevTools have focus, the warning »document requires focus for a11y support tests« will be logged to the console and the cache is voided.


## Available Compatibility Tests

| Test Name | Return Type | Description |
| --------- | ----------- | ----------- |
| css-shadow-piercing-deep-combinator | string (`">>>"`, `"/deep/"` `""`) | the browser's support for [selecting through Shadow DOM](http://dev.w3.org/csswg/css-scoping/#deep-combinator), empty string if not supported |
| focus-area-tabindex | boolean | true if `<area tabindex="-1">` is focusable |
| focus-audio-without-controls | boolean | true if `<audio>` is focusable (while only `<audio controls>` should be) |
| focus-broken-image-map | boolean | true if `<area>` is focusable although the `<img>` using the `<map>` is not properly loaded |
| focus-children-of-focusable-flexbox | boolean | true if `<span>` in `<a href="…" style="display:flex;"><span>` is focusable |
| focus-embed-tabindex | boolean | true if `<embed tabindex="-1">` is focusable |
| focus-embed | boolean | true if `<embed>` is focusable |
| focus-fieldset-disabled | boolean | true if `<fieldset disabled>` is focusable |
| focus-fieldset | boolean | true if `<fieldset>` is focusable |
| focus-img-ismap | boolean | true if `<img>` in `<a href="–"><img ismap src="…">` is focusable |
| focus-img-usemap-tabindex | boolean | true if `<img usemap="#…">` is focusable |
| focus-invalid-tabindex | boolean | true if `<div tabindex="invalid-value">` is focusable |
| focus-label-tabindex | boolean | true if `<label tabindex="-1">` is focusable |
| focus-object-svg | boolean | true if `<object type="image/svg+xml" data="…">` is focusable |
| focus-scroll-body | boolean | true if the child element of a scrollable area is focusable |
| focus-scroll-container-without-overflow | boolean | true if a scrollable element is focusable (without being made scrollable using the CSS property `overflow` ) |
| focus-scroll-container | boolean | true if a scrollable element is focusable |
| focus-summary | boolean | true if the browser implements `<details>` and `<summary>` is focusable |
| focus-tabindex-trailing-characters | boolean | true if `<div tabindex="3x">` is focusable |
| focus-table | boolean | true if `<table>`, `<tr>` and `<td>` are focusable |
| focus-video-without-controls | boolean | true if `<video>` is focusable (while only `<video controls>` should be) |
| focusout-event | boolean | true if `focusout` is dispatched synchronously |
| svg-focus-method | boolean | true if `SVGElement.prototype.focus` exists natively |


## Console Warnings

This module logs things to the console:

```text
document requires focus for a11y support tests
```

Focus feature detection only works when the document has focus. That's not the case when your browser's developer tools have focus or the document's tab is in the background.

```text
GET data:audio/mp3;base64,audio-focus-test net::ERR_INVALID_URL
GET data:video/mp4;base64,video-focus-test net::ERR_INVALID_URL
GET data:image/png;base64,broken-image-test net::ERR_INVALID_URL
```

Focus feature detection works by temporarily adding certain elements to the DOM. For some reason Google Chrome logs invalid Data URIs as a network error of type invalid URL to the console. The Console tab's filter option knows "Hide network messages". The Network panel has the option "Hide data URLs" that prevents these resources from showing up there as well.


## Contribution Notes

Tests go in `src/supports` and either use the `./detect-focus.js` helper like most of the tests, or the `./supports-cache.js` API directly, like `./css-shadow-piercing-deep-combinator.js` shows.


