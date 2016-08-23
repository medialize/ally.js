require.config({
  urlArgs: 'bust=' + (new Date()).getTime(),
  paths: {
    ally: '../../dist/amd',
    // shims required by ally.js
    'array.prototype.findindex': '../../node_modules/array.prototype.findindex/index',
    'css.escape': '../../node_modules/css.escape/css.escape',
    'es6-promise': '../../node_modules/es6-promise/dist/es6-promise',
    // stuff used for testing and co
    platform: '../../node_modules/platform/platform',
    jquery: '../../node_modules/jquery/dist/jquery',
    'jquery-ui': '../../node_modules/jquery-ui/ui',
  },
  shim: {
    'es6-promise': {
      exports: 'Promise',
    },
  },
});

function runFocusTests() {
  require(['./script/run-focus-tests'], function(results) {

    results.then(function(data) {
      var placeholder = document.getElementById('output-results');

      var text = JSON.stringify(data, null, 2);
      var form = document.createElement('form');
      form.id = 'output-results';
      form.method = 'POST';
      form.action = location.href.replace(/\/test.html.*$/, '/save.php');
      form.innerHTML = '<p><input type="submit" value="submit"></p><p><input type="text" name="name" value="saved"></p>';
      document.body.replaceChild(form, placeholder);

      var _results = document.createElement('textarea');
      _results.style.width = '100%';
      _results.style.height = '400px';
      _results.id = 'results';
      _results.name = 'results';
      _results.value = text;
      form.appendChild(_results);

      form.scrollIntoView && form.scrollIntoView(true);
    });

  });
}

require([
  'es6-promise',
], function(Promise) {
  Promise.polyfill();

  if (location.search.indexOf('manual=1') !== -1) {
    require([
      'platform',
      'ally/ally',
    ], function(platform, ally) {
      window.platform = platform;
      window.ally = ally;
    });
    return;
  }

  if (window.isLoaded) {
    runFocusTests();
  } else {
    window.addEventListener('load', function() {
      runFocusTests();
    }, false);
  }
});
