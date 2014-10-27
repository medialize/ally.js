# Identified Issues #

## TODO: Investigate

* `audio` vs. `audio[controls]` in Firefox, IE11
* `video` vs. `video[controls]` in Firefox, IE11 (Chrome, Safari ignore it entirely)
* `iframe` focus in Firefox


## Gecko (Firefox) ##

* no accessibility support for `<svg>`
* [rules for parsing integers](http://www.w3.org/TR/html5/infrastructure.html#rules-for-parsing-integers) are not applied to `[tabindex]`
* `[contenteditable]` without content has no height, i.e. `<div contenteditable></div>` has `element.offsetHeight === 0` (which may be correct according to [CSS2](http://www.w3.org/TR/CSS2/visudet.html#normal-block) but sucks for UX, quick fix: `[contenteditable]:empty { min-height: 123px; }`)


## Blink (Chrome) ##

* mouse-focus (`mousedown` on a focusable element) will trigger the focus on the `div` not the `a` in `<div tabindex="-1"><a href="#foo">…` (resolved in Chrome 40)
* `fieldset[tabindex=0][disabled]` is focusable but should not as per [disabled elements](http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled)


## WebKit (Safari) ##

* mouse-focus (`mousedown` on a focusable element) will trigger the focus on the `div` not the `a` in `<div tabindex="-1"><a href="#foo">…`
* `fieldset[tabindex=0][disabled]` is focusable but should not as per [disabled elements](http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled)


## Trident (Internet Explorer) ##

* `[tabindex=""]` evaluates to `element.tabIndex === 0` but `element.getAttribute('tabindex') === '-32768'` (where every other browser declares `element.tabIndex === -1` and element.getAttribute('tabindex') === '')
* `[tabindex="invalid-value"]` evaluates to `element.tabIndex === 0` but `element.getAttribute('tabindex') === 'invalid-value'` (where every other browser declares `element.tabIndex === -1`)
* the `<img>` is focusable in `<a href="#foo"><img ismap …>`
* `<table>` and `<td>` are focusable in `<table><tr><td><a href="#foo">…`
* focus on `<img usemap="#my-map">` is redirected to first `<area>` of `<map name="my-map">` (no other browser does this)


## jQuery & jQuery UI ##

* `:visible` does not know about `visible: collapse` and fails to treat a `visibile` element nested within a non-visible element (`hidden` or `collapse`) as visible


## Specification ##

* [rules for parsing integers](http://www.w3.org/TR/html5/infrastructure.html#rules-for-parsing-integers) does not allow trailing whitespace, but every browser permits them
* `link[itemprop][href]` should be focusable as per [HTML5 tabindex](http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute) but no browser does this
* missing DOM interface `Element.focusableElements` to query the browser's list of focusable descendants
* missing DOM interface `Element.tabbableElements` to query the browser's list of tabbable descendants
* missing HTML attribute `tabcontaier` to make the browser contain tabbing to descendants of that element - something the implementation of `<dialog>` requires

