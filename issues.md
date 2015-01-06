# Identified Issues #

See [issues-filed.md](issues-filed.md) for a list of opened issues. Items are marked done if either I opened an issue for them, or I could find an already existing issue covering the problem.


## Gecko (Firefox) ##

* [ ] [rules for parsing integers](http://www.w3.org/TR/html5/infrastructure.html#rules-for-parsing-integers) are not applied to `[tabindex]`
* [ ] `[contenteditable]` without content has no height, i.e. `<div contenteditable></div>` has `element.offsetHeight === 0` (which may be correct according to [CSS2](http://www.w3.org/TR/CSS2/visudet.html#normal-block) but sucks for UX, quick fix: `[contenteditable]:empty { min-height: 123px; }`)
* [ ] `[contenteditable]` has `element.tabIndex === -1` where it should be `0` because it is tabbable
* [ ] unknown audio file has no height, i.e. `<audio src="#foo">` has `element.offsetHeight === 0` - but its focusable and can be tabbed to
* [ ] unknown video file has a height, i.e. `<video src="#foo">` has `element.offsetHeight === 150`
* [ ] `<video>` is focusable, although it should only be focusable when the `controls` attribute is present
* [x] focusing `<iframe>` does not dispatch `focus` event, but properly updates `document.activeElement` [Bug 131784](https://bugzilla.mozilla.org/show_bug.cgi?id=131784)
* [ ] focusing `<object data="some.svg">` does not dispatch `focus` event, but properly updates `document.activeElement`
* [x] `area` only becomes focusable after at least one image with the proper `usemap` set is fully loaded
* [x] `area` never becomes focusable when only broken images use the `map`
* [x] `SVGElement.focus()` does not exist, so elements cannot be focused programmatically, but they can be tabbed to.
* [ ] `SVGElement` does not have the `tabIndex` property (that is linked to `tabindex` attribute) [SVG2](https://svgwg.org/svg2-draft/interact.html#sequential-focus-navigation-and-the-tabindex-attribute)
* [ ] `document.body.focus.call(svgElement);` fails with `TypeError: 'focus' called on an object that does not implement interface HTMLElement.`
* [ ] `table tr{collapse} td a{visible}` not rendered, but can be tabbed to
* [ ] `object[usemap]` (with a PNG) makes the image map available to mouse, but neither `object` nor `area` are focusable or tabbable
* [x] referencing the same `<map>` from multiple images will hide *all* tabbable elements between the first and last image using that map
* [x] the CSS property `order` affects tabbing sequence


## Blink (Chrome) ##

* [x] mouse-focus (`mousedown` on a focusable element) will trigger the focus on the `div` not the `a` in `<div tabindex="-1"><a href="#foo">…` (resolved in Chrome 40)
* [ ] `fieldset[tabindex=0][disabled]` is focusable but should not as per [disabled elements](http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled)
* [ ] `<video>` is *not* focusable at all, not even `<video controls>`
* [ ] the `<a>` element has `element.offsetHeight === 0` while `element.firstElementChild.offsetHeight === 10` in `<svg><a xlink:href="#foo"><text>foo`
* [x] any `<svg>` element can be made focusable and tabbable by adding a focus event handler
* [ ] `object[usemap]` (with a PNG) renders the image but ignores the image map completely
* [ ] `<area>` are added to the tabbing order in plain document order, not "in place of the `<img usemap>`"


## WebKit (Safari) ##

* [x] mouse-focus (`mousedown` on a focusable element) will trigger the focus on the `div` not the `a` in `<div tabindex="-1"><a href="#foo">…`
* [ ] `fieldset[tabindex=0][disabled]` is focusable but should not as per [disabled elements](http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled)
* [ ] `<video>` is *not* focusable at all, not even `<video controls>`
* [ ] the `<a>` element has `element.offsetHeight === 0` while `element.firstElementChild.offsetHeight === 10` in `<svg><a xlink:href="#foo"><text>foo`
* [x] any `<svg>` element can be made focusable and tabbable by adding a focus event handler
* [ ] `object[usemap]` (with a PNG) renders the image but ignores the image map completely
* [ ] `<area>` are added to the tabbing order in plain document order, not "in place of the `<img usemap>`"


## Trident (Internet Explorer) ##

* [x] `[tabindex=""]` evaluates to `element.tabIndex === 0` but `element.getAttribute('tabindex') === '-32768'` (where every other browser declares `element.tabIndex === -1` and element.getAttribute('tabindex') === '')
* [ ] the `<img>` is focusable in `<a href="#foo"><img ismap …>`
* [ ] `<table>`, `<td>`, `<fieldset>` are focusable
* [ ] focus on `<img usemap="#my-map">` is redirected to first `<area>` of `<map name="my-map">` (no other browser does this)
* [ ] `<video>` is focusable, although it should only be focusable when the `controls` attribute is present
* [ ] `HTMLElement.focus()` does not execute synchronously, i.e. `element.addEventListener('focus', function(){ console.log("focus", this) }, false); $0.focus(); console.log("active", document.activeElement);` prints `"active", "focus"` (other browsers print `"focus", "active"`) - http://www.w3.org/TR/DOM-Level-3-Events/#event-type-focus
* [x] `SVGElement.focus()` does not exist, so elements cannot be focused programmatically, but they can be tabbed to. It can be made available easily: `SVGElement.prototype.focus = HTMLElement.prototype.focus;`
* [ ] `SVGElement` does not have the `tabIndex` property (that is linked to `tabindex` attribute)
* [ ] `table tr{collapse} td a{visible}` rendered, but has `element.offsetHeight === 0`
* [ ] `table` and `td` are naturally focusable
* [ ] consecutive `object` elements break the tabbing behavior, focus will get stuck on browser chrome
* [ ] if `object` is last tabbable element, it will break the tabbing behavior, focus will get stuck on browser chrome
* [ ] `object[usemap]` (with a PNG) makes the image map available to mouse, but neither `object` nor `area` are focusable or tabbable
* [ ] `object[src=*.svg]` is not focusable by script, but can be tabbed to
* [ ] `document.activeElement === null` during document parse time, after that it is `html`, after blur it is `body`


## jQuery & jQuery UI ##

* `:visible` does not know about `visible: collapse` and fails to treat a `visibile` element nested within a non-visible element (`hidden` or `collapse`) as visible


## Specification ##

* [ ] `link[itemprop][href]` should be focusable as per [HTML5 tabindex](http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute) but no browser does this
* [x] `object[usemap]` is not supported by any browser, deprecate it?
* [ ] expected tabbing order for image maps is not defined (and thus quite inconsistent across implementations)
* [ ] behavior for image maps with broken images is not defined, see [proposal](https://bugzilla.mozilla.org/show_bug.cgi?id=8131#c16)
* [x] missing DOM interface `Element.focusableElements` to query the browser's list of focusable descendants
* [x] missing DOM property `Element.focusable` to query if the given element can be focused
* [x] missing DOM interface `Element.tabbableElements` to query the browser's list of tabbable descendants
* [x] missing HTML attribute `tabcontaier` to make the browser contain tabbing to descendants of that element - something the implementation of `<dialog>` requires (script interception prevents focus from reaching browser UI)
* [ ] maybe ditch `tabindex` in favor of `focusable` and `tabbable` flags?
* [x] maybe add `tab-group=":string:"` and `tab-order=":integer:"` to solve the problem of *global* `tabindex="2"` in a more localized (yet still global) way - much like `<input type="radio" name=":string:">` works. `tabindex` is renamed to `tab-order` to avoid confusion with the existing standard. `tab-group` is added to allow declaration of "buckets", to which the tab-order-index is being restricted.
* [ ] maybe allow cancellation of `FocusEvent`, which would prevent the browser from bringing that element into the viewport, it can be done by script through `Element.scrollElementIntoView()`
