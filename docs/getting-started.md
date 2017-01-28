---
layout: doc-page.html
---

# Getting started

ally.js is a JavaScript library simplifying certain accessibility features, functions and behaviors. However, simply loading ally.js will not automagically make a web application accessible. The library provides certain standard functions the "web platform" should've provided itself, so JavaScript applications be made accessible more easily. This document covers how to import ally.js in your project - see the [API documentation](api/README.md) to learn what the library actually provides.


## Requirements

In order to load successfully in IE8, the [es5-shim](https://github.com/es-shims/es5-shim/) has to be loaded. Please also see [Does ally.js support Internet Explorer 8 and below?](./questions.md#does-allyjs-support-internet-explorer-8-and-below).

The UMD bundle contains the following dependencies:

* [platform.js](https://github.com/bestiejs/platform.js) because parsing the userAgent string yourself is ludicrous.
* [CSSOM CSS.escape polyfill](https://github.com/mathiasbynens/CSS.escape) for properly constructing CSS query selectors.


## Downloading the UMD bundle

If you're not comfortable with package mangers, simply download the production ready UMD bundle and drop it in your project.

* <a href="https://github.com/medialize/ally.js/releases/download/{{pkg.version}}/ally.min.js" class="download-file">ally.min.js</a> UMD bundle, ready for production use
* <a href="https://github.com/medialize/ally.js/releases/download/{{pkg.version}}/ally.min.js.map" class="download-file">ally.min.js.map</a> for SourceMap support
* <a href="https://github.com/medialize/ally.js/releases/download/{{pkg.version}}/ally.js.zip" class="download-file">ally.js.zip</a> archive containing CommonJS, AMD and ES6 modules, as well as the UMD bundle (including SourceMap files)
* <a href="https://github.com/medialize/ally.js/releases/download/{{pkg.version}}/ally.js.tar.gz" class="download-file">ally.js.tar.gz</a> archive containing CommonJS, AMD and ES6 modules, as well as the UMD bundle (including SourceMap files)

All downloads are hosted on the [github release page](https://github.com/medialize/ally.js/releases).


## Loading the UMD bundle from CDN

ally.js is made available for production use by [jsDelivr](https://www.jsdelivr.com/projects/ally.js):

```html
<script src="https://cdn.jsdelivr.net/ally.js/{{pkg.version}}/ally.min.js"></script>
<script>
  console.log('loaded ally.js in version', ally.version);
  console.log('focusable elements', ally.query.focusable());
</script>
```

ally.js is also available for production use by [cdnjs](https://cdnjs.com/libraries/ally.js):

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/ally.js/{{pkg.version}}/ally.min.js"></script>
<script>
  console.log('loaded ally.js in version', ally.version);
  console.log('focusable elements', ally.query.focusable());
</script>
```

ally.js is also available via [unpkg.com](https://unpkg.com):

```html
<script src="https://unpkg.com/ally.js@{{pkg.version}}/ally.min.js"></script>
<script>
  console.log('loaded ally.js in version', ally.version);
  console.log('focusable elements', ally.query.focusable());
</script>
```

## Installing via package manager

```sh
npm install --save ally.js
```

Although [bower](https://bower.io/) can download archives, it won't be able to inform you of updates:

```sh
bower install --save https://github.com/medialize/ally.js/releases/download/{{pkg.version}}/ally.js.zip
```

You can use [system-npm](https://github.com/stealjs/system-npm) to consume ally.js from [npm](https://www.npmjs.com/package/ally.js) in SystemJS:

```js
System.import('ally.js!npm').then(function(ally) {
  console.log('loaded ally.js in version', ally.version);
});
```


## Using the UMD bundle via `<script>`

```html
<script src="path/to/ally.min.js"></script>
<script>
  console.log('loaded ally.js in version', ally.version);
  console.log('focusable elements', ally.query.focusable());
</script>
```


## Using CommonJS modules

The production UMD bundle contains all dependencies, allowing you to require ally.js directly:

```js
var ally = require('ally.js');
console.log('loaded ally.js in version', ally.version);
console.log('focusable elements', ally.query.focusable());
```

Alternatively you can use only specific modules provided by ally.js:

```js
var version = require('ally.js/version');
console.log('loaded version of ally.js', version);

var queryFocusable = require('ally.js/query/focusable');
console.log('focusable elements', queryFocusable());
```

:::note
The CommonJS modules are only available through [npm](https://www.npmjs.com/package/ally.js) and [`ally.js.zip`](https://github.com/medialize/ally.js/releases/download/{{pkg.version}}/ally.js.zip).
:::


## Using ES6 modules

ally.js is authored in ES6 and its modules are accessible in the `src` directory:

```js
import version from 'ally.js/src/version';
console.log('loaded version of ally.js', version);

import queryFocusable from 'ally.js/src/query/focusable';
console.log('focusable elements', queryFocusable());
```

:::note
The ES6 source modules are available from the [github repository](https://github.com/medialize/ally.js) through [npm](https://www.npmjs.com/package/ally.js) and [`ally.js.zip`](https://github.com/medialize/ally.js/releases/download/{{pkg.version}}/ally.js.zip).
:::

## Using ES5 code contained in ES6 modules

ally.js also ships a version of the source code as ES6 modules but with the contents of each module compiled to ES5 in the `esm` directory. It is recommeneded that you use these modules with a build tool such as [webpack 2](https://webpack.js.org/) or [Rollup](https://github.com/rollup/rollup) which understand how to parse ES6 modules but generally recommened ignoring the `node_modules` folder.

```js
import version from 'ally.js/esm/version';
console.log('loaded version of ally.js', version);

import queryFocusable from 'ally.js/esm/query/focusable';
console.log('focusable elements', queryFocusable());
```

:::note
The ES5 compiled ES6 modules with are available from the [github repository](https://github.com/medialize/ally.js) through [npm](https://www.npmjs.com/package/ally.js) and [`ally.js.zip`](https://github.com/medialize/ally.js/releases/download/{{pkg.version}}/ally.js.zip).
:::

## Using AMD modules

The production UMD bundle contains all dependencies, allowing you to require ally.js directly:

```js
require.config({
  paths: {
    'ally.js': 'node_modules/ally.js/ally.min',
  },
});

require(['ally.js'], function(ally) {
  console.log('loaded ally.js in version', ally.version);
  console.log('focusable elements', ally.query.focusable());
});
```

Alternatively you can use only specific modules provided by ally.js, but need to take care of mapping dependencies first:

```js
require.config({
  paths: {
    // map to AMD files
    'ally.js': 'node_modules/ally.js/amd',

    // provide paths to dependencies
    'css.escape': 'node_modules/css.escape/css.escape',
    'platform': 'node_modules/platform/platform',
  },
});
```

Now you can import specific modules using

```js
require(['ally.js/version'], function(version) {
  console.log('loaded version of ally.js', version);
});

require(['ally.js/query/focusable'], function(queryFocusable) {
  console.log('focusable elements', queryFocusable());
});
```

:::note
The AMD modules are only available through [npm](https://www.npmjs.com/package/ally.js) and [`ally.js.zip`](https://github.com/medialize/ally.js/releases/download/{{pkg.version}}/ally.js.zip).
:::

## Using with TypeScript

ally.js does not have a dediated set of TypeScript definitions. However you can still use ally.js in TypeScript by declaring a TypeScript module and using the ES5 compiled ES6 modules in the `esm` folder.

```ts
// in a .d.ts file, usually next to your applications entry point
declare module 'ally.js/esm/version';
declare module 'ally.js/esm/query/focusable';
```

```ts
// in your application code
import version from 'ally.js/esm/version';
console.log('loaded version of ally.js', version);

import queryFocusable from 'ally.js/esm/query/focusable';
console.log('focusable elements', queryFocusable());
```

You will also need to set `allowJs` in your `tsconfig.json` file to be `true`.

:::note
This approach allows TypeScript to build and compile ally.js it does not provide any type checking. Only a properly authored definition file can provide type checking. If you want to contribute TypeScript definitions for ally.js the TypeScript documentation has an [excellent section on declartion files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).
:::

## Integrations

* [ember-cli-ally](https://www.npmjs.com/package/ember-cli-ally) exposes ally.js to ember-cli apps as 'ally'


---

Continue with checking out one of the [Tutorials](tutorials/README.md) or head on to the [API documentation](api/README.md)
