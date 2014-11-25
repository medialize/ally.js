define(function defineDemoEventSequenceData(require) {
  return {
    'expected': require('./expected'),
    'chrome-stable': require('./chrome-stable'),
    'firefox-stable': require('./firefox-stable'),
    'ie-11': require('./ie-11'),
    'safari-6_2': require('./safari-6.2'),
    'safari-iphone': require('./safari-iphone'),
  };
});