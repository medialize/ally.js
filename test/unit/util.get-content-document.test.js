define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var Promise = require('intern/dojo/Promise');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var TestFrame = require('../helper/test-frame');
  var getContentDocument = require('ally/util/get-content-document');

  bdd.describe('util/get-content-document', function() {

    bdd.describe('for <iframe> elements', function() {
      var frame;

      bdd.before(function() {
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

        return frame.initialize(document.body)
      });

      bdd.after(function() {
        frame.terminate();
        frame = null;
      });

      bdd.it('should resolve the content document of `<iframe>` elements', function() {
        var _document = getContentDocument(frame.element);
        expect(_document).to.equal(frame.document);
      });
    });

    bdd.describe('for <object type="image/svg+xml"> elements', function() {
      var fixture;
      var documents = {};
      var object;

      bdd.before(function() {
        var dfd = new Promise.Deferred();

        window.registerNestedDocument = function(hash, _document) {
          documents[hash] = _document;
        };

        fixture = customFixture([
          /*eslint-disable indent */
          '<object type="image/svg+xml" id="object-svg" data="../../tests/media/test.svg#object-svg" width="200" height="50"></object>',
          /*eslint-enable indent */
        ]);

        object = document.getElementById('object-svg');
        object.onload = function() {
          dfd.resolve();
        };
        object.onerror = function() {
          dfd.reject('error while loading <object>');
        };

        return dfd.promise;
      });

      bdd.after(function() {
        delete window.registerNestedDocument;
        fixture && fixture.remove();
        fixture = null;
      });

      bdd.it('should resolve the content document of `<object>` elements', function() {
        var _document = getContentDocument(object);
        expect(!!documents['object-svg']).to.equal(true, 'exists');
        expect(_document).to.equal(documents['object-svg'], 'equals');
      });
    });

    bdd.describe('for <object type="image/gif"> elements', function() {
      var fixture;
      var object;

      bdd.before(function() {
        var dfd = new Promise.Deferred();

        fixture = customFixture([
          /*eslint-disable indent */
          '<object type="image/gif" id="object-gif" data="../../tests/media/test.poster.png" width="200" height="50"></object>',
          /*eslint-enable indent */
        ]);

        object = document.getElementById('object-gif');
        object.onload = function() {
          dfd.resolve();
        };
        object.onerror = function() {
          dfd.reject('error while loading <object>');
        };

        return dfd.promise;
      });

      bdd.after(function() {
        fixture && fixture.remove();
        fixture = null;
      });

      bdd.it('should not resolve the content document of `<object>` containing a binary image', function() {
        var _document = getContentDocument(object);
        expect(_document).to.equal(null);
      });
    });

  });
});
