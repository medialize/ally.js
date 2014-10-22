require.config({
  paths: {
    a11y: '../../src'
  }
});

require(['a11y/dom/tabbable'], function (tabbable) {
  var names = tabbable(document.body).map(function(node) {
    return node.getAttribute('data-dom');
  });
  console.log(names);
});
