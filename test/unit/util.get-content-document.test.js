define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  '../helper/test-frame',
  'ally/util/platform',
  'ally/util/get-content-document',
], function(registerSuite, expect, customFixture, TestFrame, platform, getContentDocument) {

  registerSuite(function() {
    var fixture;
    var frame;
    var documents = {};
    var loaded = false;

    return {
      name: 'util/get-content-document',

      before: function() {
        window.registerNestedDocument = function(hash, _document) {
          loaded = true;
          documents[hash] = _document;
        };

        fixture = customFixture([
          /*eslint-disable indent */
          '<object type="image/svg+xml" id="object-svg" data="../../tests/media/test.svg#object-svg" width="200" height="50"></object>',
          /*eslint-enable indent */
        ]);

        frame = new TestFrame([
          /*eslint-disable indent */
          '<!DOCTYPE html>',
          '<html lang="en">',
            '<head>',
              '<meta charset="utf-8" />',
              '<title>Framed Content</title>',
            '</head>',
            '<body>',
              '<p>Hello World</p>',
            '</body>',
          '</html>',
          /*eslint-enable indent */
        ].join(''));

        return frame.initialize(document.body);
      },
      after: function() {
        delete window.registerNestedDocument;
        fixture.remove();
        fixture = null;
        frame.terminate();
        frame = null;
      },

      'iframe content document': function() {
        var _document = getContentDocument(frame.element);
        expect(_document).to.equal(frame.document);
      },
      'object content document': function() {
        if (platform.is.TRIDENT) {
          this.skip('this test does not run properly on BrowserStack');
        }

        var deferred = this.async(60000);
        var executeTest = deferred.callback(function() {
          var objectSvg = document.getElementById('object-svg');
          var _document = getContentDocument(objectSvg);
          expect(!!documents['object-svg']).to.equal(true, 'exists');
          expect(_document).to.equal(documents['object-svg'], 'equals');
        });

        // Tests on BrowserStack may not have the file available immediately
        // I'm not eager to find out if the load event thing works cross browser
        var testLoaded = function() {
          if (!loaded) {
            setTimeout(testLoaded, 200);
            return;
          }

          executeTest();
        };

        testLoaded();
      },
    };
  });
});
