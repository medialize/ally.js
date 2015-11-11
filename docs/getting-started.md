---
layout: doc-page.html
---

# Getting Started

ally.js is a JavaScript library simplifying certain accessibility features, functions and behaviors. However, simply loading ally.js will not automagically make a web application accessible. The library provides certain standard functions the "web platform" should've provided itself, so JavaScript applications be made accessible more easily. This document covers how to import ally.js in your project - see the [API Documentation](api/README.md) to learn what the library actually provides.


## Downloading ally.js

You can [download](https://github.com/medialize/ally.js/releases) the production file `ally.min.js` (and `ally.min.js.map` if you want [Source Maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) support) from the github release page, or install it using npm:

```sh
npm install ally.js --save
```

## Loading ally.js From CDN

**FIXME:** CDNjs support is [not yet available](https://github.com/cdnjs/cdnjs/issues/6020)

ally.js is made available for production use by [cdnjs](https://cdnjs.com/libraries/ally.js):

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/URI.js/1.0.0-beta.6/ally.min.js"></script>
<script>
  console.log("loaded ally.js in version", ally.version);
</script>
```


## Using ally.js as `<script>`

```html
<script src="path/to/ally.min.js"></script>
<script>
  console.log("loaded ally.js in version", ally.version);
</script>
```


## Using ally.js as AMD

The production bundle contains all dependencies, allowing you to require ally.js directly:

```js
require(['ally.js'], function(ally) {
  console.log("loaded ally.js in version", ally.version);
});
```

Alternatively you can use only specific modules provided by ally.js, but need to take care of mapping dependencies first:

```js
require.config({
  paths: {
    // map to AMD files
    'ally': 'node_modules/ally.js/dist/amd',
    // provide paths to dependencies
    'array.prototype.findindex': 'node_modules/array.prototype.findindex/index',
    'css.escape': 'node_modules/css.escape/css.escape',
    'platform': 'node_modules/platform/platform',
  }
});
```

Now you can import specific modules using

```js
require(['ally/version'], function(allyVersion) {
  console.log("loaded version of ally.js", allyVersion);
});
```


## Using ally.js as CommonJS

The production bundle contains all dependencies, allowing you to require ally.js directly:

```js
var ally = require('ally.js');
console.log("loaded ally.js in version", ally.version);
```

Alternatively you can use only specific modules provided by ally.js:

```js
var allyVersion = require('ally.js/dist/common/version');
console.log("loaded version of ally.js", allyVersion);
```


## Using ally.js as ES6

ally.js is authored in ES6 and its modules are accessible in the `src` directory:

```js
import allyVersion from 'ally.js/src/version';
console.log("loaded version of ally.js", allyVersion);
```

---

Continue with checking out one of the [Tutorials](tutorials/README.md) or head on to the [API Documentation](api/README.md)

