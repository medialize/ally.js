# Questions About Focus

## Impact of Assistive Technologies


* how does tabbing work on iPhone/Android?
* Investigate how delaying focus until `transitionend` can impact AT users

## Behavior

* WHATWG deems `[draggable]` and [`table[sortable] th`](https://html.spec.whatwg.org/multipage/tables.html#table-sorting-model) focusable, W3C and browsers do not
* do we care about accesskey?
  * https://html.spec.whatwg.org/multipage/interaction.html#the-accesskey-attribute
* `FocusEvent` happens after `keydown`, `mousedown`, `touchstart`, `pointerdown` consistently? what about sequence?
  * `focusin` bubbles
  * http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
* `document.body.focus()` does nothing, so body is not focusable, it's just the default focus upon `document.activeElement.blur()`?
* what can be focused by mouse on mac?
  * Firefox won't focus `<input type="checkbox|radio">` on click

## Visual

* difference between browser's focus and `:focus`
  * iOS has no native style, only :focus applies
  * IE11 applies `:focus` to body, even if another element has focus
* `:focus` vs `:active` vs `:-webkit-tap-highlight-color`
  * https://gauntface.com/blog/2013/12/09/focusing-on-the-web-today
* what is `:-webkit-touch-callout`?
* what is [`-moz-focusring`](https://developer.mozilla.org/en-US/docs/Web/CSS/:-moz-focusring) about?


---

## Behavior

* what about WebComponents ShadowDom?
  * Firefox leaks shadowed content in `activeElement` and `FocusEvent`
  * Chrome makes shadow-host the `activeElement`, but does not expose `activeElement` on the shadow-host (like spec expects)
* Firefox is the only Browser to dispatch `keypress` for <kbd>TAB</kbd> and <kbd>SHIFT + TAB</kbd>
* `<html>` and `<body>` are not naturally focusable, but `<body>` is the `document.activeElement` when nothing has focus. `document.body.focus()` does not work, though. To make `<body>` the `activeElement` one has to remove focus from the currently active element: `document.activeElement.blur()`
* does ChromeVox (et al) allow focusing anything (like a `<p>`) and is that communicated?
  * nope, not in `activeElement` and not detectable in `computedStyle`
* are `KeyEvents` dispatched in IE when tabbing through `<video>` controls?
  * yes, also <kbd>left/right/up/down/space</kbd>, even in Firefox
  * default actions can be prevented
* can you prevent `scrollElementIntoView()` upon `FocusEvent`?
  * no!
  * this also applies to `overflow: hidden` containers
* Focus Redirection
  * `<label>` redirects to its associated form-element
  * `<legend>` redirects to the first form-element within the `<fieldset>`
  * `<img usemap="">` redirects to the first `<area>` of the `<map>` (IE11 only)
* `KeyEvent` is dispatched to `document.activeElement`
  * this allows handling ESC in the hierarchy through observing bubble
* Safari is not tabbing to links?!
  * "Press Tab to highlight each item on a webpage" otherwise <kbd>Alt Tab</kbd> - http://www.456bereastreet.com/archive/200906/enabling_keyboard_navigation_in_mac_os_x_web_browsers/
* what's up with `autofocus`?
  * only works on form elements
  * https://code.google.com/p/chromium/issues/detail?id=382901
  * it affects `<dialog>` on `.openModal()`


## Visual

* color constants (currentcolor, -webkit-activelink, -webkit-focus-ring-color, -webkit-link, -webkit-text)

## Dumb Stuff

* what about `direction` - http://dev.w3.org/csswg/css-writing-modes/#direction
  * nope, no influence on tab order
* can make `-webkit-appearance: button` make a div naturally focusable?
  * nope, it cannot
* can `user-select` prevent focus (by mouse)
  * nope, it cannot
* can `pointer-events: none` prevent focus (by mouse)
  * yes, of course it does

---

### Test Cases

* http://jsbin.com/fawaqi/edit
* http://codepen.io/patrickhlauke/pen/fJamL

### Specifications

* http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
* http://www.w3.org/TR/wai-aria/usage#managingfocus
* http://www.w3.org/WAI/PF/aria-practices/#focus_tabindex

# Various

* [When Do Elements Take the Focus?](http://www.sitepoint.com/when-do-elements-take-the-focus/)
* [how to remove CSS outlines in an accessible manner?](http://www.paciellogroup.com/blog/2012/04/how-to-remove-css-outlines-in-an-accessible-manner/)
* [Stop Messing with the Browser's Default Focus outline](http://tjvantoll.com/2013/01/28/stop-messing-with-the-browsers-default-focus-outline/)
* http://www.tech-recipes.com/rx/16950/os-x-lion-how-to-enable-tab-key-navigation-of-all-items-in-safari/

