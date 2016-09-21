---
layout: doc-page.html
---

# Documentation infrastructure

The documentation is authored in markdown in the `docs` directory. We're using [markdown-it](https://www.npmjs.com/package/markdown-it) (but staying close to [Github Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)) to convert the markdown to HTML. [markdownlint](https://github.com/DavidAnson/markdownlint/) is there to lint the files, its configuration is maintained in `build/markdownlint.js`, see the [Rules](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md).

The idea is to create a documentation that can be read on github and on the generated website.

:::note
If this is your first contact with ally.js, make sure to run `npm run init` after cloning the repository. This will run `npm install`, `npm run clean`, `npm run build` and `npm run build:website` to make sure your local copy is ready.
:::


## Building the website

The doc source are converted to HTML by [metalsmith](http://metalsmith.io/), the scripts and configuration are maintained in the `build/metalsmith` directory.

The website is comprised of 3 elements, the markdown sources, data tables and some legacy files from `./tests`.

```sh
# lint the markdown
npm run lint:md

# build the library (to `./dist`)
npm run build

# generate website (to `./web`)
npm run build:website

# generate only the markdown files
npm run build:docs

# generate only the data tables
npm run build:data-tables

# generate only the legacy files
npm run build:legacy
```

The commands `lint:md` and `build:website` are also executed by `npm run lint` and `npm run build`.

:::note
Before you build the website using `npm run build:website` you need to have run `npm run build` before, in order for the library components to be available to the website build. You don't need to build the library every time you build the website, which is why this step is disconnected. If you ran `npm run init` after cloning the repository, everything is taken care of already.
:::

If you're new to metalsmith, have a look at [simple static site demo](https://github.com/segmentio/metalsmith/tree/master/examples/static-site) and [getting to know metalsmith](http://www.robinthrift.com/posts/getting-to-know-metalsmith/).

We use the following plugins:

* [metalsmith-packagejson](https://www.npmjs.com/package/metalsmith-packagejson) to import `package.json`
* [metalsmith-markdownit](https://github.com/attentif/metalsmith-markdownit)
* [metalsmith-register-helpers](https://github.com/losttype/metalsmith-register-helpers) to use custom handlebar helpers
* [metalsmith-layouts](https://github.com/superwolff/metalsmith-layouts) to use [handlebars](http://handlebarsjs.com/) templates
* [metalsmith-broken-link-checker](https://github.com/davidxmoody/metalsmith-broken-link-checker) to verify link integrity
* [metalsmith-collections](https://github.com/segmentio/metalsmith-collections) to deal with groups of files
* [metalsmith-static](https://github.com/TheHydroImpulse/metalsmith-static) to copy static assets
* [metalsmith-redirect](https://github.com/aymericbeaumet/metalsmith-redirect/) to create HTML redirection files to forward old URLs to their new homes


## Authoring documentation

The public API provided by ally.js needs to be explained in `docs/api`. As every component has its source file, it has an accompanying markdown file for documentation. ally.js contains components that are not meant to be used directly, thus do not have to be documented in detail.

Anything you document should be written in a way that caters to an audience that may not know very much about accessibility. If bigger picture explanations are required, consider writing a tutorial instead of cramming it into the API docs.


### Embedding examples and Demos

You can add HTML to markdown files in order to embed [JSBin.com](https://jsbin.com) demos by using the following markdown in any document:

```markdown
* **EXAMPLE:** [name of demo](./name.example.html)
```

A demo document is named `${slug}.example.html` (for multiple `${slug}.example-2.html`) and placed in the same directory as the referencing document. So for `docs/api/element/disabled.md` the example file would be `docs/api/element/disabled.example.html`.

Example documents must follow the following general structure.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>ally.js ${example_title} Example</title>
  <link rel="jsbin" href="">
  <style id="example-css">
    ${example_style}
  </style>
</head>
<body>

<article id="example-introduction">
  <h1>Accessible ${example_title} Tutorial</h1>
  <p>${example_description}</p>
</article>

<div id="example-html">
  <main>
    ${example_markup}
  </main>
</div>

<script src="https://cdn.jsdelivr.net/ally.js/1.3.0/ally.min.js"></script>

<script id="example-js">
  ${example_script}
</script>

</body>
</html>
```

The command `npm run publish:jsbin` uses [jsbin-sync](https://github.com/rodneyrehm/jsbin-sync) to find all `example*.html` files and upload them to [JSBin.com](https://jsbin.com). *This can only be executed by [Rod](https://github.com/rodneyrehm), as we're using his personal JSBin pro account for this.* New examples will have their empty `<link rel="jsbin" href="">` element updated to the URL returned by JSBin, but this is the only change applied to source files. Contents of `#example-js` and `#example-css` go into the bin's JavaScript and CSS sections, respecively. The bin's HTML section contains the HTML document, *without* the `<script id="example-js">`, `<style id="example-css">` and `<link rel="jsbin">` elements.


### Notes and warnings

Using [markdown-it-container](https://www.npmjs.com/package/markdown-it-container) the documentation accepts `:::` fenced markdown blocks to highlight certain bits. In API pages (`layout: doc-api.html`) the section `## Notes` can be used to collect multiple highlights:

```markdown
## Notes

:::note
I'm informing you of something you SHOULD know
:::

:::warning
I'm informing you of something you MUST know (because it's not obvious)
:::

:::tip
I'm informing you of a best practice
:::

:::help
I'm informing you of something you can contribute to this project
:::
```

:::help
Got a better Idea to solve this? [file an issue](https://github.com/medialize/ally.js/issues/new)!
:::


### Definitions

Document can make use of definition lists. An unordered list containing only items starting with the term in strong emphasis ending with a colon (`:`) will be converted from `<ul>` to `<dl>` for the purpose of proper semantics:

```markdown
* **Term 1:** Explanation 1
* **Term 2:** Explanation 2
```

### API classifications

API documents must declare their traits, which is done via the `tags` property in the [front matter](https://jekyllrb.com/docs/frontmatter/) section of the document:

```markdown
---
layout: template.html
tags: option-argument, service, svg
---

# Headline
```

* **argument-options:** To declare the module belongs to the family of components expecting a [single options argument](../api/concepts.md#Single-options-argument)
* **argument-list:** To declare the module expects plain arguments, not the [single options argument](../api/concepts.md#Single-options-argument) pattern
* **service:** To declare the module belongs to the family of [Service](../api/concepts.md#Service) components
* **global-service:** To declare the module belongs to the family of [Global Service](../api/concepts.md#Global-service) components
* **data:** To declare the module provides data, not functionality
* **internal:** To declare the module is intended for internal use only
* **browser-fix:** To declare the module's only intention is to counter a specific browser quirk
* **content-document:** To declare the module resolves `<object>` and `<iframe>` elements to their content documents
* **shadow-dom:** To declare special support for ShadowDOM
* **svg:** To declare special support for SVG

### API changes

In addition to the less specific [CHANGELOG.md](https://github.com/medialize/ally.js/tree/master/CHANGELOG.md), API documents must declare specific changes in detail:

```markdown
## Changes

* `v1.2.3` introduced the option `gustav`
* `v1.3.0` removed the option `otto`
* Since `v1.6.0` the function returns coffee instead of tea
```

Since the exact release version a change will be included in is not necessarily known during development, the placeholder `v#master` should be used.

:::note
The version notation may be extended to also contain addition `+v1.0.0` / removal `-v1.0.0` / change `~v1.0.0` should this become necessary. The website builder may replace the code elements by links to the change log.
:::
