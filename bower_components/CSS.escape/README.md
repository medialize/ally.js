# `CSS.escape` polyfill [![Build status](https://travis-ci.org/mathiasbynens/CSS.escape.svg?branch=master)](https://travis-ci.org/mathiasbynens/CSS.escape) [![Code coverage status](http://img.shields.io/coveralls/mathiasbynens/CSS.escape/master.svg)](https://coveralls.io/r/mathiasbynens/CSS.escape)

A robust polyfill for [the `CSS.escape` utility method as defined in CSSOM](http://dev.w3.org/csswg/cssom/#the-css.escape%28%29-method).

For a more powerful alternative, consider using [cssesc](http://mths.be/cssesc), which automatically takes care of excessive whitespace, and has many options to customize the output.

## Installation

In a browser:

```html
<script src="css.escape.js"></script>
```

Via [npm](http://npmjs.org/):

```bash
npm install css.escape
```

Then, in [Node.js](http://nodejs.org/):

```js
require('css.escape');

// On Windows and on Mac systems with default settings, case doesn’t matter,
// which allows you to do this instead:
require('CSS.escape');
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](http://mathiasbynens.be/) |

## License

This polyfill is available under the [MIT](http://mths.be/mit) license.
