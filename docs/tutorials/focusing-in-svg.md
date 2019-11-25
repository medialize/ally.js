---
layout: doc-page.html
---

# Managing focus in SVG

This document explains how managing focus in SVG works and how it differs from HTML.


## SVG specifications

There are three relevant iterations of SVG considering focus management: [SVG 1.1](https://www.w3.org/TR/SVG11/), [SVG 1.2 Tiny](https://www.w3.org/TR/SVGTiny12/) and [SVG 2](https://www.w3.org/TR/SVG2/). Although SVG 1.1 [knew focus events](https://www.w3.org/TR/SVG11/interact.html#SVGEvents) such as `focusin` and `focusout` and [mentions the CSS pseudo-class](https://www.w3.org/TR/SVG11/interact.html#event-processing) `:focus`, it does not describe how elements can be made focusable. SVG 1.2 Tiny rectifies that by adding the [`focusable` attribute](https://www.w3.org/TR/SVGTiny12/interact.html#focus). And finally SVG 2 defines [focus management](https://www.w3.org/TR/SVG2/interact.html#Focus) to be the same as HTML, including the [`tabindex` attribute](https://www.w3.org/TR/SVG2/struct.html#SVGElementTabindexAttribute).


## Browser compatibility

While the Blink and WebKit based browsers (Google Chrome, Apple Safari) have had solid support for `:focus`, `.focus()` and `tabindex` on SVG elements for quite a while, the story is different for Gecko (Mozilla Firefox), Trident (Microsoft Internet Explorer) and EdgeHTML (Microsoft Edge).

Up to version 50 Firefox had very limited support for focus in SVG. `<a xlink:href="…">` elements could be focused by keyboard and mouse, but the `.focus()` method was missing. The only way to shift focus to an SVG element was by user action (keyboard, pointer). As of version 51 Firefox has caught up.

Internet Explorer is the only mainstream browser to implement SVG 1.2 Tiny's `focusable` attribute to make arbitrary elements focusable. However, it does not support the `tabindex` attribute and `.focus()` method on `SVGElement`s. Support for `focusable` and the lack of `.focus()` carried over to Microsoft Edge, which only added support for the `tabindex` attribute in version 14.


## Making SVG elements focusable

In SVG only the element `<a xlink:href="…">` is considered naturally focusable by all browsers. Internet Explorer and Microsoft Edge up to version 13 also consider `<svg>` itself keyboard focusable. Firefox 52 considers `<svg>` focusable, if it's the root element of a browsing context (e.g. `<iframe>` or `<object>`).

:::note
Browsers on macOS in general and Apple's Safari in particular [need to be configured for keyboard navigation](http://www.weba11y.com/blog/2014/07/07/keyboard-navigation-in-mac-browsers/).
:::

The HTML attribute `tabindex` made its way into SVG in SVG 2. The behavior of the attribute is defined to be the same as in HTML, i.e. a negative value making elements script and pointer focusable, a value of `0` adding the element to the document's tabbing order, and a positive value affecting the order in the document's sequential focus navigation list.

:::note
[Don’t Use Tabindex Greater than 0](http://adrianroselli.com/2014/11/dont-use-tabindex-greater-than-0.html) also applies to SVG content.
:::

The `focusable` attribute defined by SVG Tiny 1.2 is only implemented in Internet Explorer and Microsoft Edge. Unlike `tabindex` this attribute has a boolean value, where `focusable="true"` equals `tabindex="0"` and `focusable="false"` makes the element inert. Besides removing SVG links from the tabbing order by way of `<a xlink:href="…" focusable="false">`, this property also comes in handy to prevent the SVG's root element from unnecessarily receiving focus: `<svg focusable="false">`.

:::note
In general it's not a good idea to remove interactive elements from the tabbing order, such as `<a href="…" tabindex="-1">` would achieve. However, this is the only way for utilities like [`ally.element.disabled`](../api/element/focus.md) and the [WICG `inert` polyfill](https://github.com/wicg/inert) to prevent elements from receiving keyboard focus, while maintaining their visual presentation on screen.
:::

As of version 14 Microsoft Edge also supports the `tabindex` attribute. For the case `<rect … tabindex="0" focusable="true">` the situation is clear: the element element is keyboard focusable. However both attributes could be contradicting each other, in which case the `focusable` attribute wins and the `tabindex` attribute is ignored:

* `<svg focusable="false" tabindex="0">` is considered inert
* `<svg focusable="true" tabindex="-1">` is considered keyboard focusable


### Event Listeners

> [SVG2 - 15.9. Focus](https://svgwg.org/svg2-draft/single-page.html#interact-Focus): […] may allow focus to reach elements which have been assigned listeners for mouse, pointer, or focus events.

Blink and WebKit (Chrome and Safari) consider *any* SVG element with a `focus` event handler focusable. However, mouse events (e.g. `click`, `mousedown`) and keyboard events (e.g. `keydown`) don't cause elements to become focusable.

Since we can't query the event listeners attached to DOM elements, it's impossible to identify elements that have become focusable by way of a `focus` event listener.

:::note
Any element that has a `focus` event listener attached should also be made focusable by adding `tabindex="0"`.
:::


## Focusing SVG elements

In Blink and WebKit based browsers focusing SVG elements is not different from focusing an HTML element, the `.focus()` method is available on [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) and [`SVGElement`](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement). Since Firefox 51 the `.focus()` method is also available. In Internet Explorer and Microsoft Edge this is not the case.

Internet Explorer and Microsoft Edge up to version 12 allow misappropriating the `.focus()` method by applying the method from `HTMLElement`'s prototype to an `SVGElement`: `HTMLElement.prototype.focus.apply(svgElement)`. Microsoft Edge 13 joined Firefox (up to version 50) in rejecting such attempts by throwing an error:

```text
// Firefox
TypeError: 'focus' called on an object that does not implement interface HTMLElement.
// Edge
TypeError: Invalid calling object
```

While Firefox before version 51 *can't* focus SVG elements because of this limitation, Microsoft Edge 13 and newer *can be persuaded* otherwise.


### The focus SVG element hack

[Mutating the active element](./mutating-active-element.md#disabling-the-active-element) shows that Edge will shift focus to the next focusable ancestor when the active element is disabled. While it's not possible to use an `<input>` element in `<svg>` directly, the [`<foreignObject>`](https://developer.mozilla.org/en/docs/Web/SVG/Element/foreignObject) element allows HTML to be embedded in SVG.

It is possible to programmatically shift focus to an `<a xlink:href="…">` element in Microsoft Edge 13+ by going through the following steps:

1. append `<foreignObject><input /></foreignObject>` to the target element
1. call `element.focus()` on the input element
1. set the input element to `element.disabled = true;`
1. remove the `<foreignObject>` element injected in step 1
1. the target element has received focus and become the active element

As of `v1.4.0` the utility [`ally.element.focus`](../api/element/focus.md) incorporates the above workarounds to focus SVG elements in all versions of Internet Explorer and Microsoft Edge.


### The blur SVG element hack

Browsers that don't provide the `.focus()` method on `SVGElement` also lack the `.blur()` method. Sadly calling `document.body.focus()` won't achieve what `document.activeElement.blur()` should've done. But shifting focus back to `<body>` is possible by going through the following steps:

1. append `<input>` to `document.body`
1. call `element.focus()` on the input element
1. call `element.blur()` on the input element
1. remove the `<input>` element injected in step 1
1. `document.body` is now the active element

As of `v1.4.0` the utility [`ally.element.blur`](../api/element/blur.md) incorporates the above workaround to shift focus away from SVG elements in all versions of Internet Explorer, Microsoft Edge and Firefox below version 51.


## Styling focused SVG elements

All browsers support the CSS pseudo-class `:focus`. However, Firefox until version 50, Internet Explorer and Edge including version 15 do *not* support the CSS property [`outline`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline) on SVG elements.

It is also worth noting that `<a>` elements do not have dimensions of their own. The focus outline can therefore only be drawn on the element's bounding box, which is the smallest rectangle enclosing all of the `<a>` element's children ([demo](http://jsbin.com/witehokeka/1/edit?html,css,output)). WebKit (Safari 10) does *not* render the focus outline on an `<a>` element's bounding box, so the focus state of SVG links is not visually indicated. Internet Explorer and Edge render the native focus outline, as long as the `outline` property isn't set.

These limitations make it necessary to indicate the focused element another way, e.g. by changing [`fill`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill) or [`stroke`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke).

:::note
Using `stroke` on text will create a different kind of outline than produced by the CSS properties `outline` or `border` on HTML elements. A rectangular outline similar to the browser's default focus outline would have to be rendered using SVG itself, e.g. by way of a `<rect>` element.
:::

Also note that browsers are inconsistent about how focus outlines should behave in scaled images, as the following table shows ([test case](http://jsbin.com/cabusivunu/edit?html,css,output)):

| Browser | Native focus indication | `outline` | `stroke` |
|---------|-------------------------|-----------|----------|
| Firefox 51 | scaled | scaled | scaled |
| Chrome 55 | scaled | scaled | scaled |
| Safari 10 | fix | scaled | scaled |
| MS Edge 15 | fix | *not supported* | scaled |


## The `<foreignObject>` element

The [`<foreignObject>`](https://developer.mozilla.org/en/docs/Web/SVG/Element/foreignObject) allows arbitrary HTML to be embedded in SVG. This includes interactive elements like `<input>` elements, as we've already seen in [the focus SVG element hack](#the-focus-svg-element-hack). However, the presented hack (deliberately) omitted a few elements and attributes.

Most resources on the web, including the [SVG 2 spec](https://www.w3.org/TR/SVG2/embedded.html#ForeignObjectElement) present the `<foreignObject>` element in a setting like the following:

```xml
<svg xmlns="http://www.w3.org/2000/svg">
 <switch>
   <foreignObject requiredExtensions="http://example.com/SVGExtensions/EmbeddedXHTML">
     <body xmlns="http://www.w3.org/1999/xhtml">
       <p>HTML content</p>
     </body>
   </foreignObject>
 </switch>
 </svg>
```

It's not immediately obvious that the snippet won't render the text *HTML content* in any browser. The reason is the invalid extension URI `http://example.com/SVGExtensions/EmbeddedXHTML` provided in the [`requiredExtensions`](https://www.w3.org/TR/SVG2/struct.html#ConditionalProcessingRequiredExtensionsAttribute) attribute. But even if the correct URI `http://www.w3.org/1999/xhtml` is used, Chrome still won't render the embedded HTML. Similar problems exist with the [`requiredFeatures`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/requiredFeatures) attribute, which was dropped in SVG 2. See the following table and example for a support matrix:

| embed type | Chrome | Firefox | Edge |
|------------|--------|---------|------|
| invalid extension | not rendered | not rendered | not rendered |
| valid extension | not rendered | rendered | rendered |
| invalid feature | rendered | not rendered | not rendered |
| valid feature | rendered | rendered | rendered |
| no extension or feature | rendered | rendered | rendered |

@@@example /tutorials/focusing-svg.foreignobject.example.html
@@@

:::tip
Do not use the attributes `requiredExtensions` or `requiredFeatures` on `<foreignObject>`, as there is no JavaScript API to determine if a `<foreignObject>` is being rendered because of these restrictions.
:::

Note that the `<foreignObject>` element is not supported in Internet Explorer 11 and below.


## The `<defs>` element

The [`<defs>`](https://www.w3.org/TR/SVG2/struct.html#DefsElement) element defines that descendants are not rendered directly and should therefore not be focusable according to [SVG 2 - 15.9. Focus](https://www.w3.org/TR/SVG2/interact.html#Focus). But currently all browsers consider the link in the following snippet keyboard focusable:

```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <g id="use-somewhere">
      <a xlink:href="…"><text>a link</text></a>
    </g>
  </defs>
</svg>
```

:::tip
Do not put interactive content in `<defs>` to avoid visual focus from getting lost.
:::


## The `<use>` element

The [`<use>`](https://www.w3.org/TR/SVG2/struct.html#UseElement) element references other content, that is rendered in its stead. The `<use>` element is a Shadow Host, hiding all of the referenced content.

If the referenced content has focusable elements and one of those shadowed elements has focus, the `<use>` element will be the document's active element. Currently only Chrome and Safari 10 have functioning Shadow DOM implementations to handle this "correctly". However, Chrome is not able to prevent shadowed content from receiving keyboard focus when the host is removed from the document's tabbing order via `<use tabindex="-1">`.

As with other Shadow Hosts, Firefox does not properly encapsulate focused elements. Instead of the `<use>` element becoming the active element, the focusable content within the ShadowRoot are exposed as the document's active elements.

Chrome has an interesting bug ([665121](https://bugs.chromium.org/p/chromium/issues/detail?id=665121)) regarding the rendering of focus indication within `<use>` elements, as can be observed in the [test case](http://jsbin.com/julekuxuwe/1/edit?html,output). The previous section already explained that elements in `<defs>` receive focus when they shouldn't. But to make things worse, the supposedly cloned elements in the `<use>` elements indicate focus when the original element in `<defs>` has focus. But when the clones themselves receive focus, there is no indication.

Safari 8 really trips up when it encounters `<use>` elements that reference focusable content. Once a `<use>` element's content received focus, it is *not possible* to shift focus with <kbd>Tab</kbd> and <kbd>Shift Tab</kbd> anymore. Keyboard users are effectively stranded, as this [demo](http://jsbin.com/yukogaluju/1/edit?html,output) shows.

:::warning
There is a *weird* problem with `<use>` elements in Safari 10 (but not in Safari 9 or the current WebKit nightly). When `<use>` elements are *not* surrounded by whitespace (e.g. `<svg><use xlink:href="…" /></svg>`), the document's tabbing order is truncated so that all elements following that `<use>` are not accessible via the <kbd>Tab</kbd> key anymore, as this [demo](http://jsbin.com/tuxaseyugo/1/edit?html,output) shows.
:::

:::tip
Do not reference interactive content in `<use>`. Browser support is not great and in the case of Safari 8 a real problem.
:::


## Hidden SVG with focusable content

We must be careful when hiding SVGs that host focusable content. Opening the [demo](http://jsbin.com/buciwihiyi/edit?html,output) in Safari will show how focus cannot be shifted from the first input to the second using the <kbd>Tab</kbd> key. The reason is this hidden (via `display: none` or `visibility: hidden`) SVG link in between. While [Blink 586200](https://code.google.com/p/chromium/issues/detail?id=586200) has been fixed in early 2016, [WebKit 154114](https://bugs.webkit.org/show_bug.cgi?id=154114) is still alive and kicking in Safari 10.


## Recap

* use [`ally.element.focus`](../api/element/focus.md) and [`ally.element.blur`](../api/element/blur.md) to programmatically shift focus SVG elements.
* Avoid the attributes `requiredExtensions` and `requiredFeatures` on `<foreignObject>`, since their interpretations vary among browsers.
* Add `tabindex="0"` to all interactive SVG content.
* Visualize `:focus` state using styles other than `outline`, as that CSS property is not widely supported for SVG elements.
* Do not host focusable content in `<defs>`, as these elements are not made properly inert by browsers.
* Do not reference focusable content in `<use>`, since Shadow DOM isn't yet properly implemented in most browsers.
* Do not hide SVG content that hosts focusable elements, as that would break the ability to traverse the document's tabbing order via the keyboard in Safari.

---

Thanks to [Amelia Bellamy-Royds](https://twitter.com/AmeliasBrain) for taking the time to review this piece and provide some very good comments and insights!
