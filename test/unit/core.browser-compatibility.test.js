define([
  'intern!object',
  'intern/chai!expect',
  'intern/dojo/Promise',
  '../helper/test-iframe-browser-data',
  '../helper/browser-focusable-data',
  'platform',
  'ally/is/focusable',
  'ally/is/tabbable',
  'ally/is/only-tabbable',
  'ally/get/focus-redirect-target',
  'ally/query/tabsequence',
], function(
  registerSuite,
  expect,
  Promise,
  FocusableTestFrame,
  focusableTestData,
  platform,
  isFocusable,
  isTabbable,
  isOnlyTabbable,
  getFocusRedirectTarget,
  queryTabsequence
) {
  registerSuite(function() {

    function keysMap(list) {
      var map = {};
      list.forEach(function(key) {
        map[key] = true;
      });
      return map;
    }

    var framed = new FocusableTestFrame();

    var data = focusableTestData(platform);
    var ignoreTabsequencePattern = /svg/;
    var skipTabsequence = {};
    var ignorePattern = /^(object|embed)/;
    var skipUntestable = keysMap([
      // ignored elements
      'ignore',
      'html',
      'body',
      // known mismatch
      'iframe',
      'iframe[src=svg]',
      'keygen',
      'keygen[tabindex=-1]',
    ]);

    if (data.platform.layout === 'Blink' || data.platform.layout === 'WebKit') {
      skipUntestable['svg rect[onfocus]'] = true;
    }

    if (data.platform.name === 'Firefox') {
      skipUntestable['firefox-bug-1116126'] = true;
      skipUntestable['map.object area'] = true;
      skipUntestable['map.object area[href].upper'] = true;
      skipUntestable['map.object area[href].lower'] = true;
      // "label[tabindex=0]" is in the browser's tabsequence
      // (it's considered to redirect focus - scriptFocus and keyboardFocus behavior do not align!)
      skipTabsequence['label[tabindex=0]'] = true;
      // "img[usemap].duplicate area[href]" is in the browser's tabsequence once, in ally's twice
      skipTabsequence['img[usemap].duplicate area[href]'] = true;
      // "div{flexbox} > span{order:1} > input" and "div{flexbox} > span{order:2} > input" are not reordered in ally
      skipTabsequence['div{flexbox} > span{order:1} > input'] = true;
      skipTabsequence['div{flexbox} > span{order:2} > input'] = true;
      // In Firefox ShadowDOM is behind a flag
      if (!document.body.createShadowRoot) {
        ignoreTabsequencePattern = /svg|shadow-host/;
      }
    }

    if (data.platform.name === 'IE') {
      // IE does not forward focus upon script-focus, but does on pointer-focus,
      // we'll act as if script-focus worked just like pointer-focus
      data.elements['label:has(input)'].scriptFocus.redirected = 'label:has(input) input';
      data.elements['label[for=label-target-focusable]'].scriptFocus.redirected = 'input[type=text][tabindex=-1]';
      data.elements['label[for=label-target]'].scriptFocus.redirected = 'input[type=text]';
    }

    var suite = {
      name: 'core: Browser Compatibility',

      before: function() {
        return framed.initialize(document.body);
      },
      after: function() {
        framed.terminate();
      },
      'browser version': function() {
        var ident = data.platform.name + ' ' + data.platform.version;
        if (data) {
          this.skip('Checking against ' + ident);
        }

        expect('').to.equal(ident, 'Test data available');
      },
    };

    function generateTest(label) {
      return function() {
        // static result state
        var element = data.elements[label] || {};
        var focusable = Boolean(element.focusable);
        var tabbable = focusable && Boolean(element.tabbable);
        var onlyTabbable = !focusable && Boolean(element.tabbable);

        // evaluated state
        var _element = framed.getElement(label);
        if (!_element) {
          this.skip('element not found');
        }

        var _focusable = isFocusable(_element);
        var _tabbable = _focusable && isTabbable(_element);
        var _onlyTabbable = isOnlyTabbable(_element);

        expect(_focusable).to.equal(focusable, 'is/focusable');
        expect(_tabbable).to.equal(tabbable, 'is/tabbable');
        expect(_onlyTabbable).to.equal(onlyTabbable, 'is/only-tabbable');

        var redirectTarget = element.scriptFocus && element.scriptFocus.redirected || null;
        var _redirectTarget = getFocusRedirectTarget({context: _element});
        var _redirectTargetLabel = _redirectTarget && _redirectTarget.getAttribute('data-label') || null;
        expect(_redirectTargetLabel).to.equal(redirectTarget, 'get/focus-redirect-target');
      };
    }

    if (!data) {
      return suite;
    }

    Object.keys(data.elements).forEach(function(label) {
      if (skipUntestable[label] || label.match(ignorePattern)) {
        // silently skip what we know we can't test
        return;
      }

      suite[label] = generateTest(label);
    });

    suite.tabsequence = function() {
      var ignored = function(label) {
        return !skipUntestable[label]
          && !skipTabsequence[label]
          && !label.match(ignorePattern)
          && !label.match(ignoreTabsequencePattern)
          && label.indexOf(' -> ') === -1;
      };

      var expected = data.tabsequence.filter(ignored);
      var sequence = queryTabsequence({
        context: framed.document.body,
        strategy: 'strict',
      }).map(function(element) {
        return element.getAttribute('data-label');
      }).filter(ignored);

      expect(sequence).to.deep.equal(expected);
    };

    return suite;
  });
});
