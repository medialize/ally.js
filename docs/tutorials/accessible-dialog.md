---
layout: doc-page.html
---

# Accessible dialog tutorial

This document explains what steps need to be taken in order to make a visually compelling, yet fully accessible dialog according to [WAI-ARIA 1.0 Authoring Practices](https://www.w3.org/WAI/PF/aria-practices/#dialog_modal).

HTML5.1 specifies the [`<dialog>` element](https://www.w3.org/TR/html51/semantics.html#the-dialog-element) that natively does most of what is explained here. But since [browser support](http://caniuse.com/#feat=dialog) is rather limited, making use of `<dialog>` is not yet possible.

The code discussed in this tutorial is available in [ally.js Dialog Example](./dialog.example.html) and can be [interacted with](#Interactive-demo) below.

## The visual effect

Before we get into the technical things, let's first discuss what a dialog is. From a user experience perspective it is a piece of information, or a set of interactions, provided to the user in a way that disrupts the user's current interaction. The user is made to focus on the dialog's content and ignore the rest of the application or website. Visually this is usually achieved by layering a box in the visual center of the application and by positioning a translucent layer (i.e. showing the content behind it, but in a distorted manner) behind the dialog, to emphasize that the layer is the only important thing.

To achieve this *visual effect* we don't need much code:

```html
<div id="dialog">
  <p>I am the dialog's content</p>
  <button type="button">close dialog</button>
</div>
```

```css
#dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 200px;
  transform: translate3d(-50%,-50%,0);
  background: white;
  border: 100% solid rgba(0, 0, 0, 2.5);
}
```

But visual appearance is not the *only* thing we care about, especially not when claiming something is *accessible*. In the following sections we'll discuss how to take that visual experience to a technical level that we might call accessible.


## HTML - the dialog's structure

First of all we need a container for the dialog to live in, we use a `<div>` element, because it doesn't have any semantic meaning itself. We explain that the `<div>` actually *is* a dialog by adding [`role="dialog"`](https://www.w3.org/TR/wai-aria/roles#dialog). Roles are defined by ARIA, which allow us to express the *meaning* of an element. We also add `tabindex="-1"` to allow the dialog container to be focused, something we'll revisit soon. Because dialogs are not always visible, we also add the [`hidden` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden).

To structure the content rendered by the dialog, we'll use `<header>` for the introduction, `<section>` for the content and `<footer>` for the buttons to interact with the dialog.

```html
<div role="dialog" tabindex="-1" hidden>
  <header></header>
  <section></section>
  <footer></footer>
</div>
```

Now that we have the bare bones, we should talk about a dialog's generic content, like titles and descriptions. All dialogs have a title, most will also have a description. To explain that the title and description actually belong to the dialog, we use the attributes [`aria-labelledby`](https://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby) and [`aria-describedby`](https://www.w3.org/TR/wai-aria/states_and_properties#aria-describedby) respectively.

```html
<div role="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description">
  <header>
    <h1 id="dialog-title">Name Entry</h1>
    <p id="dialog-description">Please enter your full name.</p>
  </header>
  <section></section>
  <footer></footer>
</div>
```

All dialogs have at least a button to close it. Most will have more buttons, for example to invoke an action (e.g. "save", "ok", "go"). To render those, we use the [`<button>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button). Since dialogs often provide input elements, it makes sense to throw a `<form>` into the mix. Having a `<form>` element in there also allows us to make better use of [validation](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation), should we need to. The browsers on mobile phones generally require a `<form>` element, to show the "go" button in the on screen keyboard.

```html
<div role="dialog">
  <form class="dialog-content">
    <header></header>
    <section></section>
    <footer>
      <button type="button" id="close-dialog">close</button>
      <button type="submit" id="save-dialog">save</button>
    </footer>
  </form>
</div>
```

In this demo we ask for the user's name, so the content will be a simple input element:

```html
<label for="dialog-user-name">Name</label>
<input id="dialog-user-name">
```

The last ingredient is the element that renders the backdrop. Since we're nesting the dialog's content in the `<form>` element, we can create the dialog's backdrop using CSS generated content (`::before`), so we don't need an additional element to cover that. If we weren't nesting the dialog's contents, we'd not be able to get by without a separate element for the backdrop, if we wanted it to appear animated.

---

These snippets assemble to the following HTML construct:

```html
<div id="dialog" role="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description" tabindex="-1" hidden>
  <form class="dialog-content">
    <header>
      <h1 id="dialog-title">Name Entry</h1>
      <p id="dialog-description">Please enter your full name.</p>
    </header>
    <section>
      <label for="within-dialog">Name</label> <input id="within-dialog">
    </section>
    <footer>
      <button type="button" id="close-dialog">Close</button>
      <button type="submit" id="save-dialog">Save</button>
    </footer>
  </form>
</div>
```

## CSS - Visual Appearance

Now that we have a semantically useful dialog construct, we need to make it "look good". Let's start by making the dialog appear on top of the entire viewport, regardless of the document's current scroll positions:

```css
#dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,0);
  z-index: 999;
}
```

Let's continue with the backdrop to obfuscate the document while the dialog is visible. In case we don't need a special animation for the backdrop, we could simply apply the translucent background `background: rgba(0, 0, 0, 0.25);` to the `#dialog` itself. We want a fade-in effect for the backdrop, which we achieve by using [CSS Transitions](https://developer.mozilla.org/en/docs/Web/CSS/transition).

```css
#dialog:before {
  content: "";
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 999;

  /* fade in */
  transition: opacity 0.2s ease-in-out;
}
```

Having the container span the viewport, and the backdrop obfuscating the content, we're ready to show the dialog's content in a centered box:

```css
/* show the dialog in the center of the screen */
#dialog .dialog-content {
  box-sizing: border-box;
  /* maintain on screen even during scroll (potentially problematic on mobile) */
  position: fixed;
  /* when centering, try using FlexBox instead of this junk */
  top: 50%;
  left: 50%;
  width: 300px;
  height: 200px;
  transform: translate3d(-50%,-50%,0);

  /* dialogs are usually boxy things that are on top of everything */
  padding: 20px;
  border: 1px solid #CCC;
  background: white;
  z-index: 1000;

  /* zoom in from the center */
  transition: transform 0.2s ease-in-out;
}
```

The dialog's frame is ready, time to style the content we're presenting to the user.

```css
#dialog h1 {
  margin: 0;
}
#dialog footer {
  margin-top: 20px;
}
```

With that in place, we have the visible state covered. But since dialogs are not always visible, and we want a nice revealing animation, we need to allow the dialog to become invisible:

```css
#dialog[hidden] {
  /*
    [hidden] usually sets display:none, which we
    need to revert in order to allow animations
  */
  display: block;
  /*
    actually hide the element,
    making its contents unaccessible
  */
  visibility: hidden;
  /*
    make sure the element is out of viewport
  */
  transform: translate3d(0px, -1px, 0px) scale(0);
  /*
    delay transform until animations are done
  */
  transition:
    visibility 0s linear 0.2s,
    transform 0s linear 0.2s;
}
```

For the backdrop we essentially need to do the same, but also apply `opacity`. to avoid duplicating styles, we extend the selector and overwrite the `opacity` specifics for the backdrop:

```css
#dialog[hidden],
#dialog[hidden]:before {
  display: block;
  visibility: hidden;
  transform: translate3d(0px, -1px, 0px) scale(0);
  transition:
    visibility 0s linear 0.2s,
    transform 0s linear 0.2s;
}
#dialog[hidden]:before {
  opacity: 0;
  transition:
    opacity 0.2s ease-in-out,
    visibility 0s linear 0.2s,
    transform 0s linear 0.2s;
}
```

All that is remaining now, is hiding the dialog box itself. As with the backdrop, the only difference to the dialog container is going to be *how* we hide it, so we extend the selector again:

```css
#dialog[hidden],
#dialog[hidden]:before,
#dialog[hidden] .dialog-content {
  display: block;
  visibility: hidden;
  transform: translate3d(0px, -1px, 0px) scale(0);
  transition:
    visibility 0s linear 0.2s,
    transform 0s linear 0.2s;
}
#dialog[hidden]:before {
  opacity: 0;
  transition:
    opacity 0.2s ease-in-out,
    visibility 0s linear 0.2s,
    transform 0s linear 0.2s;
}
#dialog[hidden] .dialog-content {
  transform: translate3d(0px, -1px, 0px) scale(0);
  transition:
    transform 0.2s ease-in-out,
    visibility 0s linear 0.2s;
}
```

## JavaScript - User Interaction

Up to now we covered what we're doing by providing semantically useful HTML *structure*. We've also described what the visual *appearance* of the dialog should be. It's time to visit JavaScript to define the *behavior*. What we have to do is described by [WAI-ARIA 1.0 Authoring Practices](https://www.w3.org/WAI/PF/aria-practices/#dialog_modal), which we'll now walk through step by step. Here's what we need to do:

* react to the <kbd>Enter</kbd> and <kbd>Escape</kbd> keys in order close the dialog, while respecting that some elements, when focused, may react to those keys themselves
* make sure no element outside of the dialog can be focused (by any means, including keyboard and mouse)
* focus the first keyboard focusable (tabbable) element in the dialog upon opening the dialog, or focus the dialog itself, if it doesn't contain any focusable elements
* focus the element that had focus before the dialog was shown upon closing the dialog

There are a few more things we'll want to consider, that ARIA Practices does not mention specifically:

* make sure no element outside of the dialog is visible to screen readers (analog to how we obfuscate the content visually by way of the backdrop)
* make sure to transfer focus to the dialog only when the dialog is visible, to avoid the document from being scrolled by the browser

We start with grabbing the elements we need to deal with and defining functions to open and close the dialog:

```js
// Grab the elements we need to interact with
var openButton = document.getElementById('open-dialog');
var dialog = document.getElementById('dialog');
var closeButton = document.getElementById('close-dialog');

function openDialog() {
  // create or show the dialog
  dialog.hidden = false;
}

function closeDialog() {
  // hide or remove the dialog
  dialog.hidden = true;
}

// wire up showing/hiding the dialog
openButton.addEventListener('click', openDialog, false);
closeButton.addEventListener('click', closeDialog, false);
```

### Trapping focus inside the dialog

While a dialog is shown, we need to make sure that elements outside of the dialog cannot be interacted with. The backdrop achieves this for the mouse, as you're unable to click on anything anymore. But for other means of input, like the keyboard, elements are still accessible simply by hitting the <kbd>Tab</kbd> key often enough to reach them.

A naive implementation might listen to `keydown` events, filtering for <kbd>Tab</kbd> and <kbd>Shift Tab</kbd> to shift focus to the *first* element when focus would leave the dialog at the end, or shift focus to the *last* element, when focus would leave the dialog at its beginning. But this approach has a few problems:

* focus may *not only* be shifted through <kbd>Tab</kbd>, as users of [spatial navigation](https://blog.codinghorror.com/spatial-navigation-and-opera/) will attest
* assistive tools that provide more than sequential focus navigation (i.e. random access) may list all focusable elements of the page, including those visually behind the backdrop

We could do away with the need to react to <kbd>Tab</kbd>, by simply hiding everything outside the dialog. But while setting everything to `visibility: hidden;` would certainly do the job, it would also visually hide *everything but the dialog*, rendering the backdrop useless. Most visual designers I know digress.

So what we really want to do is make everything that is focusable outside of the dialog, not focusable while the dialog is shown. This is no small feat, as browsers offer *absolutely no API* to achieve that and disagree on what exactly is focusable - see [what browsers consider focusable](../data-tables/focusable.md). On top of that only form elements know the [`disabled` property](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Adisabled). ally.js has got you covered with [`ally.query.focusable`](../api/query/focusable.md) to *find* focusable elements, and [`ally.element.disabled`](../api/element/disabled.md) to *disable any element*.

To make things even more comfortable for you, ally.js provides [`ally.maintain.disabled`](../api/maintain/disabled.md) to disable any focusable element and observe changes to the DOM, so any element added to the DOM while the dialog is being shown are disabled as well. The `disengage()` method stops observing the DOM and re-enables all elements that were disabled by the service.

```js
var dialog = document.getElementById('dialog');
var disabledHandle;

function openDialog() {
  // Make sure that no element outside of the dialog
  // can be interacted with while the dialog is visible.
  // This means we don't have to handle Tab and Shift+Tab,
  // but can defer that to the browser's internal handling.
  disabledHandle = ally.maintain.disabled({
    filter: dialog,
  });

  // create or show the dialog
  dialog.hidden = false;
}

function closeDialog() {
  // undo disabling elements outside of the dialog
  disabledHandle.disengage();
  // hide or remove the dialog
  dialog.hidden = true;
}
```

### Reacting to <kbd>Tab</kbd> and <kbd>Shift Tab</kbd>

When the last element of the document's tabbing order has focus and the user presses the <kbd>Tab</kbd> key, focus is not wrapped around to the first element of the tabbing order, but to the browser's UI (e.g. location bar or tabs). The same is true for the first element being focused and the user pressing <kbd>Shift Tab</kbd>.

This is not quite the behavior we see in the modal dialogs provided by our operating systems, where focus is always trapped within the dialog. This is a behavior keyboard users have come to expect and we need to replicate in our web UIs as well.

While [`ally.maintain.disabled`](../api/maintain/disabled.md) makes sure we can't focus any other element within the document, we still need to observe the <kbd>Tab</kbd> key to make focus wrap within the dialog's tabbing order. That's what [`ally.maintain.tabFocus`](../api/maintain/tab-focus.md) is for.

```js
var dialog = document.getElementById('dialog');
var tabHandle;

function openDialog() {
  // Make sure that Tab key controlled focus is trapped within
  // the tabsequence of the dialog and does not reach the
  // browser's UI, e.g. the location bar.
  tabHandle = ally.maintain.tabFocus({
    context: dialog,
  });

  // create or show the dialog
  dialog.hidden = false;
}

function closeDialog() {
  // undo trapping Tab key focus
  tabHandle.disengage();
  // hide or remove the dialog
  dialog.hidden = true;
}
```

:::note
[`ally.maintain.tabFocus`](../api/maintain/tab-focus.md) was added in version `v1.1.0`.
:::


### Reacting to <kbd>Enter</kbd> and <kbd>Escape</kbd>

The <kbd>Escape</kbd> key usually closes (dismisses) a dialog and the <kbd>Enter</kbd> key usually activates the dialog's primary action. Because our example uses a `<form>` and a submit button for the save action, we don't have to listen for <kbd>Enter</kbd>, but can instead rely on the `submit` event of the `<form>`.

If we hadn't done that, we'd have to make sure that the currently focused element does not have an enter-specific activation whenever the <kbd>Enter</kbd> key was pressed. The activation of a link (`<a href="…">`) is to open the referenced address. If we were to naively listen for `keydown` events and close the dialog upon <kbd>Enter</kbd>, we destroy the ability to interact with elements such as the link by keyboard. Since the is no way to reliably tell if an element is reacting to <kbd>Enter</kbd>, it seems easier to avoid that scenario entirely.

The <kbd>Escape</kbd> key on the other hand doesn't have any activation and can be used naively. For simple (naive) keyboard bindings, ally.js provides [`ally.when.key`](../api/when/key.md) to execute a callback whenever the registered key was pressed. Because event handlers are executed before the native activation is performed, we need to either prevent the default action (using [`event.preventDefault()`](https://developer.mozilla.org/en/docs/Web/API/Event/preventDefault)), or delay closing of the dialog. Otherwise we would see focus being shifted back to the "open dialog" button, where the default activation would be performed, thus immediately reopening the dialog.

Putting the keyboard handling together we get:

```js
var dialog = document.getElementById('dialog');
var keyHandle;

function openDialog() {
  // React to enter and escape keys as mandated by ARIA Practices
  keyHandle = ally.when.key({
    escape: closeDialogByKey,
  });

  // create or show the dialog
  dialog.hidden = false;
}

function closeDialogByKey(event) {
  // delay closing so that we don't
  // immediately reopen the dialog
  setTimeout(closeDialog);
}

function closeDialog() {
  // undo listening to keyboard
  keyHandle.disengage();
  // hide or remove the dialog
  dialog.hidden = true;
}

function saveDialog(event) {
  // do not submit the form
  event.preventDefault();

  // do something with the entered data
  var name = dialog.querySelector('input').value;
  console.log('entered name', name);

  closeDialog();
}

dialog.addEventListener('submit', saveDialog, true);
```

### Focus first focusable element upon opening the dialog

Once a dialog is opened, the first keyboard focusable (tabbable) element should receive focus (in order to shift [virtual focus](../concepts.md#Virtual-focus)). In order to accomplish this, you need to know which elements are keyboard focusable. There is no native DOM method to obtain such a list. ally.js has got you covered with [`ally.query.tabbable`](../api/query/tabbable.md). Since the *order* of elements is significant here, we need to sort the focusable elements by `tabindex` and `autofocus` attributes. ally.js provides the method [`ally.query.firstTabbable`](../api/query/first-tabbable.md) to do all that for you:

```js
var dialog = document.getElementById('dialog');

function openDialog() {
  // create or show the dialog
  dialog.hidden = false;
  // the dialog is visible on screen, so find the first
  // keyboard focusable element (giving any element with
  // autofocus attribute precendence). If the dialog does
  // not contain any keyboard focusabe elements, focus will
  // be given to the dialog itself.
  var element = ally.query.firstTabbable({
    context: dialog,
    defaultToContext: true,
  });
  element.focus();
}
```

### Restoring focus upon closing the dialog

In order to restore focus on the element that was focused before we opened the dialog, we simply need to remember which element that was:

```js
var focusedElementBeforeDialogOpened;

function openDialog() {
  // Remember the focused element before we opened the dialog
  // so we can return focus to it once we close the dialog.
  focusedElementBeforeDialogOpened = document.activeElement;
  // create or show the dialog
  dialog.hidden = false;
}

function closeDialog() {
  // return focus to where it was before we opened the dialog
  focusedElementBeforeDialogOpened.focus();
  // hide or remove the dialog
  dialog.hidden = true;
}
```

### Hide document from screen readers

Screen Readers and other tools consuming the document through the Accessibility Tree instead of relying on visual presentation, need to be told what exactly is going on. The translucent backdrop, which obfuscates the document's content while the dialog is shown, does the job when you actually *see* the page. To achieve the same for non-visual output methods, we need to add [`aria-hidden="true"`](https://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden) to all the sibling DOM elements of our dialog.

There is no native DOM method to obtain all parental siblings of an element. ally.js has got you covered with [`ally.get.insignificantBranches`](../api/get/insignificant-branches.md), considering this is a pretty generic operation. To make things even more comfortable for you, ally.js provides [`ally.maintain.hidden`](../api/maintain/hidden.md) to also apply `aria-hidden="true"`. This service also observes changes to the DOM and applies `aria-hidden="true"` to any element added to the DOM while the dialog is being shown. The `disengage()` method stops observing the DOM and removes all `aria-hidden="true"` attributes that were set by the service.

```js
var dialog = document.getElementById('dialog');
var hiddenHandle;

function openDialog() {
  // Make sure that no element outside of the dialog
  // is exposed via the Accessibility Tree, to prevent
  // screen readers from navigating to content it shouldn't
  // be seeing while the dialog is open. See example:
  // https://marcysutton.com/slides/mobile-a11y-seattlejs/#/36
  hiddenHandle = ally.maintain.hidden({
    filter: dialog,
  });
  // create or show the dialog
  dialog.hidden = false;
}

function closeDialog() {
  // undo hiding elements outside of the dialog
  hiddenHandle.disengage();
  // hide or remove the dialog
  dialog.hidden = true;
}
```

### Wait until dialog is visible before shifting focus

An unspecified step performed by the browser when focusing an element is that the focusing element is scrolled into view. There is no way to prevent this from happening. But we can get around it by waiting for animated elements to come into view before shifting focus to them. For that reason ally.js provides the method [`ally.when.visibleArea`](../api/when/visible-area.md) to execute a callback once an element fully entered the viewport. This allows us to rewrite focusing the first keyboard focusable element:

```js
var dialog = document.getElementById('dialog');

function openDialog() {
  // We're using a transition to reveal the dialog,
  // so wait until the element is visible, before
  // finding the first keyboard focusable element
  // and passing focus to it, otherwise the browser
  // might scroll the document to reveal the element
  // receiving focus
  ally.when.visibleArea({
    context: dialog,
    callback: function(context) {
      // the dialog is visible on screen, so find the first
      // keyboard focusable element (giving any element with
      // autofocus attribute precendence). If the dialog does
      // not contain any keyboard focusabe elements, focus will
      // be given to the dialog itself.
      var element = ally.query.firstTabbable({
        context: context, // context === dialog
        defaultToContext: true,
      });
      element.focus();
    },
  });
  // create or show the dialog
  dialog.hidden = false;
}
```

## Interactive demo

* **EXAMPLE:** [Dialog Tutorial](./dialog.example.html)

:::note
Focus is only trapped inside of the embedded iframe. The iframe's content cannot change this page in any way.
:::
