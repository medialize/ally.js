define([
  './test-frame',
  'css.escape',
  'intern/dojo/text!../../tests/focusable/test.html',
], function(
  TestFrame,
  cssEscape,
  sourceHtml
) {

  var source = sourceHtml
    // remove <script src="…"> because we don't want to run the tests themselves
    .replace(/<script\s+src="[^>]+><\/script>/g, '')
    // add <base> to re-target assets (relative from node_modules/intern/client.html)
    .replace('</title>', '</title><base href="../../tests/focusable/">');

  function BrowserDataFrame() {
    TestFrame.call(this, source);
  }

  BrowserDataFrame.prototype = Object.create(TestFrame.prototype);
  BrowserDataFrame.prototype.constructor = BrowserDataFrame;

  BrowserDataFrame.prototype.getElement = function(label) {
    var _label = label.split(' -> ');
    var _document = this.document;

    if (_label.length === 2) {
      label = _label[1];
      _document = this._getDocument(_label[0]);
    }

    return this._getElement(label, _document);
  };

  BrowserDataFrame.prototype._getDocument = function(label) {
    try {
      var element = this._getElement(label, this.document) || {};
      // works on <object> and <iframe>
      return element.contentDocument
        // works on <object> and <iframe>
        || element.contentWindow && element.contentWindow.document
        // works on <object> and <iframe> that contain SVG
        || element.getSVGDocument && element.getSVGDocument();
    } catch (e) {
      // IE may throw member not found exception
      // e.g. on <object type="image/png">
      return null;
    }
  };

  BrowserDataFrame.prototype._getElement = function(label, _document) {
    return _document && _document.querySelector('[data-label="' + cssEscape(label) + '"]');
  };

  return BrowserDataFrame;
});
