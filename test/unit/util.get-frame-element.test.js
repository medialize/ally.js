define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var TestFrame = require('../helper/test-frame');
  var getFrameElement = require('ally/util/get-frame-element');

  registerSuite(function() {
    var fixture;
    var frame;
    var parsedLoaded = null;
    var createdLoaded = null;

    return {
      name: 'util/get-frame-element',

      before: function() {
        fixture = customFixture([
          /*eslint-disable indent */
          '<object type="image/svg+xml" typemustmatch="false" id="object-svg" data="../../tests/media/test.svg" width="200" height="50"></object>',
          /*eslint-enable indent */
        ]);

        var parsedObject = document.getElementById('object-svg');
        parsedObject.onload = function() {
          parsedLoaded = true;
        };
        parsedObject.onerror = function() {
          parsedLoaded = false;
        };

        var dynamicObject = document.createElement('object');
        dynamicObject.setAttribute('type', 'image/svg+xml');
        dynamicObject.setAttribute('typemustmatch', 'false');
        dynamicObject.setAttribute('id', 'object-svg-created');
        dynamicObject.setAttribute('width', '200');
        dynamicObject.setAttribute('height', '50');
        dynamicObject.setAttribute('data', '../../tests/media/test.svg');
        fixture.root.appendChild(dynamicObject);

        dynamicObject.onload = function() {
          createdLoaded = true;
        };
        dynamicObject.onerror = function() {
          createdLoaded = false;
        };

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
      },
      after: function() {
        delete window.registerNestedDocument;
        fixture.remove();
        fixture = null;
        frame.terminate();
        frame = null;
      },

      body: function() {
        var frameElement = getFrameElement(document.body);
        expect(frameElement).to.equal(null);
      },

      'iframe html': function() {
        var element = frame.document.getElementById('target');
        var frameElement = getFrameElement(element);
        expect(frameElement).to.equal(frame.element);
      },

      'object svg': function() {
        var deferred = this.async(60000);
        var executeTest = deferred.callback(function() {
          var objectElement = document.getElementById('object-svg');
          var objectDocument = objectElement.contentDocument;
          var element = objectDocument.querySelector('a');

          var frameElement = getFrameElement(element);
          expect(frameElement).to.equal(objectElement);

          var cachedFrameElement = getFrameElement(element);
          expect(cachedFrameElement).to.equal(objectElement);
        });

        // Tests on BrowserStack may not have the file available immediately
        // I'm not eager to find out if the load event thing works cross browser
        var testLoaded = function() {
          if (parsedLoaded === false) {
            this.skip('failed loading object element');
          }

          if (!parsedLoaded) {
            setTimeout(testLoaded, 200);
            return;
          }

          executeTest();
        }.bind(this);

        testLoaded();
      },

      'object svg (document.createElement)': function() {
        var deferred = this.async(60000);
        var executeTest = deferred.callback(function() {
          var objectElement = document.getElementById('object-svg-created');
          var objectDocument = objectElement.contentDocument;
          var element = objectDocument.querySelector('a');

          var frameElement = getFrameElement(element);
          expect(frameElement).to.equal(objectElement);

          var cachedFrameElement = getFrameElement(element);
          expect(cachedFrameElement).to.equal(objectElement);
        });

        // Tests on BrowserStack may not have the file available immediately
        // I'm not eager to find out if the load event thing works cross browser
        var testLoaded = function() {
          if (createdLoaded === false) {
            this.skip('failed loading object element');
          }

          if (!createdLoaded) {
            setTimeout(testLoaded, 200);
            return;
          }

          executeTest();
        }.bind(this);

        testLoaded();
      },
    };
  });
});
