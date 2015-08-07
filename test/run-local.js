#!/usr/bin/env node

var spawn = require('child_process').spawn;
var resolve = require('path').resolve;

var Driver = require('dalek-driver-chrome');
var driver = new Driver({
  host: '127.0.0.1',
  portRange: [4444, 4444],
});

function stop(code) {
  // properly shut down Chrome Driver
  driver.stop(function() {
    // we need to exit with the same code intern returned
    /*eslint-disable no-process-exit*/
    process.exit(code);
    /*eslint-enable no-process-exit*/
  });
}

function runTests() {
  var command = resolve(__dirname, '../node_modules/.bin/intern-runner');
  // pipe through any arguments provided to the runner
  var args = ['config=test/local'].concat([].slice.call(process.argv, 2));
  spawn(command, args, { stdio: 'inherit' })
    // make sure to properly stop ChromeDriver before killing the process
    .on('exit', stop);
}

// start the driver
/*eslint-disable no-console */
driver.start(
  // callback invoked when driver is started
  runTests,
  // callback invoked when driver could not start
  console.error.bind(console),
  // callback invoked when driver crashed after successful start
  console.error.bind(console)
);
/*eslint-enable no-console */
