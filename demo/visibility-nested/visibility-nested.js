require.config({
  paths: {
    a11y: '../../src'
  }
});

require(['a11y/dom/is-visible'], function (isVisible) {
  var links = document.querySelectorAll('a');
  var visibleLinks = [].filter.call(links, isVisible);

  function textContent(element) {
    return element.textContent;
  }

  console.log("links", [].map.call(links, textContent));
  console.log("visible", [].map.call(visibleLinks, textContent));
});
