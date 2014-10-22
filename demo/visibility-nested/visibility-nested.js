require.config({
  paths: {
    a11y: '../../src'
  }
});

require(['a11y/dom/visible'], function (visible) {
  var links = document.querySelectorAll('a');
  var visibleLinks = [].filter.call(links, visible);

  function textContent(element) {
    return element.textContent;
  }

  console.log("links", [].map.call(links, textContent));
  console.log("visible", [].map.call(visibleLinks, textContent));
});
