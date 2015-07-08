# Working With The ally.js Source


## Compiling

The `src` directory contains ES6 which needs to be compiled to ES5 for broader browser support. In order to make consumption easier, all files are compiled to CommonJS and AMD module formats and made available in `dist/amd` and `dist/common`. To make ally.js available without any module system (undesired but common scenario), `dist/ally.js` contains the entirety of ally.js in a single file exposing `window.ally`.

### Usage

```sh
# build CommonJS, AMD and global variants
npm run build
# build only the CommonJS variant
npm run build-common
# build only the AMD variant
npm run build-amd
# build only the global variant
npm run build-global

# keep compiling to dist/amd while working on src
npm run watch
# remove everything in dist
npm run clean
```

Stop that `npm run` bollocks, gimme real CLI:

```sh
# build only the CommonJS variant
node_modules/.bin/babel --source-maps --modules common --out-dir dist/common src
# build only the AMD variant
node_modules/.bin/babel --source-maps --modules amd --out-dir dist/amd src
# build only the global variant
node_modules/.bin/babel --source-maps --out-file dist/ally.js src/a11y.js

# keep compiling to dist/amd while working on src
node_modules/.bin/babel --watch --source-maps --modules amd --out-dir dist/amd src
# remove everything in dist
rm -rf dist/*
```

See the [Babel CLI docs](https://babeljs.io/docs/usage/cli/)

---

## Linting

Since ally.js is using the ES6 Module Syntax - and [eslint](https://github.com/eslint/eslint) does not support that yet - we're using [babel-eslint](https://github.com/babel/babel-eslint) as the parser in eslint (configured via `.eslintrc`).

See eslint docs for [configuration options](http://eslint.org/docs/user-guide/configuring).

Although listed in the devDependencies of package.json and thus installed locally, babel-eslint has to be installed globally (for now?):

```sh
npm install -g babel-eslint
```

### Usage

```sh
npm run lint
```

Stop that `npm run` bollocks, gimme real CLI:

```sh
eslint src/**/*.js
```
