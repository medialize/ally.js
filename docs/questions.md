---
layout: doc-page.html
---

# Frequently asked questions

There are a couple of questions we have been asked over and over again…

## Does ally.js support Internet Explorer 8 and below?

The short answer is *no*. IE8 is too far behind on various APIs to make the existing code work. Additionally, our test system [Intern](https://theintern.github.io/) does not run on IE8. Also [Microsoft ended support for IE8 in January 2016](https://www.microsoft.com/en-us/WindowsForBusiness/End-of-IE-support).

While ally.js has not been tested to *run* on IE8, we have made sure that it can be *loaded* without problems. Since ally.js is compiled to ES5, you will need to load the [es5-shim](https://github.com/es-shims/es5-shim/) in IE8:

```html
<!--[if lt IE 9]>
  <script src="node_modules/es5-shim/es5-shim.js"></script>
  <script src="node_modules/es5-shim/es5-sham.js"></script>
<![endif]-->
```


## Do I need ally.js for static websites?

Probably not. If you don't have any interactive widgets on your site, chances are ally.js is not going to do you much good. Except for maybe help [get around some non-JavaScript accessibility issues across browsers](api/README.md#Countering-browser-bugs).


## "ally" not "a11y"?

When the project started in October 2014, it was called "a11y.js". We didn't register any domains or grabbed the npm package name - which turned out to be a problem a couple of weeks later. We're not sad this happened.

"ally" ([phonetic](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet) `ælaj`) is easier to pronounce than "a11y" (phonetic `ə əlɛvən waj`). "a11y" is a [numeronym](https://en.wikipedia.org/wiki/Numeronym) and expands to "accessibility". "ally" has a number of [definitions](http://dictionary.reference.com/browse/ally) ranging from "friend" to "cooperating", which has a much nicer tone to it.


## Why was this created?

While trying to learn accessibility in general and keyboard navigation in particular, it became obvious that the web was not making things very easy. Tutorials were missing important pieces - coherence and a focus on the developer usually wasn't a thing. Examples looked like their JavaScript was written in the 90s, or depended on jQuery, or simply skipped the meaty parts.

We weren't able to use any of the existing solutions. We also weren't going to just copy paste other people's code into our applications and let the cycle repeat. We wanted to create the basis for accessibility experts and web developers to *collaborate* in a way that might help everyone.


## Ultimate goal?

In theory the ultimate goal for ally.js is to make itself obsolete because web standards and browser implementations have caught up. This isn't very likely to happen any time soon, if at all. In the meanwhile the goal is to provide all the low-level utilities required for other libraries and websites and applications to make accessible experiences an easier target. Have a look at [GOALS.md](https://github.com/medialize/ally.js/tree/master/GOALS.md) to find out what we're planning.


## Corporate backing?

As of today ally.js does not receive official funding or guidance from anyone. The project is maintained by people volunteering their spare time.


## Multiple personality disorder?

Most of the documentation was written from a group perspective ("we have done…"), but some statements are personal ("I have done"). I have gone with the group voice, because I hope it won't take long for others to join the project. That said, while I have *created* most of the resources so far, many people have been involved in figuring out how to do things.

