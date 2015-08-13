---
layout: doc-page.html
---

# Getting Started With ally.js

ally.js is a JavaScript library simplifying certain accessibility features, functions and behaviors. However, simply loading ally.js will not automagically make a web application accessible. The library provides certain standard functions the "web platform" should've provided itself, so JavaScript applications be made accessible more easily. This document covers how to import ally.js in your project - see the [API Documentation](api/README.md) to learn what the library actually provides.


## Installing And Loading ally.js

You can [download](https://github.com/medialize/ally.js/releases) the production file `ally.min.js` from the github release page, or install it using your package manager of choice:

```sh
# using npm for package management
npm install ally.js --save
# using bower for package management
bower install ally.js --save
```

### Using ally.js as `<script>`

Downloaded the production file `ally.min.js` from the [releases page](https://github.com/medialize/ally.js/releases) and include it in the document:

```html
<script src="path/to/ally.min.js"></script>
<script>
  console.log("loaded ally.js in version", ally.version);
</script>
```

### Using ally.js as AMD

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
    'ally': 'bower_components/ally.js/dist/amd',
    // provide paths to dependencies
    'array.prototype.findindex': 'bower_components/array.prototype.findindex/index',
    'css.escape': 'bower_components/css.escape/css.escape',
    'platform': 'bower_components/platform/platform',
  }
});
```

Now you can import specific modules using

```js
require(['ally/version'], function(allyVersion) {
  console.log("loaded version of ally.js", allyVersion);
});
```

### Using ally.js as CommonJS

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

### Using ally.js as ES6

ally.js is authored in ES6 and its modules are accessible in the `src` directory:

```js
import allyVersion from 'ally.js/src/version';
console.log("loaded version of ally.js", allyVersion);
```

---

Continue with checking out one of the [Tutorials](tutorials/README.md) or head on to the [API Documentation](api/README.md)

