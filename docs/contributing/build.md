---
layout: doc-page.html
---

# Build Infrastructure

The build infrastructure consists of a few tools made available through `npm run` commands.

This document is concerned with building the JavaScript source code. See [Documentation Infrastructure](docs.md) for how the documentation and website are generated.


## Building

```sh
# build everything
npm run build

# remove everything in dist
npm run clean
```

### Building the UMD bundle

ally.js is made available in one convenient file, consumable as a browser global (`window.ally`), via AMD and CommonJS (exposed in UMD). The source is compiled to the distributable by [browserify](https://github.com/substack/node-browserify) using [babelify](https://github.com/babel/babelify) to resolve the ES6 modules.

```sh
# build the CommonJS modules
npm run build:common

# build the UMD bundle
npm run build:umd

# remove everything in dist
npm run clean
```

### Building AMD and CommonJS Modules

To allow developers to use selected features (rather than import everything), the ES6 source (`src`) is made available in ES5 via AMD and CommonJS in `dist/amd` and `dist/common`.

```sh
# convert to CommonJS modules
npm run build:common

# convert to AMD modules
npm run build:amd

# keep converting to dist/amd while working on src
npm run watch:amd
```

See the [Babel CLI docs](https://babeljs.io/docs/usage/cli/)

---

## Linting

Since ally.js is using the ES6 Module Syntax - and [eslint](https://github.com/eslint/eslint) does not support that yet - we're using [babel-eslint](https://github.com/babel/babel-eslint) as the parser in eslint and configured via [`.eslintrc`](https://github.com/medialize/ally.js/blob/master/.eslintrc). See the docs to understand the [rules](http://eslint.org/docs/rules).

While code style is validated using eslint, code format is verified using [jscs](http://jscs.info/overview.html) and configured via [`.jscsrc`](https://github.com/medialize/ally.js/blob/master/.jscsrc).

* **Note:** Although listed in the devDependencies of package.json and thus installed locally, babel-eslint has to be installed globally:

```sh
npm install -g babel-eslint
```

### Usage

```sh
# lint everything
npm run lint

# lint only JavaScript
npm run lint:js

# lint only Markdown
npm run lint:md
```

Linting is done automatically via git hooks by way of [husky](https://www.npmjs.com/package/husky).

---

## ES6 In Older Browsers

Currently only a single ES6 function `Array.prototype.findIndex` is used in ally.js. Should we choose to use more ES6 functions, possibly things like `Set` and `Map`, we would have to include the [babel polyfill](http://babeljs.io/docs/usage/polyfill/) in our distribution. This step should not be taken lightly, as the polyfill is a heavyweight.

```js
npm install babel-core
cat node_modules/babel-core/browser-polyfill.js dist/ally.js > dist/ally.old-browser.js
```
