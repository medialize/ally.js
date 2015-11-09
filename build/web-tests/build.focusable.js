
const path = require('path');

const shelljs = require('shelljs');
const replace = require('replace');
const requirejs = require('requirejs');

const cwd = process.cwd();
const SOURCE = path.resolve(cwd, 'tests/focusable/');
const TARGET = path.resolve(cwd, 'web/tests/focusable/');

shelljs.mkdir('-p', TARGET);
shelljs.cp(path.resolve(SOURCE, '*.html'), TARGET);

replace({
  regex: '<script src="../../node_modules/requirejs/require.js" data-main="focusable"></script>',
  replacement: '<script src="./focusable.js" data-main="focusable"></script>',
  paths: [path.resolve(TARGET, 'test.html')],
  recursive: false,
  silent: true,
});

const config = {
  name: 'focusable',
  out: path.resolve(TARGET, 'focusable.js'),
  mainConfigFile: path.resolve(SOURCE, 'focusable.js'),
  paths: {
    requireLib: path.resolve(cwd, 'node_modules/requirejs/require'),
  },
  include: ['requireLib'],
};

requirejs.optimize(config, function(/* buildResponse */) {
  //buildResponse is just a text output of the modules
  //included. Load the built file for the contents.
  //Use config.out to get the optimized file contents.
  //var contents = fs.readFileSync(config.out, 'utf8');
}, function(err) {
  /*eslint-disable no-console */
  console.log(err);
  /*eslint-enable no-console */
  /*eslint-disable no-process-exit */
  process.exit(1);
  /*eslint-enable no-process-exit */
});
