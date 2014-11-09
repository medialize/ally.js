# Identified Issues #

## TODO: enhance tests

* output table needs a `tbody` for "focusRedirection" (or focus delegation)


## TODO: Investigate

* `audio` vs. `audio[controls]` in Firefox, IE11
* `video` vs. `video[controls]` in Firefox, IE11 (Chrome, Safari ignore it entirely)
* find a way to prevent `focus` from being broadcast by AssistiveTechnology - otherwise feature detection MUST NOT be used - https://twitter.com/MarcoZehe/status/526844622778425345


## Gecko (Firefox) ##

* [rules for parsing integers](http://www.w3.org/TR/html5/infrastructure.html#rules-for-parsing-integers) are not applied to `[tabindex]`
* `[contenteditable]` without content has no height, i.e. `<div contenteditable></div>` has `element.offsetHeight === 0` (which may be correct according to [CSS2](http://www.w3.org/TR/CSS2/visudet.html#normal-block) but sucks for UX, quick fix: `[contenteditable]:empty { min-height: 123px; }`)
* unknown audio file has no height, i.e. `<audio src="#foo">` has `element.offsetHeight === 0` - but its focusable and can be tabbed to
* unknown video file has a height, i.e. `<video src="#foo">` has `element.offsetHeight === 150`
* `<video>` is focusable, although it should only be focusable when the `controls` attribute is present
* [#131784](https://bugzilla.mozilla.org/show_bug.cgi?id=131784) focusing `<iframe>` does not dispatch `focus` event, but properly updates `document.activeElement`
* focusing `<object data="some.svg">` does not dispatch `focus` event, but properly updates `document.activeElement`
* `area` only becomes focusable after at least one image with the proper `usemap` set is fully loaded
* `area` never becomes focusable when only broken images use the `map`
* `SVGElement.focus()` does not exist, so elements cannot be focused programmatically, but they can be tabbed to.
* `document.body.focus.call(svgElement);` fails with `TypeError: 'focus' called on an object that does not implement interface HTMLElement.`
* `table tr{collapse} td a{visible}` not rendered, but can be tabbed to
* `object[usemap]` (with a PNG) makes the image map available to mouse, but neither `object` nor `area` are focusable or tabbable


## Blink (Chrome) ##

* mouse-focus (`mousedown` on a focusable element) will trigger the focus on the `div` not the `a` in `<div tabindex="-1"><a href="#foo">…` (resolved in Chrome 40)
* `fieldset[tabindex=0][disabled]` is focusable but should not as per [disabled elements](http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled)
* `<video>` is *not* focusable at all, not even `<video controls>`
* the `<a>` element has `element.offsetHeight === 0` while `element.firstElementChild.offsetHeight === 10` in `<svg><a xlink:href="#foo"><text>foo`
* any `<svg>` element can be made focusable and tabbable by adding a focus event handler
* `object[usemap]` (with a PNG) renders the image but ignores the image map completely


## WebKit (Safari) ##

* mouse-focus (`mousedown` on a focusable element) will trigger the focus on the `div` not the `a` in `<div tabindex="-1"><a href="#foo">…`
* `fieldset[tabindex=0][disabled]` is focusable but should not as per [disabled elements](http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled)
* `<video>` is *not* focusable at all, not even `<video controls>`
* the `<a>` element has `element.offsetHeight === 0` while `element.firstElementChild.offsetHeight === 10` in `<svg><a xlink:href="#foo"><text>foo`
* any `<svg>` element can be made focusable and tabbable by adding a focus event handler
* `object[usemap]` (with a PNG) renders the image but ignores the image map completely


## Trident (Internet Explorer) ##

* `[tabindex=""]` evaluates to `element.tabIndex === 0` but `element.getAttribute('tabindex') === '-32768'` (where every other browser declares `element.tabIndex === -1` and element.getAttribute('tabindex') === '')
* `[tabindex="invalid-value"]` evaluates to `element.tabIndex === 0` but `element.getAttribute('tabindex') === 'invalid-value'` (where every other browser declares `element.tabIndex === -1`)
* the `<img>` is focusable in `<a href="#foo"><img ismap …>`
* `<table>` and `<td>` are focusable in `<table><tr><td><a href="#foo">…`
* focus on `<img usemap="#my-map">` is redirected to first `<area>` of `<map name="my-map">` (no other browser does this)
* `<video>` is focusable, although it should only be focusable when the `controls` attribute is present
* `<object usemap>` breaks the browser's ability to tab through the document. Once `<object usemap>` is reached, IE11's tabbing gets stuck in the address bar
* `HTMLElement.focus()` does not execute synchronously, i.e. `element.addEventListener('focus', function(){ console.log("focus", this) }, false); $0.focus(); console.log("active", document.activeElement);` prints `"active", "focus"` (other browsers print `"focus", "active"`) - http://www.w3.org/TR/DOM-Level-3-Events/#event-type-focus
* `SVGElement.focus()` does not exist, so elements cannot be focused programmatically, but they can be tabbed to. It can be made available easily: `SVGElement.prototype.focus = HTMLElement.prototype.focus;`
* `table tr{collapse} td a{visible}` rendered, but has `element.offsetHeight === 0`
* `table` and `td` are naturally focusable
* consecutive `object` elements break the tabbing behavior, focus will get stuck on browser chrome
* `object[usemap]` (with a PNG) makes the image map available to mouse, but neither `object` nor `area` are focusable or tabbable
* `document.activeElement === null` during document parse time, after that it is `html`, after blur it is `body`


## jQuery & jQuery UI ##

* `:visible` does not know about `visible: collapse` and fails to treat a `visibile` element nested within a non-visible element (`hidden` or `collapse`) as visible


## Specification ##

* [rules for parsing integers](http://www.w3.org/TR/html5/infrastructure.html#rules-for-parsing-integers) does not allow trailing whitespace, but every browser permits them
* `link[itemprop][href]` should be focusable as per [HTML5 tabindex](http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute) but no browser does this
* missing DOM interface `Element.focusableElements` to query the browser's list of focusable descendants
* missing DOM property `Element.focusable` to query if the given element can be focused
* missing DOM interface `Element.tabbableElements` to query the browser's list of tabbable descendants
* missing HTML attribute `tabcontaier` to make the browser contain tabbing to descendants of that element - something the implementation of `<dialog>` requires

