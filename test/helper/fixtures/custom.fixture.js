define([], function() {
  return function(html, context) {
    var fixture = {
      root: document.createElement('div'),
      remove: function() {
        // IE10 does not redirect focus to <body> when the activeElement is removed
        // blur shadowed activeElements before removal
        // @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1117535#c5
        document.activeElement.blur();
        fixture.root.parentNode.removeChild(fixture.root);
      },
    };

    fixture.root.id = 'intern-dom-fixture';
    fixture.root.innerHTML = html;
    (context || document.body).appendChild(fixture.root);
    return fixture;
  };
});
