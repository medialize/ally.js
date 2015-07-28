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
      // tabindex attribute
      '<div id="inert-div">a</div>',
      '<div tabindex="-1" id="tabindex--1">a</div>',
      '<div tabindex="0" id="tabindex-0">a</div>',
      '<div tabindex="foo" id="tabindex-1">a</div>',
      // link elements
      '<a id="anchor">nope</a>',
      '<a href="#" id="link">yep</a>',
      '<a tabindex="-1" href="#" id="link-tabindex--1">maybe</a>',
      // input elements
      '<input type="text" id="input">',
      '<input type="text" tabindex="-1" id="input-tabindex--1">',
      '<input type="text" disabled id="input-disabled">',
      '<input type="hidden" id="input-hidden">',
    ].join('');

    (context || document.body).appendChild(fixture.root);
    return fixture;
  };
});
