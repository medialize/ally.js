
# Linting

```sh
# via npm
npm run lint

# manually
eslint src/**/*.js
```

Since ally.js is using the ES6 Module Syntax - and [eslint](https://github.com/eslint/eslint) does not support that yet - we're using [babel-eslint](https://github.com/babel/babel-eslint) as the parser in eslint (configured via `.eslintrc`). See eslint docs for [configuration options](http://eslint.org/docs/user-guide/configuring). Although listed in the devDependencies of package.json and thus installed locally, babel-eslint has to be installed globally (for now?):

```sh
npm install -g babel-eslint
```
