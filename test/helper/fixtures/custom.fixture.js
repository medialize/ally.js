define([], function() {
  return function(html, context) {
    var fixture = {
      root: document.createElement('div'),
      remove: function() {
        fixture.root.parentNode.removeChild(fixture.root);
      },
    };

    fixture.root.id = 'intern-dom-fixture';
    fixture.root.innerHTML = html;
    (context || document.body).appendChild(fixture.root);
    return fixture;
  };
});
