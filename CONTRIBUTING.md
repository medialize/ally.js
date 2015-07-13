# ally.js Contribution Guide

* ally.js is a tool for modern browsers (IE10 and newer), if you need to support anything older than that, feel free to submit PRs.
* ally.js is authored in ES6 ("ES.next", "ES2015", …) (specifically make use of the ES6 Module Syntax) while still providing maximum convenience when it comes to consuming the library (compiled UMD bundle, AMD modules, CommonJS modules, ES6 modules).
* To stay lean, we don't want to add external dependencies unless we absolutely have to.
* To stay out of the "too many tools" debate, build infrastructure has to work via npm (configured via `package.json`).

---

## Compiling ally.js

```sh
# build everything
npm run build
# remove everything in dist
npm run clean
```

### Compiling ally.js to a single UMD bundle

ally.js is made available in one convenient file, consumable as a browser global (`window.ally`), via AMD and CommonJS (exposed in UMD). The source is compiled to the distributable by [browserify](https://github.com/substack/node-browserify) using [babelify](https://github.com/babel/babelify) to resolve the ES6 modules.

```sh
# build the UMD bundle
npm run build-umd
# remove everything in dist
npm run clean
```

Stop that `npm run` bollocks, gimme real CLI:

```sh
# build the UMD bundle
node_modules/.bin/browserify \
  src/ally.js \
  --debug \
  --standalone ally \
  --transform babelify \
  | exorcist dist/ally.js.map > dist/ally.js
# minify the UMD bundle
node_modules/.bin/uglifyjs \
  dist/ally.js \
  --in-source-map dist/ally.js.map \
  --source-map dist/ally.min.js.map \
  --preamble '/*! ally.js */' \
  --screw-ie8 \
  --mangle \
  --compress \
  --output dist/ally.min.js
# remove everything in dist
rm -rf dist/*
```

### Converting to AMD and CommonJS

To allow developers to use selected features (rather than import everything), the ES6 source (`src`) is made available in ES5 via AMD and CommonJS in `dist/amd` and `dist/common`.

```sh
# convert to CommonJS modules
npm run build-common
# convert to AMD modules
npm run build-amd
# keep converting to dist/amd while working on src
npm run watch-amd
```

Stop that `npm run` bollocks, gimme real CLI:

```sh
# convert to CommonJS modules
node_modules/.bin/babel \
  --source-maps \
  --modules common \
  --out-dir dist/common \
  src
# convert to AMD modules
node_modules/.bin/babel \
  --source-maps \
  --modules amd \
  --out-dir dist/amd \
  src
# keep converting to dist/amd while working on src
node_modules/.bin/babel \
  --watch \
  --source-maps \
  --modules amd \
  --out-dir dist/amd \
  src
```

See the [Babel CLI docs](https://babeljs.io/docs/usage/cli/)

---

## Linting

Since ally.js is using the ES6 Module Syntax - and [eslint](https://github.com/eslint/eslint) does not support that yet - we're using [babel-eslint](https://github.com/babel/babel-eslint) as the parser in eslint (configured via `.eslintrc`). See the docs to understand the [rules](http://eslint.org/docs/rules).

While code style is validated using eslint, code format is verified using [jscs](http://jscs.info/overview.html) (configured via `.jscsrc`).

**Note:** Although listed in the devDependencies of package.json and thus installed locally, babel-eslint has to be installed globally (for now?):

```sh
npm install -g babel-eslint
```

### Usage

```sh
npm run lint
```

Stop that `npm run` bollocks, gimme real CLI:

```sh
node_modules/.bin/eslint src/**/*.js
node_modules/.bin/jscs src
```

Linting is done automatically via git hooks by way of [husky](https://www.npmjs.com/package/husky).

----

## ES6 in older browsers

Currently only a single ES6 function (Array.prototype.findIndex) is used in ally.js. Should we choose to use more ES6 functions, possibly things like `Set` and `Map`, we would have to include the [babel polyfill](http://babeljs.io/docs/usage/polyfill/) in our distribution

```js
npm install babel-core
cat node_modules/babel-core/browser-polyfill.js dist/ally.js > dist/ally.old-browser.js
```

---

## External Dependencies

The ally.js not only contains the library but also a lot of browser capability tests in the `tests` directory and the website in the `gh-pages` branch. To make all that stuff run a couple of dependencies have to be made available, that are *not* required to run the core library itself, but since don't have custom `dependencies` namespaces available in npm, the following packages are referenced as `devDependencies` as well:

* [requirejs](https://www.npmjs.com/package/requirejs)
* [underscore](https://www.npmjs.com/package/underscore)
* [sequence-comparison-table](https://www.npmjs.com/package/sequence-comparison-table)
* [jquery](https://www.npmjs.com/package/jquery)
* [jquery-ui](https://www.npmjs.com/package/jquery) wtf? `"jquery-ui": "https://github.com/jquery/jquery-ui.git#1.11.4",` possibly `https://github.com/components/jqueryui`
* [platform](https://www.npmjs.com/package/platform)

