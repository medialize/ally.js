---
layout: doc-page.html
---

# Releasing ally.js

The following sequence steps are necessary to fully release ally.js


## Publishing the library to npm

* `npm version <version>` to update the package version
* update `CHANGELOG.md` accordingly
* `git commit package.json CHANGELOG.md -m 'chore(build): bumping to version <version>'` to save the changes
* `npm run clean` to empty `dist`, `web` and `reports`
* `npm run lint` to build the library
* `npm run build` to build the library
* `npm run test` to verify the library's integrity
* The library can now be published to beta or stable:
  * `npm run publish:npm:beta` to publish to npm beta channel (skip steps 7, 8, 12)
  * `npm run publish:npm` to publish to npm stable channel
* `npm run publish:jsbin` to update the examples on JSBin.com
* `npm run build:website` to build the website
* `git tag <version>` (unless the library hasn't been updated)
* `git push --no-verify && git push --tags --no-verify` to push the changes to github
* open the [releases](https://github.com/medialize/ally.js/releases) page, edit the new tag and copy-paste the relevant changes from `CHANGELOG.md` (mark as `pre-release` if the library was pushed to beta channel)
* `npm run publish:website` to publish the website to the `gh-pages` branch


---

* **HELP:** Got a better Idea to solve this? [file an issue](https://github.com/medialize/ally.js/issues/new)!
