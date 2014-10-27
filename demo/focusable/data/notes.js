define(function defineDemoFocusableNotes(require) {
  return {
    "BODY": 'default focus',

    "audio": '<a href="http://www.w3.org/TR/html5/dom.html#interactive-content">interactive content</a> only with <code>controls</code> attribute',
    "video": '<a href="http://www.w3.org/TR/html5/dom.html#interactive-content">interactive content</a> only with <code>controls</code> attribute',

    "table.error-by-visibility": 'TODO: investigate this behavior',
    "table tr td.error-by-visibility": 'TODO: investigate this behavior',

    "svg": '&lt;svg&gt; could be considered embedded content (like &lt;object&gt;) in which case it should be focusable',
    "svg a[xlink|href]": '<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=369507">Bug 369507: default visual indication of focus</a>',

    "fieldset[tabindex=0][disabled]": 'should not be focusable as per <a href="http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled">disabled elements</a>',
    "link[itemprop][href]": 'naturally focusable according to <a href="http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute">HTML5 tabindex</a>',

    "a > img[ismap]": 'see <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-ismap">&lt;img ismap&gt;</a>, focus should be the link-parent',
    "area[href].upper" : 'possibly related bugs: <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=672039">672039</a>, <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=866373">866373</a>, <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=135083">135083</a>',
    "area[href].lower" : 'possibly related bugs: <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=672039">672039</a>, <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=866373">866373</a>, <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=135083">135083</a>',

    "object[usemap]": 'once focused in IE11, the browser cannot tab back to the document anymore, it get\'s stuck in the address bar. It was therefore removed from the test',

    "[contenteditable]:empty": 'Firefox reports <code>element.offsetHeight === 0</code>, working around that internally',

    "via(img[usemap].first): area[href].upper": 'upon focusing an image with associated &lt;map&gt;, IE will focus the first &lt;area&gt; of that map.',
    "via(img[usemap].second): area[href].upper": 'upon focusing an image with associated &lt;map&gt;, IE will focus the first &lt;area&gt; of that map.',
    "via(label[for=\"label-target\"]): input[type=text]": 'upon focusing <label for> the element identified by the for attribute gets focused',

    // invalid [tabindex]
    "[tabindex=\"\"]": 'invalid according to <a href="http://www.w3.org/TR/html5/infrastructure.html#rules-for-parsing-integers">rules for parsing integers</a> required by <a href="http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute">HTML5 tabindex</a>',
    "[tabindex=3 ]": 'invalid according to <a href="http://www.w3.org/TR/html5/infrastructure.html#rules-for-parsing-integers">rules for parsing integers</a> required by <a href="http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute">HTML5 tabindex</a> but every browser permits it anyways',
    "[tabindex=hello]": 'invalid according to <a href="http://www.w3.org/TR/html5/infrastructure.html#rules-for-parsing-integers">rules for parsing integers</a> required by <a href="http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute">HTML5 tabindex</a>',

  };
});