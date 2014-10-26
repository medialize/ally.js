define(function defineDemoFocusableNotes(require) {
  return {
    "BODY": 'default focus',

    "audio": '<a href="http://www.w3.org/TR/html5/dom.html#interactive-content">interactive content</a> only with <code>controls</code> attribute',
    "video": '<a href="http://www.w3.org/TR/html5/dom.html#interactive-content">interactive content</a> only with <code>controls</code> attribute',

    "table.error-by-visibility": 'TODO: investigate this behavior',
    "table tr td.error-by-visibility": 'TODO: investigate this behavior',
    "svg": "TODO: investigate svg focus",

    "fieldset[tabindex=0][disabled]": 'should not be focusable as per <a href="http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled">disabled elements</a>',
    "link[itemprop][href]": 'naturally focusable according to <a href="http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute">HTML5 tabindex</a>',

    "a > img[ismap]": 'see <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-ismap">&lt;img ismap&gt;</a>, focus should be the link-parent',

    // invalid [tabindex]
    "[tabindex=\"\"]": 'invalid according to <a href="http://www.w3.org/TR/html5/infrastructure.html#rules-for-parsing-integers">rules for parsing integers</a> required by <a href="http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute">HTML5 tabindex</a>',
    "[tabindex=3 ]": 'invalid according to <a href="http://www.w3.org/TR/html5/infrastructure.html#rules-for-parsing-integers">rules for parsing integers</a> required by <a href="http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute">HTML5 tabindex</a>',
    "[tabindex=hello]": 'invalid according to <a href="http://www.w3.org/TR/html5/infrastructure.html#rules-for-parsing-integers">rules for parsing integers</a> required by <a href="http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute">HTML5 tabindex</a>',

  };
});