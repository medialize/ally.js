---
layout: doc-api.html
tags: argument-list
---

# ally.is.validArea

Determines if an `<area>` element is properly used via `<map>` by an `<img>`.


## Description


## Usage

```js
var element = document.getElementById('victim');
var isValidArea = ally.is.validArea(element);
```

### Arguments

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| element | [`HTMLElement`](https://developer.mozilla.org/en/docs/Web/API/HTMLElement) | *required* | The Element to test. |

### Returns

Boolean, `true` if the element is a valid area.

### Throws

[`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) if `element` argument is not of type `HTMLElement`.


## Examples


## Changes

* Since `v#master` the `<img usemap="#…" …>` is resolved in the same document `<map>` is from (e.g. within an iframe)
* Since `v#master` the existence of the `href` attribute is considered.


## Notes

* [object element usemap should be deprecated](https://www.w3.org/Bugs/Public/show_bug.cgi?id=27756)
* [Sequential Navigation Focus Order for Image Maps](https://www.w3.org/Bugs/Public/show_bug.cgi?id=27787)
* **NOTE:** Firefox only allows fully loaded images to reference image maps
* **NOTE:** Multiple use of same image map hides elements from tabbing sequence - [Gecko 1116126](https://bugzilla.mozilla.org/show_bug.cgi?id=1116126)


## Related resources

* [HTML5: The Map Element](http://www.w3.org/TR/html5/embedded-content-0.html#the-map-element)
* [HTML5: The Area Element](http://www.w3.org/TR/html5/embedded-content-0.html#the-area-element)
* [HTML5: Image Maps](http://www.w3.org/TR/html5/embedded-content-0.html#image-maps)


## Contributing

* [module source](https://github.com/medialize/ally.js/blob/master/src/is/valid-area.js)
* [document source](https://github.com/medialize/ally.js/blob/master/docs/api/is/valid-area.md)
* [unit test](https://github.com/medialize/ally.js/blob/master/test/unit/is.valid-area.test.js)

