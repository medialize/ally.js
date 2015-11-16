---
layout: doc-page.html
---

# General concepts

This document explains the general concepts encountered in the world of accessibility.

## WAI ARIA

WAI-ARIA stands for [Web Accessibility Initiative](http://www.w3.org/WAI/) - Accessible Rich Internet Applications. ARIA defines semantics (HTML attributes to express application structure state), behavior requirements and more.

* [Accessible Rich Internet Applications (WAI-ARIA) 1.0](http://www.w3.org/TR/wai-aria/)
* [Accessible Rich Internet Applications (WAI-ARIA) 1.1](http://w3c.github.io/aria/aria/aria.html)
* [WAI-ARIA 1.0 Authoring Practices](http://www.w3.org/TR/wai-aria-practices/)
* [Notes on Using ARIA in HTML](http://w3c.github.io/aria-in-html/)


## Accessibility tree

The Accessibility Tree (often abbreviated "AT", which may be ambiguous as it is also used to abbreviate "Assistive Technology") is an object structure much like the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction), but with a different focus and purpose. The AT is invisible to web applications and is generated from the DOM. In a way the AT is a view of the DOM that only shows the semantically significant structure.

* [The Browser Accessibility Tree](https://www.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/)
* [Mozilla accessibility architecture](https://developer.mozilla.org/en-US/docs/Mozilla/Accessibility/Accessibility_architecture)


## Sequential navigation focus order

The Sequential Navigation Focus Order, also referred to as the Tabbing Order, is an ordered list of all keyboard focusable elements in a document. Unless elements are moved to the front of the list by specifying a positive `tabindex` attribute such as `tabindex="1"`, the tabbing order correlates to the DOM order. Users can usually navigate to the next and previous element in the list by pressing the <kbd>Tab</kbd> and <kbd>Shift Tab</kbd> keys respectively.
