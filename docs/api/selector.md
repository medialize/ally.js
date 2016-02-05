---
layout: doc-page.html
tags: internal
---

# Selector

The selectors contain query selectors ("css selectors") used by DOM methods. They should *not* be used directly. Instead use the appropriate modules provided in the `dom` namespace.

It is impossible to query focusable elements by way of CSS selector alone, because certain element states can not be identified using CSS. You should therefore not use `ally/selector/focusable` directly, but instead refer to [`ally.query.focusable`](query/focusable.md) and [`ally.is.focusable`](is/focusable.md). If you need a *correct* result, use `ally.query.focusable({ strategy: "strict" })`.


## Contributing

While `ally/selector/focusable` will identify elements that are filtered by [`ally.query.focusable`](query/focusable.md), the inverse is not true - whatever cannot be identified as *potentially* focusable via CSS selector, will *not* be returned by [`ally.query.focusable`](query/focusable.md) (with `strategy: "quick"`) either. To identify *everything*, the `query/focusable.strict` implementation uses  [TreeWalker](https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker) instead of `document.querySelectorAll()`.
