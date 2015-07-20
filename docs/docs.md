---
layout: doc-page.html
---

# Documentation Infrastructure

The documentation is authored in markdown in the `docs` directory. We're using [Remarkable](https://www.npmjs.com/package/remarkable) (but staying close to [Github Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)) to convert the markdown to HTML. [markdownlint](https://github.com/DavidAnson/markdownlint/) is there to lint the files, its configuration is maintained in `scripts/markdownlint.js`, see the [Rules](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md).

// TODO: explain the documentation structure

## Building The Website

The doc source are converted to HTML by [metalsmith](http://metalsmith.io/), the configuration is maintained in `metalsmith.json` and templates and support files are located in the `metalsmith` directory.

```sh
# lint the markdown
npm run lint-md

# generate website (to dist/docs)
npm run build-docs
```

Both commands are subsets of the groups `npm run lint` and `npm run build`

If you're new to metalsmith, have a look at [simple static site demo](https://github.com/segmentio/metalsmith/tree/master/examples/static-site) and [getting to know metalsmith](http://www.robinthrift.com/posts/getting-to-know-metalsmith/).

We use the following plugins:

* [metalsmith-packagejson](https://www.npmjs.com/package/metalsmith-packagejson) to import `package.json`
* [metalsmith-markdown-remarkable](https://github.com/attentif/metalsmith-markdown-remarkable) (see [config options](https://github.com/jonschlinkert/remarkable#options)
* [metalsmith-register-helpers](https://github.com/losttype/metalsmith-register-helpers) to use custom handlebar helpers
* [metalsmith-layouts](https://github.com/superwolff/metalsmith-layouts) to use [handlebars](http://handlebarsjs.com/) templates
* [metalsmith-broken-link-checker](https://github.com/davidxmoody/metalsmith-broken-link-checker) to verify link integrity
