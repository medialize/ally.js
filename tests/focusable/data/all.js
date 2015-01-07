define(function defineDemoFocusableData(require) {
  return {
    'expected': require('./expected'),
    'chrome-stable': require('./chrome-stable'),
    'chrome-nightly': require('./chrome-nightly'),
    'firefox-stable': require('./firefox-stable'),
    'firefox-nightly': require('./firefox-nightly'),
    'ie-10': require('./ie-10'),
    'ie-11': require('./ie-11'),
    'ie-12': require('./ie-12'),
    'safari-6_2': require('./safari-6.2'),
    'webkit-nightly': require('./webkit-nightly'),
  };
});