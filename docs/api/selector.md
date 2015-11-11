---
layout: doc-page.html
tags: internal
---

# Selector

The selectors contain query selectors ("css selectors") used by DOM methods. They should *not* be used directly. Instead use the appropriate modules provided in the `dom` namespace.

It is impossible to query focusable elements by way of CSS selector alone, because certain element states can not be identified using CSS. You should therefore not use `ally/selector/focusable` directly, but instead refer to `ally/query/focusable` and `ally/is/focusable`.


## Contributing

While `ally/selector/focusable` will identify elements that are filtered by `ally/query/focusable.js`, the inverse is not true - whatever cannot be identified as *potentially* focusable via CSS, will *not* be returned by `ally/query/focusable.js` either. Of course it is technically possible to use a [TreeWalker](https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker) to iterate through all the nodes to find ones the ones having the computed style `-user-modify: read-write`, but the performance hit is considered too big.


