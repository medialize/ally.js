# Working With The ally.js Source

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
node_modules/.bin/browserify \
  src/ally.js \
  --debug \
  --standalone ally \
  --transform babelify \
  --outfile dist/ally.js
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
