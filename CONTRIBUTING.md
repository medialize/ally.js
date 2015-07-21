# ally.js Contribution Guide

* ally.js is a tool for modern browsers (IE10 and newer), if you need to support anything older than that, feel free to submit PRs.
* ally.js is authored in ES6 ("ES.next", "ES2015", …) while still providing maximum convenience when it comes to consuming the library (compiled UMD bundle, AMD modules, CommonJS modules, ES6 modules).
* To stay lean, we don't want to add external dependencies unless we absolutely have to.
* To stay out of the "too many tools" debate, build infrastructure has to work via npm (configured via `package.json`).


## Contributing Code

The [stable](https://github.com/medialize/ally.js/tree/stavke) branch reflects the state of the latest released version. We work in [master](https://github.com/medialize/ally.js/tree/master) - and that's where your PRs need to go. The stable branch is only ever merged from master to create a new release.

We try to follow Angular's [Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)

* [Building ally.js](docs/build.md)
* [Documenting ally.js](docs/docs.md)
* [Testing ally.js](docs/testing.md)


## Directories

```text
ally.js
  / dist: contains the built distributable files - never check into git!
  / docs: contains the markdown documentation
  / metalsmith: contains files to generate the website and HTML docs
  / scripts: contains scripts concerning the build pipeline
  / src: contains ally.js source
  / test: contains unit and functional tests for ally.js source
  / tests: contains browser behavior evaluation tests
    / browser-bugs: contains issue reproduction demos for filed browser bugs
```