define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var Promise = require('intern/dojo/Promise');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var TestFrame = require('../helper/test-frame');
  var getFrameElement = require('ally/util/get-frame-element');

  bdd.describe('util/get-frame-element', function() {
    bdd.it('should not resolve elements from the current browsing context', function() {
      var frameElement = getFrameElement(document.body);
      expect(frameElement).to.equal(null);
    });

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
              '<p id="target">Hello World</p>',
            '</body>',
          '</html>',
          /*eslint-enable indent */
        ].join(''));

        return frame.initialize(document.body);
      });

      bdd.after(function() {
        frame.terminate();
        frame = null;
      });

      bdd.it('should resolve the element hosting the contentDocument', function() {
        var element = frame.document.getElementById('target');
        var frameElement = getFrameElement(element);
        expect(frameElement).to.equal(frame.element);
      });
    });

    bdd.describe('for parsed <object> elements', function() {
      var fixture;
      var object;

      bdd.before(function() {
        var dfd = new Promise.Deferred();

        fixture = customFixture([
          /*eslint-disable indent */
          '<object type="image/svg+xml" typemustmatch="false" id="object-svg" data="../../tests/media/test.svg" width="200" height="50"></object>',
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
        fixture.remove();
        fixture = null;
      });

      bdd.it('should resolve the element hosting the contentDocument', function() {
        var objectDocument = object.contentDocument;
        var element = objectDocument.querySelector('a');

        var frameElement = getFrameElement(element);
        expect(frameElement).to.equal(object);
      });

      bdd.it('should resolve the element hosting the contentDocument from cache', function() {
        var objectDocument = object.contentDocument;
        var element = objectDocument.querySelector('a');

        var cachedFrameElement = getFrameElement(element);
        expect(cachedFrameElement).to.equal(object);
      });
    });

    bdd.describe('for injected <object> elements', function() {
      var fixture;
      var object;

      bdd.before(function() {
        var dfd = new Promise.Deferred();

        fixture = customFixture('<div></div>');

        object = document.createElement('object');
        object.setAttribute('type', 'image/svg+xml');
        object.setAttribute('typemustmatch', 'false');
        object.setAttribute('id', 'object-svg-created');
        object.setAttribute('width', '200');
        object.setAttribute('height', '50');
        object.setAttribute('data', '../../tests/media/test.svg');
        fixture.root.appendChild(object);

        object.onload = function() {
          dfd.resolve();
        };
        object.onerror = function() {
          dfd.reject('error while loading <object>');
        };

        return dfd.promise;
      });

      bdd.after(function() {
        fixture.remove();
        fixture = null;
      });

      bdd.it('should resolve the element hosting the contentDocument', function() {
        var objectDocument = object.contentDocument;
        var element = objectDocument.querySelector('a');

        var frameElement = getFrameElement(element);
        expect(frameElement).to.equal(object);
      });

      bdd.it('should resolve the element hosting the contentDocument from cache', function() {
        var objectDocument = object.contentDocument;
        var element = objectDocument.querySelector('a');

        var cachedFrameElement = getFrameElement(element);
        expect(cachedFrameElement).to.equal(object);
      });
    });

  });
});
