# ally.js Contribution Guide

* ally.js is a tool for modern browsers (IE10 and newer), if you need to support anything older than that, feel free to submit PRs.
* ally.js is authored in ES6 ("ES.next", "ES2015", …) while still providing maximum convenience when it comes to consuming the library (compiled UMD bundle, AMD modules, CommonJS modules, ES6 modules).
* To stay lean, we don't want to add external dependencies unless we absolutely have to.
* To stay out of the "too many tools" debate, build infrastructure has to work via npm (configured via `package.json`).


## Found an Issue?

If you found a bug (or think you found a bug) in the code or docs, please [file an issue](https://github.com/medialize/ally.js/issues/new). If you're able to fix the problem yourself, please [submit a pull request](#contributing-code).


## Want a Feature?

You can *request* a new feature by [filing an issue](https://github.com/medialize/ally.js/issues/new). If you would like to *implement* a new feature, please first [filing an issue](https://github.com/medialize/ally.js/issues/new) with a proposal for your work, so we can help you make sure your efforts don't go to waste. ally.js tackles low- and mid-level API problems in regard to anything a web application has to do to "become accessible". ally.js is *not* a UI framework, it does *not* aim to replace jQuery and it's *not* a general-purpose-web-utility-swiss-army-knife.


## Contributing Code

We try to follow Angular's [Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines):

```text
<type>(<scope>): <subject>

<body>
```

The `type` (see list below) identifies how the project was improved. The `scope` identifies what was improved (e.g. `style/focus-within`). The `subject` declares what was done to the component. The `body` is optional and can be used to explain the changes in detail. E.g: `docs(maintain/disabled): add note on IE10 <fieldset disabled>`.

* **feature**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

Also following their [Submitting a Pull Request](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-submitting-a-pull-request-pr) guide isn't the worst idea, although *at this point* we're not the pedantic bunch.


### Further Resources

* [Building ally.js](docs/contributing/build.md)
* [Documenting ally.js](docs/contributing/docs.md)
* [Testing ally.js](docs/contributing/testing.md)


## Directories

```text
ally.js
  / dist: contains the built distributable files - never check into git!
  / docs: contains the markdown documentation
  / build: contains scripts concerning the build pipeline
  / src: contains ally.js source
  / test: contains unit and functional tests for ally.js source
  / tests: contains browser behavior evaluation tests
    / browser-bugs: contains issue reproduction demos for filed browser bugs
```
