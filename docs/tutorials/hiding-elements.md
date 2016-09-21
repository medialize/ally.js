---
layout: doc-page.html
---

# Hiding DOM elements

This document explains the various ways of hiding things and the implications that come with that.

When we say an element is hidden, we usually mean it is not visible. However, the screen is not the only output mechanism we may need to hide content from. Systems like screen readers and braille displays rely on a document's representation in the [accessibility tree](../concepts.md#Accessibility-tree). For disambiguation we'll use the following terms:

* **Completely hidden:** The element is *neither* rendered on screen, *nor* exposed in the accessibility tree.
* **Semantically hidden:** The element is rendered on screen, but *not* exposed in the accessibility tree.
* **Visually hidden:** The element is *not* rendered on screen, but exposed in the accessibility tree.

The three types of "hidden" produce the following matrix:

| visibility state | on screen | in accessibility tree |
| ---------------- | --------- | --------------------- |
| completely hidden | hidden | hidden |
| semantically hidden | visible | hidden |
| visually hidden | hidden | visible |


## How to hide elements completely

Completely hiding elements can be done in 3 ways:

* via the CSS property [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display), e.g. `display: none;`
* via the CSS property [`visibility`](https://developer.mozilla.org/en/docs/Web/CSS/visibility), e.g. `visibility: hidden;`
* via the HTML5 attribute [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden), e.g. `<span hidden>`

While each of these techniques has the same end result, i.e. content is not rendered and not exposed in the accessibility tree, they have different behaviors.

### The CSS properties `display` and `visibility`

`display: none;` will cause the element to completely vanish, it won't take any space and it won't be [animatable](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions). `visibility: hidden;` allows animation and preserves the space the element would occupy on screen, but simply leave it blank. Unlike every other method to hide content, `visibility` has the ability to *unhide nested content*:

```html
<div style="visibility: hidden">
  <span>not visible</span>
  <span style="visibility: visible">visible!</span>
</div>
```

:::tip
Unless unhiding nested content is *specifically* what we intend to do, we should refrain from using `visibility: visible;` in our style sheets, and use `visibility: inherit;` instead. By inheriting the `visibility` state from the parent element by default, we make sure that nested content does not become visible by accident, in case the an ancestor has `visibility: hidden;` set.
:::

### The HTML5 `hidden` attribute

The HTML5 `hidden` attribute provides a convenient API, as it can be toggled simply by setting `element.hidden = true;`. The element itself does not hide the content, but browser's internal style sheets contain the following CSS rule:

```css
[hidden] {
  display: none;
}
```

### Safely overwriting the `hidden` attribute

We **absolutely must not** revert the hiding effects of the `hidden` attribute. However, we *can* swap `display` for `visibility` in certain situations, for example to allow us to animate the element:

```css
.my-element[hidden] {
  display: block;
  visibility: hidden;
}
```

Sadly we cannot use the values `inherit`, `initial` or `unset` to simply *undo* the `display: none;`. `initial` and `unset` would translate to `display: inline`, and `inherit` simply "imports" the `display` value of the parent element. We can use extended selectors to get around duplicate definitions:

```css
.my-element,
.my-element[hidden] {
  display: block;
  /* ... */
}
.my-element[hidden] {
  visibility: hidden;
}
```

## How to hide elements semantically

To hide content from the [accessibility tree](../concepts.md#Accessibility-tree) but retain the content on screen, we may use the attribute [`aria-hidden="true"`](https://w3c.github.io/aria/aria/aria.html#aria-hidden).

For example we might want to hide certain images and icons that serve non-descriptive, purely esthetical purposes:

```html
<a href="https://google.com">
  <img src="search-symbol.png" alt="" aria-hidden="true">
  Google Search
</a>
```

:::tip
We should not add any visual styles (like `visibility: hidden;` or `display: none;`) to the CSS selector `[aria-hidden="true"]`, as this would make us lose the ability to hide content only from screen readers.
:::


## How to hide elements visually

We may need to provide invisible content in order to make sure the structures presented in the accessibility tree make sense. The following CSS is taken from [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate/blob/v5.0.0/src/css/main.css#L126-L156), which is based on [Hiding Content for Accessibility](https://snook.ca/archives/html_and_css/hiding-content-for-accessibility):

```css
.visuallyhidden {
  position: absolute;

  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;

  clip: rect(0 0 0 0);
  overflow: hidden;
}
```

The CSS property [`clip`](https://developer.mozilla.org/en-US/docs/Web/CSS/clip) is supported in every browser, but was deprecated in [CSS Masking Level 1](https://drafts.fxtf.org/css-masking-1/#clip-property). Instead we're supposed to use [`clip-path`](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path), which [isn't widely supported](http://caniuse.com/#search=clip-path) yet. To support this swap of CSS properties - whenever that may happen - we would add `clip-path: inset(100%);` to cover the deprecated `clip: rect(0 0 0 0);` style.

While Internet Explorer 9 - 11 make overflowing containers [focusable](../what-is-focusable.md), the `clip` makes sure the `outline` drawn by `:focus` is not visible and the element cannot be clicked on.

Speaking of focusable elements, we are likely using the `.visuallyhidden` style for [skip links](https://webaim.org/techniques/skipnav/), in which case we need a way to *undo* the visual hiding. The HTML5 Boilerplate provides the following styles for that:

```css
.visuallyhidden.focusable:active,
.visuallyhidden.focusable:focus {
  position: static;

  width: auto;
  height: auto;
  margin: 0;

  clip: auto;
  overflow: visible;
}
```

This approach poses a couple of problems, though. First of all we need to declare elements compatible by adding the class `focusable`. Second - and much more importantly - we're resetting styles to values that are likely not what we intend to render. Instead we could use [`:not()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:not), which is [supported in every modern browser](http://caniuse.com/#feat=css-sel3).


### 2016 edition of `.visuallyhidden`

Putting all of this together we get the following styles to visually hide content:

```css
.visuallyhidden:not(:focus):not(:active) {
  position: absolute;

  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;

  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
```

* It works in all modern browsers including Internet Explorer 9 - 11.
* It side-steps the need to re-style everything for focusable elements such as skip-links.
* It accounts for the deprecated `clip` property.

## Recap

* Use the `hidden` attribute to completely hide an element.
* Use the `aria-hidden` attribute to hide an element from the accessibility tree.
* Use the `.visuallyhidden` class to hide an element from the screen.
* Use `visibility: inherit;` instead of `visibility: visible;` to avoid accidentally showing content.
* Do not attach any CSS styles to the `aria-hidden` attribute.
