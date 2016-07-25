define(function(require) {

  var platform = require('ally/util/platform');
  var supports = require('ally/supports/supports')();

  // https://github.com/videojs/video.js/issues/290
  var CANNOT_DEAL_WITH_MEDIA = (function() {
    try {
      var mp3 = require('ally/supports/media/mp3');
      var div = document.createElement('div');
      div.innerHTML = '<audio id="unknown-dimension-audio" controls src="' + mp3 + '"></audio>';
      return false;
    } catch (e) {
      return true;
    }
  })();

  supports.svgFocusMethod = Boolean(SVGElement.prototype.focus);
  // IE9 may not have "Windows Media Feature Pack" available,
  // causing "Error: Not implemented" being thrown all over the place
  supports.AVOID_MEDIA = CANNOT_DEAL_WITH_MEDIA;
  // Test VMs may have an older Quicktime installed,
  // causing modal update dialogs to crash the tests
  supports.AVOID_QUICKTIME = platform.is.WEBKIT;

  return supports;
});
