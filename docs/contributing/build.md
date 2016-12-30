---
layout: doc-page.html
---

# Build infrastructure

The build infrastructure consists of a few tools made available through `npm run` commands.

This document is concerned with building the JavaScript source code. See [Documentation Infrastructure](docs.md) for how the documentation and website are generated.

:::note
If this is your first contact with ally.js, make sure to run `npm run init` after cloning the repository. This will run `npm install`, `npm run clean`, `npm run build` and `npm run build:website` to make sure your local copy is ready.
:::


## Building

```sh
# build everything
npm run build

# remove everything in dist
npm run clean
```

`npm run build` first runs `build:pre` to setup the `dist` directory, overwriting `src/version.js` to expose the package version:

```text
dist
└── src
    └── <ES6 files>
```

`npm run build` then runs `build:umd`, `build:amd`, `build:common` and creates the following structure in the `dist` directory:

```text
dist
├── <UMD bundle>
├── amd
│   └── <UMD module files>
└── common
│   └── <CommonJS module files>
└── src
    └── <ES6 module files>
```

`npm run build` then runs `build:post` after the bundle and modules have been created, mutating the the `dist` directory to the following structure (that is published to npm):

```text
dist
├── package.json
├── README.md
├── CHANGELOG.md
├── LICENSE.txt
├── <UMD bundle>
├── <CommonJS module files>
├── amd
│   └── <UMD module files>
└── src
    └── <ES6 module files>
```

At the end `npm run build` also runs `build:archive`, which creates a ZIP archive of `dist` and saves it to `dist/ally.js.zip`.


### Building the UMD bundle

ally.js is made available in one convenient file, consumable as a browser global (`window.ally`), via AMD and CommonJS (exposed in UMD). The source is compiled to the distributable by [browserify](https://github.com/substack/node-browserify) using [babelify](https://github.com/babel/babelify) and [rollupify](https://github.com/nolanlawson/rollupify/) to resolve the ES6 modules.

```sh
# build the UMD bundle
npm run build:umd

# remove everything in dist
npm run clean
```

### Building AMD and CommonJS modules

To allow developers to use selected features (rather than import everything), the ES6 source (`src`) is made available in ES5 via AMD and CommonJS in `dist/amd` and `dist/common`.

```sh
# convert to CommonJS modules
npm run build:common

# convert to AMD modules
npm run build:amd

# keep converting to dist/amd while working on src
npm run watch:amd
```

Since `v#master` the AMD modules are actually UMD modules, because of how babel 6 handles default exports. Since UMD can be consumed by both AMD and CommonJS system, a separate CommonJS build is not necessary anymore. However, changing the npm module's structure is a breaking change and has thus been deferred to the next major release.


---

## Linting

We use [eslint](https://github.com/eslint/eslint) with [eslint-config-semistandard](https://github.com/Flet/eslint-config-semistandard) and a [few custom rules](https://github.com/medialize/ally.js/blob/master/.eslintrc.js) to keep the JavaScript sane. The markdown files are kept sane through [markdownlint](https://github.com/DavidAnson/markdownlint) and [eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown).

### Usage

```sh
# lint everything
npm run lint

# lint only JavaScript
npm run lint:js

# lint only Markdown
npm run lint:md

# lint only JavaScript in Markdown
npm run lint:md:js

# fix linting errors
npm run lint:js:fix
```

Linting is done automatically during `git commit` by way of [pre-commit](https://www.npmjs.com/package/pre-commit) and limited to the actually changed files by way of [lint-staged](https://www.npmjs.com/package/lint-staged) in order to keep `git commit` as fast as possible.

---

## ES6 in older browsers

Currently only a single ES6 function `Array.prototype.findIndex` is used in ally.js. Should we choose to use more ES6 functions, possibly things like `Set` and `Map`, we would have to include the [babel polyfill](http://babeljs.io/docs/usage/polyfill/) in our distribution. This step should not be taken lightly, as the polyfill is a heavyweight.

```sh
npm install babel-core
cat node_modules/babel-core/browser-polyfill.js dist/ally.js > dist/ally.old-browser.js
```
