require.config({
  paths: {
    a11y: '../../src'
  }
});

require(['a11y/dom/query-tabbable'], function (queryTabbable) {
  var names = queryTabbable(document.body).map(function(node) {
    return node.getAttribute('data-dom');
  });
  console.log(names);
});
