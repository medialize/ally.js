---
layout: doc-page.html
---

# Documentation Infrastructure

The documentation is authored in markdown in the `docs` directory. We're using [Remarkable](https://www.npmjs.com/package/remarkable) (but staying close to [Github Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)) to convert the markdown to HTML. [markdownlint](https://github.com/DavidAnson/markdownlint/) is there to lint the files, its configuration is maintained in `scripts/markdownlint.js`, see the [Rules](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md).


## Building The Website

The doc source are converted to HTML by [metalsmith](http://metalsmith.io/), the scripts and configuration are maintained in the `metalsmith` directory.

The website is comprised of 3 elements, the markdown sources, data tables and some legacy files from `./tests`.

```sh
# lint the markdown
npm run lint:md

# generate website (to `./web`)
npm run build:website

# generate only the markdown files
npm run build:docs

# generate only the data tables
npm run build:data-tables

# generate only the legacy files
npm run build:legacy
```

The commands `lint:md` and `build:website` are also executed by `npm run lint` and `npm run build`

If you're new to metalsmith, have a look at [simple static site demo](https://github.com/segmentio/metalsmith/tree/master/examples/static-site) and [getting to know metalsmith](http://www.robinthrift.com/posts/getting-to-know-metalsmith/).

We use the following plugins:

* [metalsmith-packagejson](https://www.npmjs.com/package/metalsmith-packagejson) to import `package.json`
* [metalsmith-markdown-remarkable](https://github.com/attentif/metalsmith-markdown-remarkable) (see [config options](https://github.com/jonschlinkert/remarkable#options)
* [metalsmith-register-helpers](https://github.com/losttype/metalsmith-register-helpers) to use custom handlebar helpers
* [metalsmith-layouts](https://github.com/superwolff/metalsmith-layouts) to use [handlebars](http://handlebarsjs.com/) templates
* [metalsmith-broken-link-checker](https://github.com/davidxmoody/metalsmith-broken-link-checker) to verify link integrity
* [metalsmith-collections](https://github.com/segmentio/metalsmith-collections) to deal with groups of files
* [metalsmith-static](https://github.com/TheHydroImpulse/metalsmith-static) to copy static assets
* [metalsmith-redirect](https://github.com/aymericbeaumet/metalsmith-redirect/) to create HTML redirection files to forward old URLs to their new homes

## Authoring Documentation

// TODO: explain the documentation structure

### Notes and Warnings

In API pages (`layout: doc-api.html`) a separate block `## Notes` can contain a list of notes and warnings in the following form:

```md
## Notes

* **NOTE:** I'm informing you of something you SHOULD know
* **WARNING:** I'm informing you of something you MUST know (because it's not obvious)
```

In any other doc page (e.g. `layout: doc-page.html`) notes and warnings do not have to (but can) be contained in a `## Notes` section. The notation (list with bold identifier, identifier upper-cased and containing the colon) remains the same. The list notation is used to allow `metalsmith/plugin/prepare.js` reformatting those blocks to `<div class="note">…</div>` while still allowing github to render something readable.

* **NOTE:** Got a better Idea to solve this? [file an issue](https://github.com/medialize/ally.js/issues/new)!

