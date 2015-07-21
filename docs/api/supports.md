---
layout: doc-page.html
---

# Supports - Browser compatibility

The supports infrastructure is a set of tests determining browser behavior and compatibility at runtime. Because the tests change focus to detect compatibility and load invalid `<video>` and `<audio>` sources, results are cached in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

For the tests to run properly, the document needs to have focus during execution. If it does not, e.g. because the browser's DevTools have focus, the warning »document requires focus for a11y support tests« will be logged to the console and the cache is voided.


## Available Compatibility Tests

| test name | return type | description |
| --------- | ----------- | ----------- |
| css-shadow-piercing-deep-combinator | string (`">>>"`, `"/deep/"` `""`) | the browser's support for [selecting through Shadow DOM](http://dev.w3.org/csswg/css-scoping/#deep-combinator) |
| focus-audio-without-controls | boolean | true if `<audio>` is focusable (while only `<audio controls>` should be) |
| focus-broken-image-map | boolean | true if `<area>` is focusable although the `<img>` using the `<map>` is not properly loaded |
| focus-fieldset-disabled | boolean | true if `<fieldset disabled>` is focusable |
| focus-fieldset | boolean | true if `<fieldset>` is focusable |
| focus-html | boolean | true if the `<html>` element is focusable |
| focus-invalid-tabindex | boolean | true if `<div tabindex="invalid-value">` is focusable |
| focus-summary | boolean | true if the browser implements `<details>` and `<summary>` is focusable |
| focus-svg | boolean | true if any SVG element like `<text>` is focusable |
| focus-table | boolean | true if `<table>`, `<tr>` and `<td>` are focusable |
| focus-video-without-controls | boolean | true if `<video>` is focusable (while only `<video controls>` should be) |
| focusout-event | boolean | true if `focusout` is dispatched synchronously |


## Contribution Notes

Tests go in `src/supports` and either use the `./detect-focus.js` helper like most of the tests, or the `./supports-cache.js` API directly, like `./css-shadow-piercing-deep-combinator.js` shows.


---

Back to the [API Documentation](./README.md).
