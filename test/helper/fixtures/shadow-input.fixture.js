define([], function() {
  return function(context) {
    var fixture = {
      root: document.createElement('div'),
      shadow: {},
      input: {},
      remove: function() {
        fixture.root.parentNode.removeChild(fixture.root);
      },
    };

    fixture.root.id = 'intern-dom-fixture';
    fixture.root.innerHTML = [
      '<input id="outer-input" type="text" value="outer-input">',
      '<div id="first-shadow-host" class="shadow-host"></div>',
      '<div>',
        '<input id="after-input" type="text" value="after-input">',
      '</div>',
    ].join('');

    (context || document.body).appendChild(fixture.root);
    fixture.input.outer = document.getElementById('outer-input');
    fixture.input.after = document.getElementById('after-input');

    if (document.body.shadowRoot === undefined) {
      // NOTE: Shadow DOM is not supported
      return fixture;
    }

    var firstShadowHost = document.getElementById('first-shadow-host');
    var firstShadowRoot = firstShadowHost.createShadowRoot();
    firstShadowRoot.innerHTML = [
      '<input id="first-input" type="text" value="first-input">',
      '<div id="second-shadow-host"></div>',
      '<div id="third-shadow-host"></div>',
    ].join('');
    fixture.input.first = firstShadowRoot.getElementById('first-input');
    fixture.shadow.first = firstShadowHost;

    var secondShadowHost = firstShadowRoot.getElementById('second-shadow-host');
    var secondShadowRoot = secondShadowHost.createShadowRoot();
    secondShadowRoot.innerHTML = '<input id="second-input" type="text" value="second-input">';
    fixture.input.second = secondShadowRoot.getElementById('second-input');
    fixture.shadow.second = secondShadowHost;

    var thirdShadowHost = firstShadowRoot.getElementById('third-shadow-host');
    var thirdShadowRoot = thirdShadowHost.createShadowRoot();
    thirdShadowRoot.innerHTML = '<input id="third-input" type="text" value="third-input">';
    fixture.input.third = thirdShadowRoot.getElementById('third-input');
    fixture.shadow.third = thirdShadowHost;

    return fixture;
  };
});
