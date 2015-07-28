define([], function() {
  return function(context) {
    var fixture = {
      root: document.createElement('div'),
      focusable: {},
      tabbable: {},
      inert: {},
      remove: function() {
        fixture.root.parentNode.removeChild(fixture.root);
      },
    };

    fixture.root.id = 'intern-dom-fixture';
    fixture.root.innerHTML = [
      '<div id="inert-div">a</div>',
      '<div tabindex="-1" id="focusable-div">a</div>',
      '<div tabindex="0" id="tabbable-div">a</div>',
      '<div tabindex="foo" id="inert-tabindex">a</div>',

      '<a id="inert-a">nope</a>',
      '<a href="#" id="tabbable-a">yep</a>',
      '<a tabindex="-1" href="#" id="focusable-a">maybe</a>',

      '<input type="text" id="tabbable-input">',
      '<input type="text" tabindex="-1" id="focusable-input">',
      '<input type="text" disabled id="inert-input">',
      '<input type="hidden" id="inert-input-hidden">',
    ].join('');

    (context || document.body).appendChild(fixture.root);
    [].forEach.call(fixture.root.children, function(element) {
      var key = element.id.split('-');
      fixture[key[0]][key.slice(1).join('-')] = element;
    });

    return fixture;
  };
});
