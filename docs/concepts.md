---
layout: doc-page.html
---

# General concepts

This document explains the general concepts encountered in the world of accessibility.


## WAI ARIA

WAI-ARIA stands for [Web Accessibility Initiative](https://www.w3.org/WAI/) - Accessible Rich Internet Applications. ARIA defines semantics (HTML attributes to express application structure state), behavior requirements and more.

* [Accessible Rich Internet Applications (WAI-ARIA) 1.0](https://www.w3.org/TR/wai-aria/)
* [Accessible Rich Internet Applications (WAI-ARIA) 1.1](https://w3c.github.io/aria/aria/aria.html)
* [WAI-ARIA 1.0 Authoring Practices](https://www.w3.org/TR/wai-aria-practices/)
* [WAI-ARIA 1.1 Authoring Practices](https://w3c.github.io/aria/practices/aria-practices.html)
* [Notes on Using ARIA in HTML](https://w3c.github.io/aria-in-html/)
* [Core Accessibility API Mappings 1.1](https://w3c.github.io/aria/core-aam/core-aam.html)
* [Accessible Name and Description: Computation and API Mappings 1.1](https://w3c.github.io/aria/accname-aam/accname-aam.html)
* [SVG Accessibility API Mappings](https://w3c.github.io/aria/svg-aam/svg-aam.html)


## Accessibility tree

The Accessibility Tree (often abbreviated "AT", which may be ambiguous as it is also used to abbreviate "Assistive Technology") is an object structure much like the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction), but with a different focus and purpose. The AT is invisible to web applications and is generated from the DOM. In a way the AT is a view of the DOM that only shows the semantically significant structure.

* [Definition](https://w3c.github.io/aria/core-aam/core-aam.html#dfn-accessibility-tree)
* [Accessibility APIs: A Key To Web Accessibility](https://www.smashingmagazine.com/2015/03/web-accessibility-with-accessibility-api/)
* [The Browser Accessibility Tree](https://www.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/)
* [Mozilla accessibility architecture](https://developer.mozilla.org/en-US/docs/Mozilla/Accessibility/Accessibility_architecture)


## Sequential navigation focus order

The Sequential Navigation Focus Order, also referred to as the Tabbing Order or *tabsequence*, is an ordered list of all keyboard focusable elements in a document. Unless elements are moved to the front of the list by specifying a positive `tabindex` attribute such as `tabindex="1"`, the tabbing order usually correlates to the DOM order. Users can usually navigate to the next and previous element in the list by pressing the <kbd>Tab</kbd> and <kbd>Shift Tab</kbd> keys respectively.


## Virtual focus

Assistive technologies such as screen readers may provide their own cursor to indicate the element a user is currently focused on. The element that cursor is pointing to is said to have virtual focus. Web applications have no knowledge of this cursor existing, let alone what it is pointing to. In other words the CSS pseudo-class `:focus` does *not* indicate the virtual focus, nor does any other CSS pseudo-class. The virtual focus usually follows the "real" focus. This means that should a script focus an element (thereby making it the activeElement), the virtual focus of the screen reader will also be set to that element.
