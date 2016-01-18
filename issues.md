# Issues filed

This document is used for collecting all the bugs reported and issues raised because of my investigating how focus works and creating ally.js.

# Filed browser issues

* Mouse/Touch Events Can Focus Parent Element - [WebKit 139945](https://bugs.webkit.org/show_bug.cgi?id=139945)
* Multiple use of same image map hides elements from tabbing sequence - [Gecko 1116126](https://bugzilla.mozilla.org/show_bug.cgi?id=1116126)
* CSS order property (Flexbox) affects document tabbing sequence - [Gecko 1116140](https://bugzilla.mozilla.org/show_bug.cgi?id=1116140)
* focus event listener on arbitrary SVGElement makes it focusable - [Blink 445798](https://code.google.com/p/chromium/issues/detail?id=445798), [WebKit 140024](https://bugs.webkit.org/show_bug.cgi?id=140024)
* SVGElement.prototype.focus is missing - [Gecko 1116966](https://bugzilla.mozilla.org/show_bug.cgi?id=1116966), [Trident 1072662](https://connect.microsoft.com/IE/feedback/details/1072662)
* empty tabindex [tabindex=""] parsed and exposed as [tabindex="-32768"] - [Trident 1072965](https://connect.microsoft.com/IE/feedback/details/1072965)
* wrong activeElement when focusing element in ShadowDOM - [Gecko 1117535](https://bugzilla.mozilla.org/show_bug.cgi?id=1117535)
* multiple FocusEvents for focus change within the same ShadowRoot - [Gecko 1117544](https://bugzilla.mozilla.org/show_bug.cgi?id=1117544)
* positive tabindex elements within ShadowDOM are improperly sorted into document's tabbing sequence - [Gecko 1117552](https://bugzilla.mozilla.org/show_bug.cgi?id=1117552)
* Implement >>> Selecting Through Shadows Selector for access into shadow root - [Gecko 1117572](https://bugzilla.mozilla.org/show_bug.cgi?id=1117572)
* Rename "Selecting Through Shadows Selector" from "/deep" to ">>>" - [Blink 446051](https://code.google.com/p/chromium/issues/detail?id=446051)
* sequential navigation failure for negative tabindex on ShadowHost - ~[Blink 446584](https://code.google.com/p/chromium/issues/detail?id=446584)~
* area elements added to document sequential navigation order in DOM order instead of in place of referencing image - [Blink 447289](https://code.google.com/p/chromium/issues/detail?id=447289), [WebKit 140259](https://bugs.webkit.org/show_bug.cgi?id=140259)
* DOM Level 3: FocusEvent sequence - [Blink 449857](https://code.google.com/p/chromium/issues/detail?id=449857), [WebKit 140596](https://bugs.webkit.org/show_bug.cgi?id=140596), [Trident 1092647](https://connect.microsoft.com/IE/feedback/details/1092647)
* :target element not focused properly when element with autofocus attribute exists - [WebKit 140963](https://bugs.webkit.org/show_bug.cgi?id=140963)
* focusing of disabled fieldset element is not prevented - [Blink 453847](https://code.google.com/p/chromium/issues/detail?id=453847), [Webkit 141086](https://bugs.webkit.org/show_bug.cgi?id=141086)
* consecutive object elements break document tabbing order - [Trident 1109008](https://connect.microsoft.com/IE/feedback/details/1109008)
* object element with SVG content is not focusable, with SWF content it is - [Trident 1109020](https://connect.microsoft.com/IE/feedback/details/1109020)
* visible descendants of collapsed table row are not rendered but focused and tabbable - [Gecko 1128036](https://bugzilla.mozilla.org/show_bug.cgi?id=1128036)
* audio element without valid source is not rendered but focusable - [Gecko 1128047](https://bugzilla.mozilla.org/show_bug.cgi?id=1128047)
* invalid tabindex value makes element focusable - [Gecko 1128054](https://bugzilla.mozilla.org/show_bug.cgi?id=1128054)
* Focus Link Target (sequential focus navigation starting point) - [Blink 454172](https://code.google.com/p/chromium/issues/detail?id=454172), [WebKit 141136](https://bugs.webkit.org/show_bug.cgi?id=141136), [Trident 1111056](https://connect.microsoft.com/IE/feedback/details/1111056)
* element.scrollIntoView() confused by scroll-behavior:smooth; - [Gecko 1139745](https://bugzilla.mozilla.org/show_bug.cgi?id=1139745)
* audio and video elements with controls cannot be removed from the focus navigation sequence - [Blink 512133](https://code.google.com/p/chromium/issues/detail?id=512133)
* embed element cannot be removed from the focus navigation sequence [Gecko 1185657](https://bugzilla.mozilla.org/show_bug.cgi?id=1185657)
* embed element with tabindex="0" breaks sequential focus navigation [Gecko 1195457](https://bugzilla.mozilla.org/show_bug.cgi?id=1195457)
* `<summary>` and `<a>` within `<details open>` not keyboard focusable [WebKit 151767](https://bugs.webkit.org/show_bug.cgi?id=151767)
* label element with tabindex attribute is keyboard focusable [Gecko 1240285](https://bugzilla.mozilla.org/show_bug.cgi?id=1240285)


## Filed specification issues

* [object element usemap should be deprecated](https://www.w3.org/Bugs/Public/show_bug.cgi?id=27756)
* [[Shadow]: how is the autofocus attribute supposed to be handled?](https://www.w3.org/Bugs/Public/show_bug.cgi?id=27757)
* [Sequential Navigation Focus Order for Image Maps](https://www.w3.org/Bugs/Public/show_bug.cgi?id=27787)
* [initial focus precedence: autofocus or fragment identifier](https://www.w3.org/Bugs/Public/show_bug.cgi?id=27912)
* [focusing steps don't contain scrolling an element into view](https://www.w3.org/Bugs/Public/show_bug.cgi?id=27913)
* [[Specifiction] Extending Element-level focus APIs](http://discourse.specifiction.org/t/extending-element-level-focus-apis/726)

