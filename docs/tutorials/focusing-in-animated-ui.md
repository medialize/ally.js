---
layout: doc-page.html
---

# Managing focus in animated UI

Managing focus is pretty straight forward: invoke the `element.focus()` to make `element` the active element. If the element is not visible in the viewport, browsers will scroll that element into view. From a user's point of view it makes a lot of sense to *see* where their keyboard input is directed to, even though no HTML specification has ever defined this behavior ([WHATWG HTML #94](https://github.com/whatwg/html/issues/94)). What worked really well for static documents, *can* be a bit of a problem for UI components that are transitioned into view as part of the web app's logic.

Consider a new dialog is constructed off-screen and then moved into view in an animated fashion. Right after the elements are available in the DOM, the applications sends focus to one of its elements, as often required by [WAI-ARIA Authoring Practices](https://w3c.github.io/aria/practices/aria-practices.html). Since the element is still off-screen, the browser scrolls whatever elements it must, so that the element becomes visible in the viewport. But the application itself also kicks off an animation to move the element into view. And the end result is that the dialog came into view by way of the browser scrolling, and back out of view by way of the application's animation. Play with the following example to see this problem in action:

* **EXAMPLE:** [Failing Focus in Animated UI](./focusing-animated.fail.example.html)

There is no way to prevent the browser from scrolling elements into view upon receiving focus. That means the UI has to work around this built-in behavior when creating animation-revealed-content UI such as carousels, accordions, off-screen menus, and so on. The UI can deal with the browser's inevitable scrolling habits in two ways: wait for the element to become visible, or reset the scroll position.


## Remedy 1: Wait until visible

Browsers will only scroll elements into view upon receiving focus, if they weren't already visible in the viewport. That allows the UI to wait for the end of the transition that's moving the content into view, before shifting focus to it.

In case the element that should receive focus is already known, the UI could use [`ally.when.focusable`](../api/when/focusable.md). This utility examines the the current state on every animation, both in DOM and on screen. Once the target element is both focusable and visible in the viewport, the callback function is invoked and the UI can safely shift focus:

```js
ally.when.focusable({
  context: '#element-to-focus',
  callback: function(element) {
    element.focus();
  },
});
```

In case the element that should receive focus is *not* known, but it should be there and focusable once the content is transitioned into view, the UI could use [`ally.when.visibleArea`](../api/when/visible-area.md) to then execute [`ally.query.firstTabbable`](../api/query/first-tabbable.md) to figure out which element to focus:

```js
ally.when.visibleArea({
  context: '#revealed-container',
  callback: function(element) {
    var target = ally.query.firstTabbable({
      context: '#revealed-container',
      defaultToContext: true,
      strategy: 'quick',
    });

    target.focus();
  },
});
```


### Remedy 1: Performance

Note that these utilities work regardless of the method used to transition the content into view. This comes at a price, as they need to determine the element's position on each animation frame. This *may* lead to a [janky experience](http://jankfree.org/) due to [layout thrashing](http://wilsonpage.co.uk/preventing-layout-thrashing/).

In a more tightly coupled UI, the JavaScript might know the exact method of animation used to reveal the content. In that case it is *much* more efficient to wait for the animation to announce it's finished.

* See the [`transitionend`](https://developer.mozilla.org/en-US/docs/Web/Events/transitionend) event for content revealed through [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions).
* See the [`animationend`](https://developer.mozilla.org/en-US/docs/Web/Events/animationend) event for content revealed through [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations).
* See the [`onfinish`](https://developer.mozilla.org/en-US/docs/Web/API/Animation/onfinish) callback or promise for content revealed through [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API).

Tools like [jQuery.transitionEndPromise](https://github.com/medialize/jQuery-transitionEndPromise) can make `transitionend` and `animationend` events a little more convenient by providing filters and promises.


## Remedy 2: Undo scrolling

Contrary to the first approach's *avoiding of scroll*, the UI could let the scroll happen and then *reset* all scroll positions so that they never happened. Besides a few undesired `scroll` events, this approach would also see a few layout operations (what's commonly referred to as layout thrashing). However, both are limited to before the content-revealing transitions run, so shouldn't be a bigger issue than any other [FLIP animation](https://aerotwist.com/blog/flip-your-animations/).

In order to *reset* scroll position after the element received focus, the UI needs to collect the scroll positions of all ancestor elements before focus was shifted. The utility [`ally.element.focus`](../api/element/focus.md) provides the option `undoScrolling` to conveniently do just that:

```js
ally.element.focus('#element-to-focus', {
  undoScrolling: true,
});
```


### Remedy 2: Caveat

This approach has one caveat, though. It is *required* that the element is able to receive focus immediately. That means that extra care must be taken when CSS transitions are used.

When hiding things off-screen, the UI must make sure the invisible contents are not only hidden visually, but also semantically, which is why we need to specify the `visiblity` property. See the [Hiding DOM elements tutorial](./hiding-elements.md) for more details.

The UI usually needs to change the `visibility` property from `hidden` to `visible` right away, but delay the reverse by 1 second. This is necessary so the element is *already* visible when moving in, and *still* visible while moving out.

The problem lies with how the `visibility` property *can* be handled in transitions, since a [change in the way visibility is transitioned](https://github.com/w3c/csswg-drafts/commit/2db569fe30982a793d795b74ec155a9ab5362483) allows the following CSS:

```css
.some-element {
  visibility: hidden;
  transform: translate3d(100vh, 0px, 0px);
  transition:
    transform 1s ease-in-out,
    visibility 1s;
}

.some-element.on-screen {
  visibility: visible;
  transform: translate3d(0px, 0px, 0px);
}
```

[Starting of transitions](https://drafts.csswg.org/css-transitions/#starting) does not mandate transitions to be started synchronously, which means they kick off a few frames later. That means that the following code will *not* focus the element, because it's not yet visible:

```js
element.classList.addClass('on-screen');
element.focus();
```

However, there is a way to make the `visibility` property change from `hidden` to `visible` synchronously, but retain the delay in changing `visible` to `hidden`:

With a little more effort when crafting the CSS transition, we can make this synchronous showing-and-focusing work:

```css
.some-element {
  visibility: hidden;
  transform: translate3d(100vh, 0px, 0px);
  transition:
    transform 1s ease-in-out,
    visibility 1s;
}

.some-element.on-screen {
  visibility: visible;
  transform: translate3d(0px, 0px, 0px);
  transition-property: transform;
}
```

The [`transition-property`](https://developer.mozilla.org/en/docs/Web/CSS/transition-property) effectively *removed* the transition of `visibility` when showing the element, but the transition for hiding it is retained.

Note that setting the [`transition-duration`](https://developer.mozilla.org/en/docs/Web/CSS/transition-duration) and [`transition-delay`](https://developer.mozilla.org/en/docs/Web/CSS/transition-delay) to `0s` would've achieved the same effect, but meant more repetition of CSS.


## Recap

* The browser will scroll elements into view when they receive focus and there is no way to prevent that.
* Where the content being revealed is already accessible, use [`ally.element.focus`](../api/element/focus.md) to shift focus using the `undoScrolling` option. Make sure the element is made focusable synchronously.
* Where the content being revealed is not yet accessible, use [`ally.when.focusable`](../api/when/focusable.md) or [`ally.when.visibleArea`](../api/when/visible-area.md)
