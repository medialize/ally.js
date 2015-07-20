---
layout: doc-page.html
---

# Documentation Infrastructure

The documentation is authored in markdown in the `docs` directory. 

// TODO: explain the documentation structure

## Building The Website

The doc source are converted to HTML by [metalsmith](http://metalsmith.io/), the configuration is maintained in `metalsmith.json` and templates and support files are located in the `metalsmith` directory.

```sh
# generate website (to dist/docs)
npm run build-docs
```

If you're new to metalsmith, have a look at [simple static site demo](https://github.com/segmentio/metalsmith/tree/master/examples/static-site) and [getting to know metalsmith](http://www.robinthrift.com/posts/getting-to-know-metalsmith/).

We use the following plugins:

* [metalsmith-packagejson](https://www.npmjs.com/package/metalsmith-packagejson) to import `package.json`
* [metalsmith-markdown-remarkable](https://github.com/attentif/metalsmith-markdown-remarkable) (see [config options](https://github.com/jonschlinkert/remarkable#options)
* [metalsmith-register-helpers](https://github.com/losttype/metalsmith-register-helpers) to use custom handlebar helpers
* [metalsmith-layouts](https://github.com/superwolff/metalsmith-layouts) to use [handlebars](http://handlebarsjs.com/) templates
* [metalsmith-broken-link-checker](https://github.com/davidxmoody/metalsmith-broken-link-checker) to verify link integrity
