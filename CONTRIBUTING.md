# ally.js Contribution Guide

* ally.js is a tool for modern browsers (IE10 and newer), if you need to support anything older than that, feel free to submit PRs.
* ally.js is authored in ES6 ("ES.next", "ES2015", …) (specifically make use of the ES6 Module Syntax) while still providing maximum convenience when it comes to consuming the library (compiled UMD bundle, AMD modules, CommonJS modules, ES6 modules).
* To stay lean, we don't want to add external dependencies unless we absolutely have to.
* To stay out of the "too many tools" debate, build infrastructure has to work via npm (configured via `package.json`).

---

* [Building ally.js](docs/build.md)
* [Documenting ally.js](docs/docs.md)
