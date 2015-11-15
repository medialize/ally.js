---
layout: doc-page.html
---

# Getting Started

ally.js is a JavaScript library simplifying certain accessibility features, functions and behaviors. However, simply loading ally.js will not automagically make a web application accessible. The library provides certain standard functions the "web platform" should've provided itself, so JavaScript applications be made accessible more easily. This document covers how to import ally.js in your project - see the [API Documentation](api/README.md) to learn what the library actually provides.


## Downloading the UMD bundle

You can download the production file (UMD bundle) [`ally.min.js`](https://github.com/medialize/ally.js/releases/download/{{pkg.version}}/ally.min.js) (and [`ally.min.js.map`](https://github.com/medialize/ally.js/releases/download/{{pkg.version}}/ally.min.js.map) if you want [Source Maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) support) from the [github release page](https://github.com/medialize/ally.js/releases).

## Loading the UMD bundle from CDN

ally.js is made available for production use by [cdnjs](https://cdnjs.com/libraries/ally.js):

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/ally.js/{{pkg.version}}/ally.min.js"></script>
<script>
  console.log("loaded ally.js in version", ally.version);
  console.log("focusable elements", ally.query.focusable());
</script>
```


## Installing via Package Manager

```sh
npm install --save ally.js
```

Although [bower](http://bower.io/) can download archives, it won't be able to inform you of updates:

```sh
bower install --save https://github.com/medialize/ally.js/releases/download/{{pkg.version}}/ally.js.zip
```

You can use [system-npm](https://github.com/stealjs/system-npm) to consume ally.js from [npm](https://www.npmjs.com/package/ally.js) in SystemJS:

```js
System.import("ally.js!npm").then(function(ally) {
  console.log("loaded ally.js in version", ally.version);
});
```


## Using the UMD bundle via `<script>`

```html
<script src="path/to/ally.min.js"></script>
<script>
  console.log("loaded ally.js in version", ally.version);
  console.log("focusable elements", ally.query.focusable());
</script>
```


## Using CommonJS Modules

The production UMD bundle contains all dependencies, allowing you to require ally.js directly:

```js
var ally = require('ally.js');
console.log("loaded ally.js in version", ally.version);
console.log("focusable elements", ally.query.focusable());
```

Alternatively you can use only specific modules provided by ally.js:

```js
var version = require('ally.js/version');
console.log("loaded version of ally.js", version);

var queryFocusable = require('ally.js/query/focusable');
console.log("focusable elements", queryFocusable());
```

* **NOTE:** The CommonJS modules are only available through [npm](https://www.npmjs.com/package/ally.js) and [`ally.js.zip`](https://github.com/medialize/ally.js/releases/download/{{pkg.version}}/ally.js.zip).


## Using ES6 Modules

ally.js is authored in ES6 and its modules are accessible in the `src` directory:

```js
import version from 'ally.js/src/version';
console.log("loaded version of ally.js", version);

import queryFocusable from 'ally.js/src/query/focusable';
console.log("focusable elements", queryFocusable());
```

* **NOTE:** The ES6 source modules are only available through [npm](https://www.npmjs.com/package/ally.js) and [`ally.js.zip`](https://github.com/medialize/ally.js/releases/download/{{pkg.version}}/ally.js.zip).


## Using AMD Modules

The production UMD bundle contains all dependencies, allowing you to require ally.js directly:

```js
require.config({
  paths: {
    'ally.js': 'node_modules/ally.js/ally.min',
  }
});

require(['ally.js'], function(ally) {
  console.log("loaded ally.js in version", ally.version);
  console.log("focusable elements", ally.query.focusable());
});
```

Alternatively you can use only specific modules provided by ally.js, but need to take care of mapping dependencies first:

```js
require.config({
  paths: {
    // map to AMD files
    'ally.js': 'node_modules/ally.js/amd',
    // provide paths to dependencies
    'array.prototype.findindex': 'node_modules/array.prototype.findindex/index',
    'css.escape': 'node_modules/css.escape/css.escape',
    'platform': 'node_modules/platform/platform',
  }
});
```

Now you can import specific modules using

```js
require(['ally.js/version'], function(version) {
  console.log("loaded version of ally.js", version);
});

require(['ally.js/query/focusable'], function(queryFocusable) {
  console.log("focusable elements", queryFocusable());
});
```

* **NOTE:** The AMD modules are only available through [npm](https://www.npmjs.com/package/ally.js) and [`ally.js.zip`](https://github.com/medialize/ally.js/releases/download/{{pkg.version}}/ally.js.zip).


---

Continue with checking out one of the [Tutorials](tutorials/README.md) or head on to the [API Documentation](api/README.md)

