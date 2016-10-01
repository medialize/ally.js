---
layout: doc-page.html
---

# Releasing ally.js

The following sequence steps are necessary to fully release ally.js


## Publishing the library to npm

* `npm version <version>` to update the package version
* update `CHANGELOG.md` accordingly
* `npm run version` to replace `v#master` in docs and bump jsbin examples accordingly
* `git commit package.json CHANGELOG.md docs -m 'chore(build): bumping to version <version>'` to save the changes
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
* `git push && git push --tags` to push the changes to github
* open the [github releases page](https://github.com/medialize/ally.js/releases), then
  * edit the new tag and copy-paste the relevant changes from `CHANGELOG.md`
  * upload the files `dist/ally.js`, `dist/ally.js.map`, `dist/ally.js.zip` and `dist/ally.js.tar.gz`
  * mark as `pre-release` if the library was pushed to beta channel
* `npm run publish:algolia` to publish the search index
* `npm run publish:website` to publish the website to the `gh-pages` branch

## Branch Rules

* `master` contains fully integrated work that may not be released yet. All PRs have to point at this branch.
* `gh-pages` contains the website. It is only updated through `npm run publish:website`. PRs against this branch must be rejected.

:::help
Got a better Idea to solve this? [file an issue](https://github.com/medialize/ally.js/issues/new)!
:::
